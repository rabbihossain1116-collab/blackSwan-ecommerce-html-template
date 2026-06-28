# AGENTS.md

Static HTML/CSS e-commerce template (  grocery store). No build system, bundler, or package manager.

## Project structure

- Root `*.html` — standalone page files (each is a complete page, not a template partial)
- `style.css` — main custom styles
- `assets/css/responsive.css` — responsive overrides
- `assets/css/` — vendor CSS (Bootstrap 5, FontAwesome, Owl Carousel, animate.css, etc.)
- `assets/js/` — vanilla JS + jQuery plugins (Owl Carousel, Lightcase, wow.js)
- `assets/img/` — images
- `assets/fonts/` — icon fonts

## Editing conventions

- Pages are independent HTML files with duplicated nav/footer markup across them. Changes to shared elements (header, footer) must be applied to every page manually.
- Vendor libraries (Bootstrap, jQuery 3.6, etc.) are vendored in `assets/` — do not update without testing all pages.
- Custom code lives in `assets/js/script.js` and `assets/js/mobile-menu.js`.
- CSS load order matters: vendor CSS loads first, `style.css` second, `responsive.css` last.

## No tooling

There are no lint, typecheck, test, build, or dev-server commands. To preview, open any `.html` file directly in a browser.
