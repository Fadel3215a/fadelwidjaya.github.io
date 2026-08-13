(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navLinks = document.querySelectorAll(".nav-list a");
  var yearEl = document.getElementById("year");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function closeNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
  }

  function openNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
    siteNav.classList.add("is-open");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  /* Active nav link based on scroll position (home page only) */
  var sections = document.querySelectorAll("main section[id]");

  if (sections.length > 0 && navLinks.length > 0) {
    function setActiveNavLink() {
      var scrollPos = window.scrollY + 140;
      var currentId = "";

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.getAttribute("id");
        }
      });

      navLinks.forEach(function (link) {
        var href = link.getAttribute("href");
        if (href === "#" + currentId) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("scroll", setActiveNavLink, { passive: true });
    setActiveNavLink();
  }

  /* Subtle scroll reveal */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealSelectors = [
      ".hero-content",
      ".hero-visual",
      ".capability-grid",
      ".selected-work-preview",
      ".content-panel",
      ".timeline-item",
      ".project-card",
      ".research-card",
      ".skill-category",
      ".contact-card",
      ".education-item",
      ".case-study-header",
      ".case-study section",
      ".workflow-viz",
      ".system-map"
    ];

    var revealElements = document.querySelectorAll(revealSelectors.join(","));

    revealElements.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
