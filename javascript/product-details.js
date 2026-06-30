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

    // Gallery Thumbnail Switching
    const mainProductImg = document.getElementById("main-product-img");
    const thumbItems = document.querySelectorAll("#product-thumb-container .thumb-item");
    
    thumbItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active classes from all thumbs
            thumbItems.forEach(t => {
                t.classList.remove("active", "border-primary");
                t.classList.add("border-transparent");
            });
            // Add active to current thumb
            item.classList.remove("border-transparent");
            item.classList.add("active", "border-primary");
            
            // Update main image source
            const newSrc = item.querySelector("img").getAttribute("src");
            if (mainProductImg && newSrc) {
                mainProductImg.setAttribute("src", newSrc);
            }
        });
    });

    // Color Selector
    const colorBtns = document.querySelectorAll("#color-selector .color-btn");
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            colorBtns.forEach(b => {
                b.classList.remove("active", "ring-primary");
                b.classList.add("ring-transparent");
            });
            btn.classList.remove("ring-transparent");
            btn.classList.add("active", "ring-primary");
        });
    });

    // Size Selector
    const sizeBtns = document.querySelectorAll("#size-selector .size-btn");
    sizeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeBtns.forEach(b => {
                b.classList.remove("active", "border-primary", "text-primary");
                b.classList.add("border-gray-200", "text-secondary");
            });
            btn.classList.remove("border-gray-200", "text-secondary");
            btn.classList.add("active", "border-primary", "text-primary");
        });
    });

    // Product Quantity Handlers (+ / -)
    const setupQuantityHandlers = () => {
        const minusBtns = document.querySelectorAll(".quantity-minus");
        const plusBtns = document.querySelectorAll(".quantity-plus");
        
        minusBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const container = e.target.closest("div");
                const input = container.querySelector(".quantity-input");
                if (input) {
                    let val = parseInt(input.value) || 1;
                    if (val > 1) {
                        input.value = val - 1;
                        // Dispatch input event for dynamic recalculations if cart/checkout
                        input.dispatchEvent(new Event("change"));
                    }
                }
            });
        });
        
        plusBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const container = e.target.closest("div");
                const input = container.querySelector(".quantity-input");
                if (input) {
                    let val = parseInt(input.value) || 1;
                    input.value = val + 1;
                    input.dispatchEvent(new Event("change"));
                }
            });
        });
    };
    setupQuantityHandlers();

    // Tabs Switcher
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            
            // Update Tab Buttons layout classes
            tabBtns.forEach(b => {
                b.classList.remove("active", "border-primary", "text-secondary");
                b.classList.add("border-transparent", "text-muted");
            });
            btn.classList.remove("border-transparent", "text-muted");
            btn.classList.add("active", "border-primary", "text-secondary");
            
            // Show/Hide Panels
            tabPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.remove("hidden");
                } else {
                    panel.classList.add("hidden");
                }
            });
        });
    });

    // Related Products Slider Scroll
    const relatedContainer = document.getElementById("related-product-container");
    const prevBtn = document.getElementById("related-prev");
    const nextBtn = document.getElementById("related-next");
    
    if (relatedContainer && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            relatedContainer.scrollBy({ left: -300, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            relatedContainer.scrollBy({ left: 300, behavior: "smooth" });
        });
    }

    // Modal behavior logic for QuickView modal inside single product details page
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

    // QuickView Modal Thumbnail Switcher
    const modalMainImg = document.getElementById("modal-main-img");
    const modalThumbItems = document.querySelectorAll("#modal-thumbs .modal-thumb-item");
    
    modalThumbItems.forEach(item => {
        item.addEventListener("click", () => {
            modalThumbItems.forEach(t => {
                t.classList.remove("active", "border-primary");
                t.classList.add("border-transparent");
            });
            item.classList.remove("border-transparent");
            item.classList.add("active", "border-primary");
            
            const newSrc = item.querySelector("img").getAttribute("src");
            if (modalMainImg && newSrc) {
                modalMainImg.setAttribute("src", newSrc);
            }
        });
    });
});
