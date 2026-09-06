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

  // Contact form. Submits to Web3Forms over fetch so the visitor stays on the
  // page; without JavaScript the form posts natively and still works.
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var statusEl = document.getElementById("contactStatus");
    var submitBtn = document.getElementById("contactSubmit");
    var subjectEl = document.getElementById("contactSubject");
    var keyField = contactForm.querySelector('input[name="access_key"]');
    var PLACEHOLDER_KEY = "WEB3FORMS_ACCESS_KEY_HERE";

    var setStatus = function (msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.className = "form-status" + (kind ? " is-" + kind : "");
    };

    contactForm.addEventListener("submit", function (e) {
      // Let the browser show its own messages for empty or malformed fields.
      if (!contactForm.checkValidity()) return;

      e.preventDefault();

      if (!keyField || keyField.value === PLACEHOLDER_KEY) {
        setStatus(
          "This form is not connected yet. The Web3Forms access key still needs to be set. " +
            "Email info@frontlinecio.com in the meantime.",
          "error"
        );
        return;
      }

      var data = new FormData(contactForm);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();

      // Put the sender in the subject so the PSA ticket summary identifies them.
      var who = name + (company ? ", " + company : "");
      data.set("subject", "Website enquiry: " + who + " (" + email + ")");
      if (subjectEl) subjectEl.value = data.get("subject");

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      setStatus("Sending your message…");

      var payload = {};
      data.forEach(function (value, key) { payload[key] = value; });

      fetch(contactForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().then(function (json) {
            return { ok: response.status === 200, json: json };
          });
        })
        .then(function (result) {
          if (!result.ok) throw new Error(result.json && result.json.message);
          var sent = document.createElement("div");
          sent.className = "form-sent";
          sent.setAttribute("role", "status");
          var h = document.createElement("h3");
          h.textContent = "Message sent.";
          var p = document.createElement("p");
          p.textContent =
            "Thanks" + (name ? ", " + name : "") + ". We have your note and will be in touch at " +
            email + ". If it is urgent, call 805.880.2251.";
          sent.appendChild(h);
          sent.appendChild(p);
          contactForm.parentNode.replaceChild(sent, contactForm);
          sent.focus && sent.setAttribute("tabindex", "-1");
          if (sent.focus) sent.focus();
        })
        .catch(function (err) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          var reason = (err && err.message) ? String(err.message).replace(/\.?$/, ".") :
                       "Something went wrong sending that.";
          setStatus(
            reason + " Please email info@frontlinecio.com or call 805.880.2251.",
            "error"
          );
        });
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
