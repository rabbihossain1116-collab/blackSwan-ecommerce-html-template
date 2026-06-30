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

    // QuickView Modal toggling and actions logic
    const quickViewModal = document.getElementById("QuickViewModal");
    const quickViewModalContent = document.getElementById("QuickViewModalContent");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const quickViewTriggers = document.querySelectorAll("[data-bs-target='#QuickViewModal']");

    const openModal = () => {
        if (!quickViewModal) return;
        quickViewModal.classList.remove("hidden");
        quickViewModal.classList.add("flex");
        // Trigger reflow for transition animation
        setTimeout(() => {
            quickViewModal.classList.remove("opacity-0", "pointer-events-none");
            quickViewModal.classList.add("opacity-100", "pointer-events-auto");
            if (quickViewModalContent) {
                quickViewModalContent.classList.remove("scale-95");
                quickViewModalContent.classList.add("scale-100");
            }
        }, 10);
    };

    const closeModal = () => {
        if (!quickViewModal) return;
        quickViewModal.classList.remove("opacity-100", "pointer-events-auto");
        quickViewModal.classList.add("opacity-0", "pointer-events-none");
        if (quickViewModalContent) {
            quickViewModalContent.classList.remove("scale-100");
            quickViewModalContent.classList.add("scale-95");
        }
        setTimeout(() => {
            quickViewModal.classList.remove("flex");
            quickViewModal.classList.add("hidden");
        }, 300);
    };

    quickViewTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    
    if (quickViewModal) {
        quickViewModal.addEventListener("click", (e) => {
            if (e.target === quickViewModal) {
                closeModal();
            }
        });
    }

    // Modal gallery thumb click swap logic
    const modalMainImg = document.getElementById("modal-main-img");
    const modalThumbs = document.querySelectorAll("#modal-thumbs .modal-thumb-item");
    modalThumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            // Toggle active border styles
            modalThumbs.forEach(t => {
                t.classList.remove("border-primary", "border-2");
                t.classList.add("border-gray-200", "border");
            });
            thumb.classList.remove("border-gray-200", "border");
            thumb.classList.add("border-primary", "border-2");

            const thumbImg = thumb.querySelector("img");
            if (thumbImg && modalMainImg) {
                modalMainImg.src = thumbImg.src;
            }
        });
    });

    // Quantity selector logic in Quickview Modal
    const minusBtn = document.querySelector(".quantity-minus");
    const plusBtn = document.querySelector(".quantity-plus");
    const quantityInput = document.querySelector(".quantity-input");

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener("click", () => {
            let val = parseInt(quantityInput.value) || 1;
            if (val > 1) {
                quantityInput.value = val - 1;
            }
        });
        
        plusBtn.addEventListener("click", () => {
            let val = parseInt(quantityInput.value) || 1;
            quantityInput.value = val + 1;
        });
    }
});
