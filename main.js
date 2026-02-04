/* ===============================
   ACTIVE NAV LINK
================================ */
document.querySelectorAll(".nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

/* ===============================
   FADE-IN + SLIDE ANIMATION
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  ".section, .card, .stat, .hero-content, .hero-box"
).forEach(el => {
  el.classList.add("fade");
  observer.observe(el);
});

/* ===============================
   HERO TEXT LOAD ANIMATION
================================ */
window.addEventListener("load", () => {
  document.querySelectorAll(".hero h2, .hero p, .hero .btn")
    .forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "all 0.8s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
});

/* ===============================
   COUNT-UP ANIMATION (STATS)
================================ */
const counters = document.querySelectorAll(".stat h3");

const countUp = (el) => {
  const target = parseInt(el.innerText.replace(/\D/g, ""));
  let current = 0;
  const increment = Math.ceil(target / 80);

  const update = () => {
    current += increment;
    if (current < target) {
      el.innerText = current + (el.innerText.includes("%") ? "%" : "+");
      requestAnimationFrame(update);
    } else {
      el.innerText = el.dataset.suffix
        ? target + el.dataset.suffix
        : el.innerText;
    }
  };
  update();
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => {
  // save suffix like + or %
  const suffix = counter.innerText.replace(/[0-9]/g, "");
  counter.dataset.suffix = suffix;
  statsObserver.observe(counter);
});

/* ===============================
   CONTACT FORM (STATIC SAFE)
================================ */
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! We will contact you shortly.");
    form.reset();
  });
}
