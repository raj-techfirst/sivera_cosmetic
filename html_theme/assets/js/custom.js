// TICKER (GSAP)
gsap.registerEffect({
  name: "ticker",
  effect(targets, config) {
    buildTickers({
      targets: targets,
      clone: config.clone || (el => {
        let clone = el.children[0].cloneNode(true);
        el.insertBefore(clone, el.children[0]);
        return clone;
      })
    });
    function buildTickers(config, originals) {
      let tickers;
      if (originals && originals.clones) { // on window resizes, we should delete the old clones and reset the widths
        originals.clones.forEach(el => el && el.parentNode && el.parentNode.removeChild(el));
        originals.forEach((el, i) => originals.inlineWidths[i] ? (el.style.width = originals.inlineWidths[i]) : el.style.removeProperty("width"));
        tickers = originals;
      } else {
        tickers = config.targets;
      }
      const clones = tickers.clones = [],
        inlineWidths = tickers.inlineWidths = [];
      tickers.forEach((el, index) => {
        inlineWidths[index] = el.style.width;
        el.style.width = "10000px"; // to let the children grow as much as necessary (otherwise it'll often be cropped to the viewport width)
        el.children[0].style.display = "inline-block";
        let width = el.children[0].offsetWidth,
          cloneCount = Math.ceil(window.innerWidth / width),
          right = el.dataset.direction === "right",
          i;
        el.style.width = width * (cloneCount + 1) + "px";
        for (i = 0; i < cloneCount; i++) {
          clones.push(config.clone(el));
        }
        gsap.fromTo(el, {
          x: right ? -width : 0
        }, {
          x: right ? 0 : -width,
          duration: width / 100 / parseFloat(el.dataset.speed || 1),
          repeat: -1,
          overwrite: "auto",
          ease: "none"
        });
      });
      // rerun on window resizes, otherwise there could be gaps if the user makes the window bigger.
      originals || window.addEventListener("resize", () => buildTickers(config, tickers));
    }
  }
});

gsap.effects.ticker(".ticker-init");







const productSlider = new Swiper(".productSlider", {

  slidesPerView: 1.2,
  spaceBetween: 20,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    },
    1200: {
      slidesPerView: 4
    }
  }

});





// ADD SHADOW ON SCROLL

window.addEventListener('scroll', function () {
  const header = document.getElementById('site-header');

  if (window.scrollY > 10) {
    header.classList.add('shadow');
  } else {
    header.classList.remove('shadow');
  }
});



// SCROLL BACK TO TOP

const progressPath = document.querySelector('.progress-wrap path');
const pathLength = progressPath.getTotalLength();

progressPath.style.transition = 'none';
progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
progressPath.style.strokeDashoffset = pathLength;

progressPath.getBoundingClientRect();

progressPath.style.transition = 'stroke-dashoffset 10ms linear';

function updateProgress() {
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pathLength - (scroll * pathLength / height);

  progressPath.style.strokeDashoffset = progress;
}

updateProgress();

window.addEventListener('scroll', updateProgress);

const offset = 50;
const duration = 550;

window.addEventListener('scroll', function () {
  const progressWrap = document.querySelector('.progress-wrap');

  if (window.scrollY > offset) {
    progressWrap.classList.add('active-progress');
  } else {
    progressWrap.classList.remove('active-progress');
  }
});

document.querySelector('.progress-wrap').addEventListener('click', function (e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



// PRELOADER (BOTANICAL SIVERA LOADER)
(function () {
  var start = Date.now();
  window.addEventListener("load", function () {
    var preloader = document.getElementById("preloader");
    if (!preloader) return;
    var wait = Math.max(0, 800 - (Date.now() - start));
    setTimeout(function () {
      preloader.classList.add("loaded");
      setTimeout(function () {
        preloader.remove();
      }, 700);
    }, wait);
  });
})();



// PRICE RANGE SLIDER FILTER 
document.querySelectorAll('.price-filter').forEach(function (filter) {

  const minRange = filter.querySelector('.range-min');
  const maxRange = filter.querySelector('.range-max');
  const minPrice = filter.querySelector('.minPrice');
  const maxPrice = filter.querySelector('.maxPrice');
  const selected = filter.querySelector('.range-selected');

  function updateRange() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);

    if (min > max - 10) {
      min = max - 10;
      minRange.value = min;
    }

    if (max < min + 10) {
      max = min + 10;
      maxRange.value = max;
    }

    minPrice.textContent = min;
    maxPrice.textContent = max;

    const minPercent = (min / minRange.max) * 100;
    const maxPercent = (max / maxRange.max) * 100;

    selected.style.left = minPercent + '%';
    selected.style.right = (100 - maxPercent) + '%';
  }

  minRange.addEventListener('input', updateRange);
  maxRange.addEventListener('input', updateRange);

  updateRange();
});

// Product Image
function changeImage(button) {
  const image = button.querySelector('img');
  document.getElementById('mainProductImage').src = image.src;
}


// RELATED PRODUCTS SLIDER
document.addEventListener('DOMContentLoaded', function () {

  new Swiper('.relatedProductSwiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.related-next',
      prevEl: '.related-prev'
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 16
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24
      }
    }
  });

});



////////////////// GSAP ANIMATION ///////////

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();
mm.add("(min-width: 992px)", () => {

  //Header section
  gsap.from("#site-header", {
    scrollTrigger: "header",
    y: -10,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
  });


  //Heading section
  gsap.utils.toArray(".section-header").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%"
      },
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });


  //Feature icons
  gsap.from(".feature-icon", {
    scrollTrigger: ".feature-icons-main",
    y: 30,
    opacity: 0,
    duration: 0.8
  });


  //Choose your look section
  gsap.from(".look-card > div.position-absolute", {
    scrollTrigger: ".choose-your-look-section",
    scale: 0.6,
    opacity: 0,
    duration: 0.8
  });

  //Discover section
  gsap.from(".craft-card .card-content", {
    scrollTrigger: ".discover-section",
    scale: 0.6,
    opacity: 0,
    duration: 0.8
  });
  gsap.from(".craft-card img", {
    scrollTrigger: ".discover-section",
    scale: 1.3,
    ease: "power2.out",
    duration: 0.8
  });



  //Testimonial section
  gsap.from(".testimonial-card p, .testimonial-card div", {
    scrollTrigger: ".testimonial-section",
    scale: 0.6,
    opacity: 0,
    duration: 0.8
  });

  //Instagram section
  gsap.from(".insta-feed-grid", {
    scrollTrigger: ".insta-section",
    y: -40,
    opacity: 0,
    duration: 0.8
  });

  //Footer section
  gsap.from(".footer-top, .footer-bottom", {
    scrollTrigger: "footer",
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
  });




});

// PRODUCT LISTING PAGINATION
document.addEventListener('DOMContentLoaded', function () {
  const listing = document.querySelector('.product-listing');
  if (!listing) return;

  const grid = listing.querySelector('.row.row-cols-2.row-cols-md-3.g-4');
  const pagination = listing.querySelector('.pagination');
  const showingEl = Array.from(listing.querySelectorAll('.text-muted.small')).find(el => /Showing/i.test(el.textContent));
  if (!grid || !pagination) return;

  const items = Array.from(grid.children).filter(el => el.classList.contains('col'));
  if (!items.length) return;

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  let currentPage = 1;

  function render() {
    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, items.length);

    items.forEach((item, i) => {
      item.style.display = (i >= start && i < end) ? '' : 'none';
    });

    if (showingEl) {
      showingEl.textContent = `Showing ${items.length ? start + 1 : 0} - ${end} of ${items.length} products`;
    }

    let html = '';
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link rounded-circle" href="#" data-page="prev" aria-label="Previous">&lsaquo;</a></li>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link rounded-circle" href="#" data-page="${i}">${i}</a></li>`;
    }
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link rounded-circle" href="#" data-page="next" aria-label="Next">&rsaquo;</a></li>`;
    pagination.innerHTML = html;
  }

  pagination.addEventListener('click', function (e) {
    const link = e.target.closest('a[data-page]');
    if (!link) return;
    e.preventDefault();
    const p = link.getAttribute('data-page');
    if (p === 'prev' && currentPage > 1) currentPage--;
    else if (p === 'next' && currentPage < totalPages) currentPage++;
    else if (!isNaN(parseInt(p, 10))) currentPage = parseInt(p, 10);
    render();
  });

  render();
});

// HERO SLIDER (LAYERED PARALLAX STYLE)
function initHeroSlider() {
  const hero = document.getElementById('hero');
  const stage = document.getElementById('heroStage');
  if (!hero || !stage) return;

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FAC = [.35, .18, .30, .12];
  const DATA = [
    {
      word: 'Shampoo', color: '#E8F3E4', img: 'hero_1.png',
      badge: 'Hair Care', title: 'Strong, Shiny Hair with Moringa & Aloe Vera',
      sub: 'Purifying shampoo for all hair types', cta: 'Shampoo',
      dark: true
    },
    {
      word: 'Face Wash', color: '#EEF7EC', img: 'hero_2_face_wash.webp',
      badge: 'Face Care', title: 'Fresh, Clean Skin with Moringa, Neem & Aloe Vera',
      sub: 'Purifying face wash for all skin types', cta: 'Face Wash',
      sage: true
    },
    {
      word: 'Cold Cream', color: '#DCE9D5', img: 'hero_3_cold_cream.webp',
      badge: 'Skin Care', title: 'Soft, Glowing Skin with Moringa & Aloe Vera',
      sub: '24-hour moisturizing cold cream for all skin types', cta: 'Cold Cream',
      green: true
    },
    {
      word: 'Body Lotion', color: '#E3F0DF', img: 'hero_4_body_lotion.webp',
      badge: 'Body Care', title: 'Soft, Hydrated Skin with Moringa & Aloe Vera',
      sub: '24-hour moisturizing body lotion for all skin types', cta: 'Body Lotion',
      olive: true
    }
  ];

  const slides = DATA.map((d, i) => {
    const sec = document.createElement('section');
    sec.className = 'sv-slide' + (d.dark ? ' sv-slide--dark' : '') + (d.green ? ' sv-slide--green' : '') + (d.sage ? ' sv-slide--sage' : '') + (d.olive ? ' sv-slide--olive' : '');
    sec.style.background = (d.dark || d.green || d.sage || d.olive) ? '' : d.color;

    const frame = document.createElement('div');
    frame.className = 'sv-frame';
    const L = [0, 1, 2, 3].map(() => {
      const layer = document.createElement('div');
      layer.className = 'sv-layer';
      frame.appendChild(layer);
      return layer;
    });

    const word = document.createElement('div');
    word.className = 'sv-word';
    word.textContent = d.word;
    word.setAttribute('aria-hidden', 'true');
    L[0].appendChild(word);

    if (!d.dark && !d.green && !d.sage && !d.olive) {
      [[10, 50, 40, 30], [68, 28, 32, 24], [40, 80, 28, 20]].forEach(([x, y, w, h]) => {
        const glow = document.createElement('div');
        glow.className = 'sv-glow';
        glow.style.left = x + '%';
        glow.style.top = y + '%';
        glow.style.width = w + '%';
        glow.style.height = h + '%';
        L[1].appendChild(glow);
      });
    }

    const product = document.createElement('div');
    product.className = 'sv-product';
    const bob = document.createElement('div');
    bob.className = 'sv-bob';
    const img = document.createElement('img');
    if (d.dark) img.className = 'sv-product-img--dark';
    if (d.green) img.className = 'sv-product-img--green';
    if (d.sage) img.className = 'sv-product-img--sage';
    if (d.olive) img.className = 'sv-product-img--olive';
    img.src = 'assets/images/hero/' + d.img;
    img.alt = d.title;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (i === 0) img.fetchPriority = 'high';
    bob.appendChild(img);
    product.appendChild(bob);
    L[2].appendChild(product);

    const copy = document.createElement('div');
    copy.className = 'sv-copy';
    const badge = document.createElement('span');
    badge.className = 'sv-badge';
    badge.textContent = d.badge;
    const heading = document.createElement('h2');
    heading.className = 'sv-heading';
    heading.textContent = d.title;
    const cta = document.createElement('a');
    cta.className = 'sv-cta';
    cta.href = 'product-list.html';
    cta.textContent = d.cta;
    copy.append(badge, heading);
    if (d.sub) {
      const sub = document.createElement('p');
      sub.className = 'sv-sub';
      sub.textContent = d.sub;
      copy.appendChild(sub);
    }
    copy.appendChild(cta);
    L[3].appendChild(copy);

    sec.appendChild(frame);
    stage.appendChild(sec);
    return { sec, L };
  });

  let cur = 0, busy = false, last = performance.now();

  function syncTheme(index) {
    hero.classList.toggle('sv-hero--dark', !!DATA[index].dark);
    hero.classList.toggle('sv-hero--green', !!DATA[index].green);
    hero.classList.toggle('sv-hero--sage', !!DATA[index].sage);
    hero.classList.toggle('sv-hero--olive', !!DATA[index].olive);
  }

  const CT = [0, .031, .134, .206, .278, .34, .412, .485, .546, .583, .62, .69, .79, .85, .93, 1];
  const CC = [0, .006, .012, .023, .047, .07, .105, .158, .246, .55, .825, .9, .94, .956, .975, 1];
  function cover(t) {
    if (t >= 1) return 1;
    let i = 1;
    while (CT[i] < t) i++;
    const k = (t - CT[i - 1]) / (CT[i] - CT[i - 1]);
    const s = 3 * k * k - 2 * k * k * k;
    return CC[i - 1] + (CC[i] - CC[i - 1]) * s;
  }

  function clear(s) {
    s.sec.style.clipPath = '';
    s.L.forEach(l => { l.style.transform = ''; });
  }

  function go(to, dir) {
    if (busy || to === cur) return;
    const A = slides[cur], B = slides[to];
    cur = to;
    syncTheme(to);
    if (RM) {
      slides.forEach((s, i) => {
        s.sec.classList.toggle('on', i === to);
        s.sec.style.zIndex = i === to ? 2 : '';
        clear(s);
      });
      return;
    }
    busy = true;
    B.sec.classList.add('on');
    B.sec.style.zIndex = 1;
    A.sec.style.zIndex = 2;
    const t0 = performance.now();
    (function step(now) {
      const w = hero.clientWidth;
      const t = (now - t0) / 900;
      const c = cover(t);
      A.sec.style.clipPath = dir > 0 ? 'inset(0 ' + (c * 100) + '% 0 0)' : 'inset(0 0 0 ' + (c * 100) + '%)';
      A.L.forEach(l => { l.style.transform = 'translateX(' + (-dir * c * .12 * w) + 'px)'; });
      const q = Math.min(1, Math.max(0, (t - .45) / .5));
      const k = 1 - (1 - q) * (1 - q);
      B.L.forEach((l, i) => { l.style.transform = 'translateX(' + (dir * (1 - k) * FAC[i] * w) + 'px)'; });
      if (t < 1 || k < 1) { requestAnimationFrame(step); return; }
      slides.forEach((s, i) => {
        s.sec.classList.toggle('on', i === to);
        s.sec.style.zIndex = i === to ? 2 : '';
        clear(s);
      });
      busy = false;
    })(t0);
  }

  const next = () => go((cur + 1) % DATA.length, 1);
  const prev = () => go((cur + DATA.length - 1) % DATA.length, -1);
  const user = fn => () => { last = performance.now(); fn(); };

  document.getElementById('heroNext').onclick = user(next);
  document.getElementById('heroPrev').onclick = user(prev);
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { last = performance.now(); next(); }
    if (e.key === 'ArrowLeft') { last = performance.now(); prev(); }
  });

  let sx = 0, sy = 0, down = false;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; down = true; });
  addEventListener('pointerup', e => {
    if (!down) return;
    down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      last = performance.now();
      dx < 0 ? next() : prev();
    }
  });

  setInterval(() => {
    if (!document.hidden && performance.now() - last > 6000) next();
  }, 2600);

  slides[0].sec.classList.add('on');
  slides[0].sec.style.zIndex = 2;
  syncTheme(0);

  let revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    if (!RM) {
      const ease = 'cubic-bezier(0.22, 0.8, 0.3, 1)';
      const w = hero.clientWidth;
      slides[0].L.forEach((l, i) => {
        l.animate(
          [{ transform: 'translateX(' + (FAC[i] * w) + 'px)' }, { transform: 'translateX(0)' }],
          { duration: 900, easing: ease }
        );
      });
      [[document.getElementById('heroPrev'), 490], [document.getElementById('heroNext'), 650]]
        .forEach(([el, delay]) => {
          el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: delay, easing: ease, fill: 'backwards' });
        });
    }
  }

  if (!RM) slides[0].L.forEach(l => { l.style.transform = 'translateX(99999px)'; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
    slides[0].L.forEach(l => { l.style.transform = ''; });
    reveal();
  });
  else reveal();
  setTimeout(() => {
    slides[0].L.forEach(l => { l.style.transform = ''; });
    reveal();
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}

// MODERN GALLERY FILTER & LIGHTBOX
function initModernGallery() {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) return;

  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  const modalEl = document.getElementById('galleryModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const modalTag = document.getElementById('lightboxTag');
  const modalLink = document.getElementById('lightboxLink');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentCategory = 'all';
  let activeVisibleItems = items;
  let activeIndex = 0;

  // Page entrance animation
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.gallery-hero-banner .container > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });

    gallery.classList.add('gallery-animating');
    gsap.from(items, {
      scrollTrigger: {
        trigger: gallery,
        start: 'top 85%',
        once: true
      },
      y: 45,
      opacity: 0,
      scale: 0.97,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out',
      onComplete: () => gallery.classList.remove('gallery-animating')
    });

    const community = document.querySelector('.gallery-community-strip');
    if (community) {
      gsap.from(community, {
        scrollTrigger: {
          trigger: community,
          start: 'top 88%',
          once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }

  // Initialize counts
  filterBtns.forEach(btn => {
    const cat = btn.getAttribute('data-filter');
    const badge = btn.querySelector('.badge-count');
    if (badge) {
      if (cat === 'all') {
        badge.textContent = items.length;
      } else {
        const count = items.filter(it => it.getAttribute('data-category') === cat).length;
        badge.textContent = count;
      }
    }
  });

  // Filter click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      currentCategory = filter;

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });

      activeVisibleItems = items.filter(it => filter === 'all' || it.getAttribute('data-category') === filter);
    });
  });

  // Lightbox data binding
  function showLightboxIndex(idx) {
    if (!activeVisibleItems.length) return;
    if (idx < 0) idx = activeVisibleItems.length - 1;
    if (idx >= activeVisibleItems.length) idx = 0;
    activeIndex = idx;

    const item = activeVisibleItems[activeIndex];
    const card = item.querySelector('.gallery-card');
    const img = card.querySelector('img');
    const title = card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '';
    const desc = card.getAttribute('data-desc') || card.querySelector('p')?.textContent || '';
    const tag = card.getAttribute('data-tag') || card.querySelector('.gallery-pill-tag')?.textContent || '';
    const link = card.getAttribute('data-link') || 'product-list.html';

    if (modalImg) modalImg.src = img.src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalTag) modalTag.textContent = tag;
    if (modalLink) modalLink.href = link;
  }

  // Open modal on card or zoom click
  items.forEach(item => {
    const card = item.querySelector('.gallery-card');
    card.addEventListener('click', function (e) {
      if (e.target.closest('.gallery-cta-link')) return; // Allow direct product link click
      const visibleIndex = activeVisibleItems.indexOf(item);
      if (visibleIndex !== -1) {
        showLightboxIndex(visibleIndex);
        if (modalEl && window.bootstrap) {
          const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
          bsModal.show();
        }
      }
    });
  });

  // Prev & Next handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showLightboxIndex(activeIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showLightboxIndex(activeIndex + 1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!modalEl || !modalEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') {
      showLightboxIndex(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showLightboxIndex(activeIndex + 1);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModernGallery);
} else {
  initModernGallery();
}

// SITE-WIDE PAGE ANIMATIONS
function initPageAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  // Gallery has its own tailored animation
  if (document.querySelector('.gallery-grid')) return;

  gsap.registerPlugin(ScrollTrigger);

  const revealBatch = (targets, options = {}) => {
    const list = Array.from(targets || []);
    if (!list.length) return;

    ScrollTrigger.batch(list, {
      start: options.start || 'top 86%',
      once: true,
      onEnter: batch => gsap.fromTo(batch, {
        y: options.y ?? 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: options.duration || 0.75,
        stagger: options.stagger || 0.08,
        ease: 'power3.out',
        overwrite: true
      })
    });
  };

  // Page heading
  const headings = Array.from(document.querySelectorAll('h1')).filter(el => {
    return !el.closest('.hero-slider-section') && !el.closest('.sv-hero') && !el.closest('.section-header');
  });
  if (headings.length) {
    gsap.from(headings, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  // Mobile section headings
  if (window.innerWidth < 992) {
    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: '.section-header',
        start: 'top 85%',
        once: true
      },
      y: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Homepage sections already have desktop-only animations
    revealBatch(document.querySelectorAll('.feature-icon'));
    revealBatch(document.querySelectorAll('.look-card'));
    revealBatch(document.querySelectorAll('.craft-card'));
    revealBatch(document.querySelectorAll('.testimonial-card'));
    revealBatch(document.querySelectorAll('.insta-feed-grid > *'));
  }

  revealBatch(document.querySelectorAll('.product-listing .product-card'), {
    stagger: 0.06
  });

  revealBatch(document.querySelectorAll('.product-slider-section .tab-pane.active .swiper-slide'), {
    stagger: 0.06
  });

  revealBatch(document.querySelectorAll('.related-products .swiper-slide'), {
    stagger: 0.06
  });

  revealBatch(document.querySelectorAll('.blog-featured, .blog-card, .blog-cta-card'), {
    stagger: 0.08
  });

  revealBatch(document.querySelectorAll('.faq-accordion .accordion-item'), {
    stagger: 0.06
  });

  revealBatch(document.querySelectorAll('.about-team .card'), {
    stagger: 0.08
  });

  revealBatch(document.querySelectorAll('.mission-vision .mission-content, .mission-vision .mission-image'), {
    stagger: 0.12
  });

  const contactPage = document.querySelector('.contact-page');
  if (contactPage) {
    revealBatch(contactPage.querySelectorAll('.contact-hero-card, .contact-method-card'), {
      stagger: 0.08
    });
    revealBatch(contactPage.querySelectorAll('.contact-form-card, .contact-info-card'), {
      stagger: 0.12
    });
  }


  /* Live open/closed status (India time) */
  (function () {
    var el = document.getElementById('contactStatus');
    var txt = document.getElementById('contactStatusText');
    if (!el || !txt) return;
    try {
      var p = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date()).reduce(function (a, x) { a[x.type] = x.value; return a; }, {});
      var mins = parseInt(p.hour, 10) * 60 + parseInt(p.minute, 10);
      var open = p.weekday !== 'Sun' && mins >= 600 && mins < 1080;
      el.dataset.state = open ? 'open' : 'closed';
      txt.textContent = open ? 'Open now · until 6:00 pm' : 'Closed now · opens Mon – Sat, 10:00 am';
    } catch (e) { /* keep static text */ }
  })();

  /* Prefill contact form when opened from Buy Now */
  (function () {
    var product = new URLSearchParams(window.location.search).get('product');
    if (!product) return;
    var subject = document.getElementById('contactSubject');
    var message = document.getElementById('contactMessage');
    if (subject) subject.value = 'Product question';
    if (message) {
      message.value = 'Hello, I would like to order ' + product + '. Please share availability and next steps.';
    }
  })();


  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    const productRow = mainImage.closest('.row');
    const imageCol = mainImage.closest('.col-12.col-lg-7');
    const infoCol = productRow ? productRow.querySelector('.col-lg-5') : null;

    if (imageCol) {
      revealBatch([imageCol], { y: 30 });
    }
    if (infoCol) {
      const infoItems = Array.from(infoCol.children).filter(el => el.tagName !== 'H1');
      revealBatch(infoItems, { stagger: 0.06 });
    }
  }

  revealBatch(document.querySelectorAll('.checkout-page section'), {
    stagger: 0.08
  });

  const orderSummary = document.querySelector('.order-summary');
  if (orderSummary) {
    gsap.from(orderSummary, {
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPageAnimations);
} else {
  initPageAnimations();
}

// BLOG CATEGORY FILTER
function initBlogFilter() {
  const filterBar = document.getElementById('blogFilterBar');
  const blogGrid = document.getElementById('blogGrid');
  if (!filterBar || !blogGrid) return;

  const buttons = filterBar.querySelectorAll('button[data-blog-filter]');
  const items = blogGrid.querySelectorAll('.blog-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-blog-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter || cat === 'all') {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogFilter);
} else {
  initBlogFilter();
}


/*--------------------------------------------------------------
# MODERN PRODUCT LISTING CONTROLLER (SIVERA)
--------------------------------------------------------------*/
function initProductListing() {
  const productGrid = document.getElementById("shopProductGrid");
  if (!productGrid) return;

  const filterPills = document.querySelectorAll("button[data-product-filter], .shop-cat-pill");
  const searchInput = document.getElementById("shopSearchInput");
  const sortSelect = document.getElementById("shopSortSelect");
  const countLabel = document.getElementById("shopProductCount");
  const emptyState = document.getElementById("shopEmptyState");
  const gridBtns = document.querySelectorAll(".shop-view-btn");
  const clearSearchBtn = document.getElementById("shopClearSearch");

  let currentCategory = "all";
  let searchQuery = "";

  function filterAndSortProducts() {
    const cards = Array.from(productGrid.querySelectorAll(".product-grid-col"));
    let visibleCount = 0;

    cards.forEach((col) => {
      const cat = col.getAttribute("data-category") || "";
      const title = (col.getAttribute("data-title") || "").toLowerCase();
      const benefits = (col.getAttribute("data-benefits") || "").toLowerCase();
      const query = searchQuery.trim().toLowerCase();

      const matchesCat = currentCategory === "all" || cat === currentCategory;
      const matchesSearch = !query || title.includes(query) || benefits.includes(query);

      if (matchesCat && matchesSearch) {
        col.style.display = "";
        col.classList.remove("d-none");
        visibleCount++;
      } else {
        col.style.display = "none";
        col.classList.add("d-none");
      }
    });

    // Update count label
    if (countLabel) {
      countLabel.textContent = `Showing ${visibleCount} of ${cards.length} products`;
    }

    // Toggle Empty State
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove("d-none");
      } else {
        emptyState.classList.add("d-none");
      }
    }
  }

  // Category Filter Pill Click
  filterPills.forEach((pill) => {
    pill.addEventListener("click", function (e) {
      e.preventDefault();
      filterPills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.getAttribute("data-product-filter") || "all";
      filterAndSortProducts();
    });
  });

  // Search input with debounce
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = this.value;
      filterAndSortProducts();
    });
  }

  // Clear search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      filterAndSortProducts();
    });
  }

  // Sorting
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const mode = this.value;
      const cols = Array.from(productGrid.querySelectorAll(".product-grid-col"));

      cols.sort((a, b) => {
        const orderA = parseInt(a.getAttribute("data-featured-order") || 0);
        const orderB = parseInt(b.getAttribute("data-featured-order") || 0);
        return orderA - orderB;
      });

      cols.forEach((col) => productGrid.appendChild(col));
    });
  }

  // Grid column switcher (3 cols vs 4 cols)
  gridBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      gridBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const cols = this.getAttribute("data-grid");

      productGrid.classList.remove("row-cols-lg-3", "row-cols-lg-4");
      if (cols === "4") {
        productGrid.classList.add("row-cols-lg-4");
      } else {
        productGrid.classList.add("row-cols-lg-3");
      }
    });
  });

  // Quick View Modal
  const qvModal = document.getElementById("quickViewModal");
  if (qvModal) {
    document.querySelectorAll(".btn-quickview").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const card = this.closest(".product-grid-col");
        if (!card) return;

        const title = card.getAttribute("data-title") || "";
        const cat = card.getAttribute("data-cat-name") || "";
        const size = card.getAttribute("data-size") || "";
        const img = card.getAttribute("data-img") || "";
        const benefits = JSON.parse(card.getAttribute("data-benefits-list") || "[]");
        const ingredients = card.getAttribute("data-ingredients") || "";

        qvModal.querySelector("#qvTitle").textContent = title;
        qvModal.querySelector(".qv-enquire-btn").href = "contact.html?product=" + encodeURIComponent(title);
        qvModal.querySelector("#qvCategory").textContent = `${cat} • ${size}`;
        qvModal.querySelector("#qvImg").src = img;
        qvModal.querySelector("#qvImg").alt = title;

        const bList = qvModal.querySelector("#qvBenefits");
        bList.innerHTML = "";
        benefits.forEach((b) => {
          const li = document.createElement("li");
          li.innerHTML = `<i class="bi bi-check-circle-fill"></i> <span>${b}</span>`;
          bList.appendChild(li);
        });

        qvModal.querySelector("#qvIngredients").textContent = ingredients;

        const bsModal = bootstrap.Modal.getOrCreateInstance(qvModal);
        bsModal.show();
      });
    });
  }
}

// Toast helper
function showSiveraToast(msg) {
  let toast = document.getElementById("siveraToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siveraToast";
    toast.className = "sivera-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="bi bi-heart-fill"></i> <span>${msg}</span>`;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProductListing);
} else {
  initProductListing();
}

/* Floating WhatsApp button */
(function () {
  if (document.getElementById("siveraWhatsapp")) return;
  var link = document.createElement("a");
  link.id = "siveraWhatsapp";
  link.className = "sivera-whatsapp";
  link.href = "https://wa.me/919274044078?text=" + encodeURIComponent("Hello Sivera, I would like to know more about your products.");
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Chat with Sivera on WhatsApp");
  link.title = "Chat with us on WhatsApp";
  link.innerHTML = '<i class="bi bi-whatsapp" aria-hidden="true"></i>';
  document.body.appendChild(link);
})();

