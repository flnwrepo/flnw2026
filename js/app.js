/* Frontline — interactions */
(function () {
  "use strict";

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Header scroll state
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.classList.toggle("open");
      mobileNav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("open");
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Services dropdown (desktop)
  var svcTrigger = document.getElementById("servicesTrigger");
  var svcMenu = document.getElementById("servicesMenu");
  if (svcTrigger && svcMenu) {
    var closeMenu = function () {
      svcMenu.hidden = true;
      svcTrigger.setAttribute("aria-expanded", "false");
    };
    var openMenu = function () {
      svcMenu.hidden = false;
      svcTrigger.setAttribute("aria-expanded", "true");
    };
    // Hover opens the menu on pointer devices. Without the flag below, the
    // mouseenter that precedes a click would open it and the click would
    // immediately close it again.
    var openedByHover = false;
    svcTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (openedByHover) {
        openedByHover = false;
        return;
      }
      if (svcMenu.hidden) openMenu();
      else closeMenu();
    });

    var wrap = svcTrigger.parentNode;
    var hoverTimer;
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      wrap.addEventListener("mouseenter", function () {
        clearTimeout(hoverTimer);
        if (svcMenu.hidden) {
          openMenu();
          openedByHover = true;
        }
      });
      wrap.addEventListener("mouseleave", function () {
        hoverTimer = setTimeout(function () {
          closeMenu();
          openedByHover = false;
        }, 160);
      });
    }
    document.addEventListener("click", function (e) {
      if (!svcMenu.hidden && !svcMenu.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !svcMenu.hidden) {
        closeMenu();
        svcTrigger.focus();
      }
    });
    svcMenu.addEventListener("focusout", function (e) {
      if (!svcMenu.contains(e.relatedTarget) && e.relatedTarget !== svcTrigger) closeMenu();
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
