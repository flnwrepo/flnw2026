/* ============================================================
   FRONTLINE — Sanity block-based renderer
   Fetches the homepage document from Sanity and renders
   each section block dynamically. Falls back to static HTML
   if Sanity is unreachable or not configured.
   ============================================================ */

(function () {
  "use strict";

  var PROJECT_ID = window.SANITY_PROJECT_ID || "REPLACE_WITH_PROJECT_ID";
  var DATASET = "production";
  var API_VERSION = "2024-08-24";

  if (PROJECT_ID === "REPLACE_WITH_PROJECT_ID") return;

  var API_URL =
    "https://" + PROJECT_ID + ".api.sanity.io/v" + API_VERSION +
    "/data/query/" + DATASET;

  // ─── GROQ query — fetch homepage with all references expanded ──
  var QUERY = `
    *[_type == "homepage"][0] {
      sections[] {
        ...,
        // Expand practice references
        practices[]->{ title, slug, lede, description, ctaLabel, ctaLink, isFeatured, grcTags, navLabel, order },
        // Expand operating stage references
        stages[]->{ title, description, barHeight, order },
        // Expand industry references
        industries[]->{ name, order },
        // Expand outcome references
        outcomes[]->{ figure, figureSuffix, title, description, isFeatured, order },
        // Expand insight references
        insights[]->{ title, slug, excerpt, category, subcategory, publishedAt, order },
        // Questions are inline objects, keep as-is
      }
    }
  `;

  function fetchHomepage() {
    var url = API_URL + "?query=" + encodeURIComponent(QUERY);
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Sanity query failed: " + r.status);
        return r.json();
      })
      .then(function (data) { return data.result; });
  }

  // ─── DOM helpers ─────────────────────────────────────────
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "href") node.setAttribute("href", attrs[k]);
        else if (k === "id") node.id = attrs[k];
        else if (k === "aria-hidden") node.setAttribute("aria-hidden", attrs[k]);
        else if (k === "data-block-type") node.setAttribute("data-block-type", attrs[k]);
        else if (k === "style") node.setAttribute("style", attrs[k]);
        else node[k] = attrs[k];
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function txt(s) { return document.createTextNode(s); }

  function threeBarMark(extraClass) {
    return el("span", {
      class: "list-mark" + (extraClass ? " " + extraClass : ""),
      "aria-hidden": "true",
      html: "<b></b><b></b><b></b>",
    });
  }

  function arrow() { return el("span", { "aria-hidden": "true", html: "&rarr;" }); }

  function applyEmphasis(text, emphasisWords) {
    if (!emphasisWords || !emphasisWords.length) return text;
    var result = text;
    emphasisWords.forEach(function (word) {
      var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(escaped, "gi"), "<em>$&</em>");
    });
    return result;
  }

  // ─── Portable Text → HTML (basic) ────────────────────────
  function renderPortableText(blocks) {
    if (!blocks || !blocks.length) return "";
    return blocks.map(function (block) {
      if (block._type !== "block") return "";
      var tag = block.style === "h2" ? "h2" :
                block.style === "h3" ? "h3" :
                block.style === "h4" ? "h4" :
                "p";
      var inner = (block.children || []).map(function (child) {
        var text = child.text || "";
        if (child.marks && child.marks.indexOf("strong") !== -1) text = "<strong>" + text + "</strong>";
        if (child.marks && child.marks.indexOf("em") !== -1) text = "<em>" + text + "</em>";
        return text;
      }).join("");
      return "<" + tag + ">" + inner + "</" + tag + ">";
    }).join("");
  }

  // ─── Block renderers ─────────────────────────────────────

  function renderHero(block) {
    var section = el("section", { class: "block block-hero", "data-block-type": "hero" });

    // Meta strip
    var meta = el("div", { class: "hero-meta-strip" });
    meta.appendChild(el("div", { class: "container", html:
      "<span>Frontline</span><span class='meta-div'></span>" +
      "<span>Technology Leadership &middot; Cybersecurity &middot; Governance</span>" +
      "<span class='meta-spacer'></span><span>Ventura, CA</span>"
    }));
    section.appendChild(meta);

    var content = el("div", { class: "container hero-content" });

    // Left
    var left = el("div", { class: "hero-left" });
    if (block.headline) {
      left.appendChild(el("h1", {
        class: "hero-headline reveal",
        html: block.headline.split("\n").map(function(l) { return l.trim(); }).join("<br />"),
      }));
    }
    if (block.kicker) {
      left.appendChild(el("p", { class: "hero-kicker reveal" }, block.kicker));
    }
    var bottom = el("div", { class: "hero-bottom reveal" });
    if (block.supportingCopy) bottom.appendChild(el("p", { class: "hero-supporting" }, block.supportingCopy));
    if (block.primaryCta || block.secondaryCta) {
      var actions = el("div", { class: "hero-actions" });
      if (block.primaryCta) actions.appendChild(el("a", {
        class: "btn btn-primary", href: block.primaryCtaLink || "#contact",
      }, block.primaryCta));
      if (block.secondaryCta) actions.appendChild(el("a", {
        class: "link-arrow", href: block.secondaryCtaLink || "#approach",
      }, [block.secondaryCta + " ", arrow()]));
      bottom.appendChild(actions);
    }
    left.appendChild(bottom);
    content.appendChild(left);

    // Right — motif
    var right = el("div", { class: "hero-right reveal", "aria-hidden": "true" });
    var motif = el("div", { class: "hero-motif" });
    ["Plan", "Secure", "Execute"].forEach(function (label, i) {
      motif.appendChild(el("div", { class: "motif-col" }, [
        el("span", { class: "motif-label" }, label),
        el("div", { class: "motif-bar motif-bar-" + (i + 1) }),
      ]));
    });
    right.appendChild(motif);
    right.appendChild(el("div", { class: "motif-baseline" }));
    var secondary = el("div", { class: "motif-secondary" });
    ["Leadership", "Governance", "Engineering"].forEach(function (label) {
      secondary.appendChild(el("span", {}, label));
    });
    right.appendChild(secondary);
    content.appendChild(right);

    section.appendChild(content);
    return section;
  }

  function renderQuestions(block) {
    var section = el("section", {
      class: "block block-questions",
      "data-block-type": "questions",
      id: "questions",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", { class: "section-number", "aria-hidden": "true" }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", { class: "section-label" }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title",
      html: block.title.replace(/\n/g, "<br />"),
    }));
    container.appendChild(head);

    if (block.questions && block.questions.length) {
      var list = el("ol", { class: "questions-list" });
      block.questions.forEach(function (q) {
        list.appendChild(el("li", { class: "reveal" }, [
          threeBarMark(),
          el("p", { html: applyEmphasis(q.text, q.emphasisWords) }),
        ]));
      });
      container.appendChild(list);
    }

    if (block.closingLine) {
      container.appendChild(el("p", { class: "questions-close" }, [
        threeBarMark(),
        txt(" " + block.closingLine),
      ]));
    }

    section.appendChild(container);
    return section;
  }

  function renderPractices(block) {
    var dark = block.theme === "dark";
    var section = el("section", {
      class: "block block-practices" + (dark ? " block-dark" : ""),
      "data-block-type": "practices",
      id: "services",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", {
        class: "section-number" + (dark ? " light" : ""),
        "aria-hidden": "true",
      }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", {
      class: "section-label" + (dark ? " light" : ""),
    }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title" + (dark ? " light" : ""),
      html: block.title.replace(/\n/g, "<br />"),
    }));
    if (block.aside) head.appendChild(el("p", {
      class: "section-aside" + (dark ? " light" : ""),
    }, block.aside));
    container.appendChild(head);

    if (block.practices && block.practices.length) {
      var list = el("ol", { class: "service-list" });
      block.practices.forEach(function (p) {
        var li = el("li", {
          class: "service reveal",
          id: p.slug ? p.slug.current : "",
        });
        li.appendChild(threeBarMark(dark ? "light" : ""));

        var body = el("div", { class: "service-body" });
        body.appendChild(el("h3", {}, p.title));
        if (p.lede) body.appendChild(el("p", { class: "service-lede" }, p.lede));
        body.appendChild(el("p", {}, p.description));

        if (p.grcTags && p.grcTags.length) {
          var tags = el("ul", { class: "cap-tags" });
          p.grcTags.forEach(function (tag) { tags.appendChild(el("li", {}, tag)); });
          body.appendChild(tags);
        }

        body.appendChild(el("a", {
          class: "link-arrow" + (dark ? " light" : ""),
          href: p.ctaLink || "#contact",
        }, [(p.ctaLabel || "Learn More") + " ", arrow()]));
        li.appendChild(body);
        list.appendChild(li);
      });
      container.appendChild(list);
    }

    section.appendChild(container);
    return section;
  }

  function renderOperatingModel(block) {
    var spacingClass = block.spacing === "tall" ? " block-tall" :
                       block.spacing === "compact" ? " block-compact" : "";
    var section = el("section", {
      class: "block block-operating-model" + spacingClass,
      "data-block-type": "operatingModel",
      id: "approach",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", { class: "section-number", "aria-hidden": "true" }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", { class: "section-label" }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title",
      html: block.title.replace(/\n/g, "<br />"),
    }));
    if (block.aside) head.appendChild(el("p", { class: "section-aside" }, block.aside));
    container.appendChild(head);

    if (block.stages && block.stages.length) {
      var diagram = el("div", { class: "model-diagram reveal" });
      var bars = el("div", { class: "model-bars" });
      block.stages.forEach(function (stage) {
        bars.appendChild(el("div", { class: "model-bar-col" }, [
          el("div", { class: "model-bar", style: "--h:" + (stage.barHeight || 50) + "%" }),
        ]));
      });
      diagram.appendChild(bars);
      diagram.appendChild(el("div", { class: "model-baseline" }));

      var labels = el("div", { class: "model-labels" });
      block.stages.forEach(function (stage) {
        var label = el("div", { class: "model-label" });
        label.appendChild(threeBarMark());
        label.appendChild(el("h4", {}, stage.title));
        label.appendChild(el("p", {}, stage.description));
        labels.appendChild(label);
      });
      diagram.appendChild(labels);
      container.appendChild(diagram);
    }

    if (block.marginNote) {
      container.appendChild(el("div", { class: "model-margin-note", "aria-hidden": "true", html: block.marginNote }));
    }

    section.appendChild(container);
    return section;
  }

  function renderUseCases(block) {
    var section = el("section", {
      class: "block block-use-cases",
      "data-block-type": "useCases",
      id: "fit",
    });

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", { class: "section-label" }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title",
      html: block.title.replace(/\n/g, "<br />"),
    }));
    if (block.aside) head.appendChild(el("p", { class: "section-aside" }, block.aside));
    container.appendChild(head);

    if (block.useCases && block.useCases.length) {
      var list = el("ol", { class: "use-cases" });
      block.useCases.forEach(function (uc) {
        var headCol = el("div", { class: "uc-head" }, [el("h3", {}, uc.title)]);
        var bodyCol = el("div", { class: "uc-body" }, [el("p", {}, uc.description)]);
        if (uc.ctaLabel) {
          bodyCol.appendChild(el("a", {
            class: "link-arrow",
            href: uc.ctaLink || "#contact",
          }, [uc.ctaLabel + " ", arrow()]));
        }
        list.appendChild(el("li", { class: "reveal" }, [headCol, bodyCol]));
      });
      container.appendChild(list);
    }

    section.appendChild(container);
    return section;
  }

  function renderIndustries(block) {
    var spacingClass = block.spacing === "tall" ? " block-tall" :
                       block.spacing === "compact" ? " block-compact" : "";
    var section = el("section", {
      class: "block block-industries" + spacingClass,
      "data-block-type": "industries",
      id: "industries",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", { class: "section-number", "aria-hidden": "true" }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", { class: "section-label" }, block.label));
    if (block.title) head.appendChild(el("h2", { class: "section-title" }, block.title));
    container.appendChild(head);

    if (block.industries && block.industries.length) {
      var list = el("ul", { class: "industries-list" });
      block.industries.forEach(function (ind) {
        list.appendChild(el("li", { class: "reveal" }, [
          threeBarMark(),
          el("span", { class: "ind-name" }, ind.name),
        ]));
      });
      container.appendChild(list);
    }

    if (block.note) container.appendChild(el("p", { class: "industries-note" }, block.note));

    section.appendChild(container);
    return section;
  }

  function renderOutcomes(block) {
    var dark = block.theme === "dark";
    var section = el("section", {
      class: "block block-outcomes" + (dark ? " block-dark" : ""),
      "data-block-type": "outcomes",
      id: "outcomes",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", {
        class: "section-number" + (dark ? " light" : ""),
        "aria-hidden": "true",
      }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", {
      class: "section-label" + (dark ? " light" : ""),
    }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title" + (dark ? " light" : ""),
      html: block.title.replace(/\n/g, "<br />"),
    }));
    container.appendChild(head);

    if (block.outcomes && block.outcomes.length) {
      var list = el("div", { class: "outcomes-list" });
      block.outcomes.forEach(function (o) {
        var figure = el("div", { class: "outcome-figure" }, o.figure || "");
        if (o.figureSuffix) figure.appendChild(el("span", { class: "outcome-figure-unit" }, o.figureSuffix));

        var body = el("div", { class: "outcome-body" });
        body.appendChild(el("h3", {}, o.title));
        body.appendChild(el("p", {}, o.description));

        list.appendChild(el("article", {
          class: "outcome reveal" + (o.isFeatured ? " outcome-featured" : ""),
        }, [figure, body]));
      });
      container.appendChild(list);
    }

    section.appendChild(container);
    return section;
  }

  function renderInsights(block) {
    var section = el("section", {
      class: "block block-insights",
      "data-block-type": "insights",
      id: "insights",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", { class: "section-number", "aria-hidden": "true" }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", { class: "section-label" }, block.label));
    if (block.title) head.appendChild(el("h2", { class: "section-title" }, block.title));
    container.appendChild(head);

    if (block.insights && block.insights.length) {
      var max = block.maxDisplay || 0;
      var items = max > 0 ? block.insights.slice(0, max) : block.insights;
      var list = el("ul", { class: "insights-list" });
      items.forEach(function (ins) {
        var meta = el("div", { class: "insight-meta" }, [
          el("span", {}, ins.category || ""),
          el("span", { class: "dot", html: "&middot;" }),
          el("span", {}, ins.subcategory || ""),
        ]);
        var h3 = el("h3", {}, ins.title);
        var p = el("p", {}, ins.excerpt || "");
        var link = el("span", { class: "link-arrow" }, ["Read ", arrow()]);
        var href = ins.slug && ins.slug.current ? "/insights/" + ins.slug.current + "/" : null;
        var anchor = el(href ? "a" : "div", href ? { href: href } : {}, [meta, h3, p, href ? link : null]);
        list.appendChild(el("li", { class: "insight reveal" }, [anchor]));
      });
      container.appendChild(list);
    }

    section.appendChild(container);
    return section;
  }

  function renderCta(block) {
    var spacingClass = block.spacing === "tall" ? " block-tall" : "";
    var section = el("section", {
      class: "block block-cta block-dark" + spacingClass,
      "data-block-type": "cta",
      id: "contact",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", { class: "section-number light", "aria-hidden": "true" }, block.sectionNumber));
    }

    var inner = el("div", { class: "container cta-inner" });
    var motif = el("div", { class: "cta-motif", "aria-hidden": "true", html: "<span></span><span></span><span></span>" });
    inner.appendChild(motif);

    var copy = el("div", { class: "cta-copy reveal" });
    if (block.label) copy.appendChild(el("p", { class: "section-label light" }, block.label));
    if (block.title) copy.appendChild(el("h2", {
      class: "cta-title",
      html: block.title.replace(/\n/g, "<br />"),
    }));
    if (block.lede) copy.appendChild(el("p", { class: "cta-lede" }, block.lede));

    var actions = el("div", { class: "cta-actions" });
    if (block.buttonLabel && block.email) {
      actions.appendChild(el("a", {
        class: "link-arrow light large",
        href: "mailto:" + block.email,
      }, [block.buttonLabel + " ", arrow()]));
    }
    if (block.phone) {
      var tel = block.phone.replace(/[^0-9]/g, "");
      actions.appendChild(el("a", { class: "cta-phone", href: "tel:" + tel }, block.phone));
    }
    copy.appendChild(actions);
    inner.appendChild(copy);
    section.appendChild(inner);
    return section;
  }

  function renderCustomText(block) {
    var dark = block.theme === "dark";
    var spacingClass = block.spacing === "tall" ? " block-tall" :
                       block.spacing === "compact" ? " block-compact" : "";
    var section = el("section", {
      class: "block block-custom-text" + (dark ? " block-dark" : "") + spacingClass,
      "data-block-type": "customText",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", {
        class: "section-number" + (dark ? " light" : ""),
        "aria-hidden": "true",
      }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    var head = el("div", { class: "section-head-async" });
    if (block.label) head.appendChild(el("p", {
      class: "section-label" + (dark ? " light" : ""),
    }, block.label));
    if (block.title) head.appendChild(el("h2", {
      class: "section-title" + (dark ? " light" : ""),
    }, block.title));
    container.appendChild(head);

    if (block.body) {
      var body = el("div", {
        class: "custom-text-body" + (dark ? " dark" : ""),
        html: renderPortableText(block.body),
      });
      container.appendChild(body);
    }

    if (block.ctaLabel) {
      container.appendChild(el("a", {
        class: "link-arrow" + (dark ? " light" : ""),
        href: block.ctaLink || "#contact",
      }, [block.ctaLabel + " ", arrow()]));
    }

    section.appendChild(container);
    return section;
  }

  function renderSplitContent(block) {
    var dark = block.theme === "dark";
    var spacingClass = block.spacing === "tall" ? " block-tall" :
                       block.spacing === "compact" ? " block-compact" : "";
    var section = el("section", {
      class: "block block-split-content" + (dark ? " block-dark" : "") + spacingClass,
      "data-block-type": "splitContent",
    });
    if (block.sectionNumber) {
      section.appendChild(el("div", {
        class: "section-number" + (dark ? " light" : ""),
        "aria-hidden": "true",
      }, block.sectionNumber));
    }

    var container = el("div", { class: "container" });
    if (block.label) container.appendChild(el("p", {
      class: "section-label" + (dark ? " light" : ""),
    }, block.label));

    var grid = el("div", { class: "split-grid" });
    var left = el("div", { class: "split-col" });
    if (block.leftTitle) left.appendChild(el("h3", {
      class: "split-title" + (dark ? " light" : ""),
    }, block.leftTitle));
    if (block.leftBody) left.appendChild(el("div", {
      class: "split-body" + (dark ? " dark" : ""),
      html: renderPortableText(block.leftBody),
    }));
    grid.appendChild(left);

    var right = el("div", { class: "split-col" });
    if (block.rightTitle) right.appendChild(el("h3", {
      class: "split-title" + (dark ? " light" : ""),
    }, block.rightTitle));
    if (block.rightBody) right.appendChild(el("div", {
      class: "split-body" + (dark ? " dark" : ""),
      html: renderPortableText(block.rightBody),
    }));
    grid.appendChild(right);

    container.appendChild(grid);
    section.appendChild(container);
    return section;
  }

  function renderPullQuote(block) {
    var dark = block.theme === "dark";
    var spacingClass = block.spacing === "tall" ? " block-tall" : "";
    var section = el("section", {
      class: "block block-pull-quote" + (dark ? " block-dark" : "") + spacingClass,
      "data-block-type": "pullQuote",
    });

    var container = el("div", { class: "container" });
    var quote = el("blockquote", {
      class: "pull-quote" + (dark ? " light" : ""),
    }, block.quote);
    if (block.attribution) {
      container.appendChild(el("p", {
        class: "pull-quote-attribution" + (dark ? " light" : ""),
      }, block.attribution));
    }
    container.insertBefore(quote, container.firstChild);
    section.appendChild(container);
    return section;
  }

  function renderMotifDivider(block) {
    var dark = block.theme === "dark";
    var heights = { small: "60px", medium: "120px", large: "200px" };
    var h = heights[block.height] || heights.medium;
    var section = el("section", {
      class: "block block-motif-divider" + (dark ? " block-dark" : ""),
      "data-block-type": "motifDivider",
      style: "padding-top:" + h + ";padding-bottom:" + h + ";",
    });

    if (block.showBars) {
      var container = el("div", { class: "container motif-divider-bars" });
      container.appendChild(el("div", { class: "motif-div-bar motif-div-1" }));
      container.appendChild(el("div", { class: "motif-div-bar motif-div-2" }));
      container.appendChild(el("div", { class: "motif-div-bar motif-div-3" }));
      section.appendChild(container);
    }
    return section;
  }

  // ─── Block type → renderer mapping ───────────────────────
  var renderers = {
    heroBlock: renderHero,
    questionsBlock: renderQuestions,
    practicesBlock: renderPractices,
    operatingModelBlock: renderOperatingModel,
    industriesBlock: renderIndustries,
    useCasesBlock: renderUseCases,
    outcomesBlock: renderOutcomes,
    insightsBlock: renderInsights,
    ctaBlock: renderCta,
    customTextBlock: renderCustomText,
    splitContentBlock: renderSplitContent,
    pullQuoteBlock: renderPullQuote,
    motifDividerBlock: renderMotifDivider,
  };

  // ─── Render the page ─────────────────────────────────────
  function renderPage(homepage) {
    if (!homepage || !homepage.sections || !homepage.sections.length) return;

    var main = document.getElementById("main");
    if (!main) return;

    main.innerHTML = "";
    homepage.sections.forEach(function (block) {
      var renderer = renderers[block._type];
      if (renderer) {
        main.appendChild(renderer(block));
      }
    });

    observeReveals();
  }

  // ─── Reveal observer ─────────────────────────────────────
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (e) { e.classList.add("is-visible"); });
      return;
    }
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
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (e) { io.observe(e); });
  }

  // ─── Load and render ─────────────────────────────────────
  function init() {
    fetchHomepage()
      .then(renderPage)
      .catch(function (err) {
        console.warn("Sanity content load failed, using static HTML:", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
