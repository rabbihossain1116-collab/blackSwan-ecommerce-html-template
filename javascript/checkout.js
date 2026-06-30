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

    // Payment methods mutual exclusivity logic (so only one is checked at a time)
    const paymentCheckboxes = document.querySelectorAll("input[id^='payment_']");
    paymentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                paymentCheckboxes.forEach(cb => {
                    if (cb !== e.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});
