#!/usr/bin/env python3
"""
Frontline static site build.

Assembles the shared layout, header and footer around each page body in
src/pages/ and writes plain static HTML to the repo root:

    src/pages/index.html                    ->  index.html
    src/pages/fractional-cio.html           ->  fractional-cio/index.html
    ... and so on for each service page

The generated HTML is committed, so the site still deploys as a plain static
folder with no build step on the host. Run this after editing anything in src/.

    python3 build.py
"""

import os
import re
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")

SANITY_SNIPPET = """  <!-- Sanity CMS integration — set window.SANITY_PROJECT_ID to enable -->
  <script>window.SANITY_PROJECT_ID = "REPLACE_WITH_PROJECT_ID";</script>
  <script src="/js/sanity.js"></script>"""

# source page  ->  (output path, url path, <title>, meta description, sanity?)
PAGES = [
    {
        "src": "index.html",
        "out": "index.html",
        "path": "/",
        "title": "Frontline — Technology Leadership. Cybersecurity. Governance.",
        "description": (
            "Frontline helps small businesses and nonprofits plan, secure, govern, and improve "
            "their technology environments — combining technology leadership, cybersecurity, GRC, "
            "engineering, and managed services so strategy moves into execution."
        ),
        "sanity": True,
    },
    {
        "src": "fractional-cio.html",
        "out": "fractional-cio/index.html",
        "path": "/fractional-cio/",
        "title": "Fractional CIO — Frontline",
        "description": (
            "Experienced technology leadership for organizations that need direction, structure, "
            "accountability, and long-term planning without adding a full-time CIO — backed by the "
            "engineering capability to execute the roadmap."
        ),
    },
    {
        "src": "governance-risk-compliance.html",
        "out": "governance-risk-compliance/index.html",
        "path": "/governance-risk-compliance/",
        "title": "Governance, Risk & Compliance — Frontline",
        "description": (
            "Practical GRC programs built around ongoing risk management, documentation, policies, "
            "evidence, remediation, and audit readiness. CMMC Level 2, NIST, HIPAA, and CIS "
            "readiness and alignment for small and midsized organizations."
        ),
    },
    {
        "src": "cybersecurity.html",
        "out": "cybersecurity/index.html",
        "path": "/cybersecurity/",
        "title": "Cybersecurity — Frontline",
        "description": (
            "Protect identities, endpoints, cloud applications, users, and business data through "
            "modern cybersecurity controls, 24/7 monitoring, awareness training, and hands-on "
            "remediation."
        ),
    },
    {
        "src": "managed-technology-services.html",
        "out": "managed-technology-services/index.html",
        "path": "/managed-technology-services/",
        "title": "Managed Technology Services — Frontline",
        "description": (
            "Engineering, support, infrastructure, cloud, cybersecurity, documentation, and ongoing "
            "technology management. Advisory-only, co-managed, fully managed, or defined projects."
        ),
    },
    {
        "src": "private-ai-ai-governance.html",
        "out": "private-ai-ai-governance/index.html",
        "path": "/private-ai-ai-governance/",
        "title": "Private AI & AI Governance — Frontline",
        "description": (
            "Secure AI access, practical AI governance, private organizational knowledge, and "
            "private AI architecture designed around business requirements and data sensitivity."
        ),
    },
    {
        "src": "contact.html",
        "out": "contact/index.html",
        "path": "/contact/",
        "title": "Contact — Frontline",
        "description": (
            "Start a conversation with Frontline about technology leadership, cybersecurity, "
            "governance, or managed technology services for your business or nonprofit."
        ),
    },
]


def read(*parts):
    with open(os.path.join(*parts), encoding="utf-8") as fh:
        return fh.read()


def mark_current(html, path):
    """Add aria-current="page" to nav links pointing at the current page."""
    if path == "/":
        return html
    return html.replace('<a href="%s">' % path, '<a href="%s" aria-current="page">' % path)


def build():
    layout = read(SRC, "layout.html")
    header = read(SRC, "partials", "header.html").rstrip("\n")
    footer = read(SRC, "partials", "footer.html").rstrip("\n")

    for page in PAGES:
        body = read(SRC, "pages", page["src"]).rstrip("\n")

        html = layout
        html = html.replace("{{HEADER}}", mark_current(header, page["path"]))
        html = html.replace("{{FOOTER}}", mark_current(footer, page["path"]))
        html = html.replace("{{BODY}}", body)
        html = html.replace("{{TITLE}}", page["title"])
        html = html.replace("{{DESCRIPTION}}", page["description"])
        html = html.replace("{{PATH}}", page["path"])
        html = html.replace("{{SANITY}}", SANITY_SNIPPET if page.get("sanity") else "")

        leftover = re.findall(r"\{\{[A-Z_]+\}\}", html)
        if leftover:
            raise SystemExit("Unreplaced placeholders in %s: %s" % (page["out"], leftover))

        dest = os.path.join(ROOT, page["out"])
        os.makedirs(os.path.dirname(dest) or ROOT, exist_ok=True)
        with open(dest, "w", encoding="utf-8") as fh:
            fh.write(html)
        print("built %-46s %6d bytes" % (page["out"], len(html)))


if __name__ == "__main__":
    build()
