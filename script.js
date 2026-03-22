// script.js — Euroflex HDPE Pipes
// Gushwork Frontend Assignment

document.addEventListener(‘DOMContentLoaded’, function () {

// ————————————————
// STICKY HEADER
// Slides in ABOVE the main nav after user scrolls
// past 60% of the hero section. Hides on scroll back.
// ————————————————
var stickyHeader = document.getElementById(‘stickyHeader’);
var hero = document.getElementById(‘hero’);

if (stickyHeader && hero) {
var rafPending = false;

```
window.addEventListener('scroll', function () {
  if (!rafPending) {
    requestAnimationFrame(function () {
      var scrolled = window.scrollY;
      var heroBottom = hero.offsetTop + hero.offsetHeight * 0.6;

      if (scrolled > heroBottom) {
        stickyHeader.classList.add('is-visible');
      } else {
        stickyHeader.classList.remove('is-visible');
      }
      rafPending = false;
    });
    rafPending = true;
  }
}, { passive: true });
```

}

// ————————————————
// MOBILE BURGER MENU
// ————————————————
var burger = document.getElementById(‘burgerBtn’);
var mobileNav = document.getElementById(‘mobileNav’);

if (burger && mobileNav) {
burger.addEventListener(‘click’, function () {
mobileNav.classList.toggle(‘is-open’);
});

```
mobileNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileNav.classList.remove('is-open');
  });
});
```

}

// ————————————————
// IMAGE CAROUSEL WITH ZOOM
// Handles prev/next arrows, dot indicators,
// IntersectionObserver to track active slide,
// and touch swipe support.
// The actual zoom effect is pure CSS (see .zoom-overlay).
// ————————————————
var track = document.getElementById(‘appTrack’);
var prevBtn = document.getElementById(‘appPrev’);
var nextBtn = document.getElementById(‘appNext’);
var dotsContainer = document.getElementById(‘carouselDots’);

if (track && prevBtn && nextBtn) {
var cards = Array.from(track.querySelectorAll(’.carousel-card’));
var activeIndex = 0;

```
// build dot indicators
cards.forEach(function (_, i) {
  var dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' is-active' : '');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  dot.setAttribute('role', 'tab');
  dot.addEventListener('click', function () {
    scrollToCard(i);
  });
  dotsContainer.appendChild(dot);
});

var dots = Array.from(dotsContainer.querySelectorAll('.dot'));

function scrollToCard(index) {
  index = Math.max(0, Math.min(index, cards.length - 1));
  var card = cards[index];
  var trackPad = parseInt(getComputedStyle(track).paddingLeft) || 4;
  track.scrollTo({ left: card.offsetLeft - trackPad, behavior: 'smooth' });
  setActive(index);
}

function setActive(index) {
  activeIndex = index;
  dots.forEach(function (dot, i) {
    dot.classList.toggle('is-active', i === index);
  });
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === cards.length - 1;
}

setActive(0);

prevBtn.addEventListener('click', function () {
  scrollToCard(activeIndex - 1);
});

nextBtn.addEventListener('click', function () {
  scrollToCard(activeIndex + 1);
});

// update active dot as user scrolls/drags through cards
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var idx = cards.indexOf(entry.target);
      if (idx !== -1) setActive(idx);
    }
  });
}, { root: track, threshold: 0.6 });

cards.forEach(function (card) { observer.observe(card); });

// keyboard nav when carousel is focused
track.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(activeIndex + 1); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollToCard(activeIndex - 1); }
});

// swipe support
var swipeStartX = 0;
track.addEventListener('touchstart', function (e) {
  swipeStartX = e.touches[0].clientX;
}, { passive: true });
track.addEventListener('touchend', function (e) {
  var diff = swipeStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    scrollToCard(diff > 0 ? activeIndex + 1 : activeIndex - 1);
  }
}, { passive: true });
```

}

// ————————————————
// PROCESS TABS
// ————————————————
var tabs = document.querySelectorAll(’.process__tab’);
var panels = document.querySelectorAll(’.process__panel’);

if (tabs.length) {
tabs.forEach(function (tab) {
tab.addEventListener(‘click’, function () {
var step = tab.getAttribute(‘data-step’);
tabs.forEach(function (t) { t.classList.remove(‘is-active’); });
tab.classList.add(‘is-active’);
panels.forEach(function (panel) {
panel.classList.toggle(‘is-active’, panel.getAttribute(‘data-step’) === step);
});
});
});
}

// ————————————————
// CONTACT FORM
// ————————————————
var contactForm = document.getElementById(‘contactForm’);

if (contactForm) {
contactForm.addEventListener(‘submit’, function (e) {
e.preventDefault();

```
  var valid = true;
  contactForm.querySelectorAll('input[required]').forEach(function (field) {
    if (!field.value.trim()) {
      field.focus();
      valid = false;
    }
  });
  if (!valid) return;

  var submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(function () {
    submitBtn.textContent = '✓ Request Sent!';
    submitBtn.style.background = '#166534';
    contactForm.reset();

    setTimeout(function () {
      submitBtn.textContent = 'Request Custom Quote';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  }, 1200);
});
```

}

}); // end DOMContentLoaded

// ————————————————
// CATALOGUE EMAIL BAR
// Global because it’s called via onclick in HTML
// ————————————————
function handleCatalogueSubmit() {
var input = document.getElementById(‘catalogueEmail’);
if (!input || !input.value.includes(’@’)) {
if (input) input.focus();
return;
}

var btn = input.nextElementSibling;
btn.textContent = ‘Sending…’;
btn.disabled = true;

setTimeout(function () {
btn.textContent = ‘✓ Check your inbox!’;
btn.style.background = ‘#166534’;
input.value = ‘’;

```
setTimeout(function () {
  btn.textContent = 'Request Catalogue';
  btn.style.background = '';
  btn.disabled = false;
}, 4000);
```

}, 1000);
}