document.addEventListener("DOMContentLoaded", () => {
    // Preloader fadeout
    const preloader = document.getElementById("preloader");
    if (preloader) {
        const fadeOutPreloader = () => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        };

        if (document.readyState === "complete") {
            fadeOutPreloader();
        } else {
            window.addEventListener("load", fadeOutPreloader);
        }

        // Safety fallback: Hide preloader after 3 seconds anyway
        setTimeout(() => {
            if (!preloader.classList.contains("fade-out")) {
                fadeOutPreloader();
            }
        }, 3000);
    }

    // Sticky Header Logic
    const stickyHeader = document.querySelector(".sticky-header");
    if (stickyHeader) {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 150) {
                stickyHeader.classList.add("sticky-active");
            } else {
                stickyHeader.classList.remove("sticky-active");
            }
        });
    }

    // Drawer toggling logic (Mobile Menu, Search Canvas, Mini-Cart Drawer)
    const overlay = document.getElementById("overlay");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const searchDrawer = document.getElementById("search-drawer");
    const cartDrawer = document.getElementById("cart-drawer");

    const openDrawer = (drawer) => {
        if (!drawer) return;
        overlay.classList.remove("opacity-0", "pointer-events-none");
        overlay.classList.add("opacity-100", "pointer-events-auto");
        drawer.classList.remove("-translate-x-full", "translate-x-full");
        drawer.classList.add("translate-x-0");
    };

    const closeAllDrawers = () => {
        overlay.classList.remove("opacity-100", "pointer-events-auto");
        overlay.classList.add("opacity-0", "pointer-events-none");
        
        if (mobileDrawer) {
            mobileDrawer.classList.remove("translate-x-0");
            mobileDrawer.classList.add("translate-x-full");
        }
        if (searchDrawer) {
            searchDrawer.classList.remove("translate-x-0");
            searchDrawer.classList.add("translate-x-full");
        }
        if (cartDrawer) {
            cartDrawer.classList.remove("translate-x-0");
            cartDrawer.classList.add("translate-x-full");
        }
    };

    // Event Listeners for Opening Drawers
    const mobileTriggers = document.querySelectorAll(".canvas_open");
    mobileTriggers.forEach(btn => {
        btn.addEventListener("click", () => openDrawer(mobileDrawer));
    });

    const searchTriggers = document.querySelectorAll(".header-search");
    searchTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openDrawer(searchDrawer);
        });
    });

    const cartTriggers = document.querySelectorAll(".mini-cart-icon");
    cartTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openDrawer(cartDrawer);
        });
    });

    const closeButtons = document.querySelectorAll(".drawer-close, #overlay");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", closeAllDrawers);
    });

    // Accordion Logic
    const accordion = document.getElementById("faqAccordion");
    if (accordion) {
        const items = accordion.querySelectorAll(".accordion-item");

        items.forEach(item => {
            const button = item.querySelector("button");
            const panel = item.querySelector(".panel");
            const icon = item.querySelector(".icon");

            button.addEventListener("click", (e) => {
                e.preventDefault();
                const isOpen = item.classList.contains("active-accordion");

                // Close all items
                items.forEach(itm => {
                    itm.classList.remove("active-accordion", "bg-[#fbfbfb]");
                    itm.classList.add("bg-white");
                    const pnl = itm.querySelector(".panel");
                    const icn = itm.querySelector(".icon");
                    pnl.style.maxHeight = "0px";
                    icn.classList.remove("rotate-45");
                    // Restore plus icon if not already
                    icn.innerHTML = '<i class="fas fa-plus"></i>';
                });

                // Open if it wasn't open
                if (!isOpen) {
                    item.classList.add("active-accordion", "bg-[#fbfbfb]");
                    item.classList.remove("bg-white");
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    icon.innerHTML = '<i class="fas fa-times"></i>';
                    icon.classList.add("rotate-45");
                }
            });
        });
    }
});
