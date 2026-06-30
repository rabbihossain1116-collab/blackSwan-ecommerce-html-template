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

    // Drawer toggling logic (Mobile Menu, Search Canvas, Mini-Cart Drawer, Filter Sidebar)
    const overlay = document.getElementById("overlay");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const searchDrawer = document.getElementById("search-drawer");
    const cartDrawer = document.getElementById("cart-drawer");
    const filterSidebar = document.getElementById("filter-sidebar");

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
        if (filterSidebar) {
            filterSidebar.classList.remove("translate-x-0");
            filterSidebar.classList.add("-translate-x-full");
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

    const filterToggleBtn = document.getElementById("filterToggle");
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openDrawer(filterSidebar);
        });
    }

    const closeButtons = document.querySelectorAll(".drawer-close, #filter-close, #overlay");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", closeAllDrawers);
    });

    // Filter Apply & Clear Logic
    const filterApplyBtn = document.getElementById("filter-apply");
    const filterClearBtn = document.getElementById("filter-clear");
    if (filterApplyBtn) {
        filterApplyBtn.addEventListener("click", () => {
            closeAllDrawers();
            // In a real application we would reload the grid based on criteria.
            console.log("Applying filters...");
        });
    }
    if (filterClearBtn) {
        filterClearBtn.addEventListener("click", () => {
            const inputs = document.querySelectorAll("#filter-sidebar input[type='checkbox']");
            inputs.forEach(input => input.checked = false);
            
            const range = document.getElementById("priceRange");
            if (range) {
                range.value = 250;
                const maxVal = document.getElementById("priceMax");
                if (maxVal) maxVal.textContent = "$250";
            }
            console.log("Filters cleared.");
        });
    }

    // Custom Dropdown sorting logic
    const dropdown = document.getElementById("custom-sort-dropdown");
    if (dropdown) {
        const trigger = dropdown.querySelector("#dropdown-trigger");
        const menu = dropdown.querySelector("#dropdown-menu");
        const chevron = dropdown.querySelector("#dropdown-chevron");
        const selectedText = dropdown.querySelector("#dropdown-selected-text");
        const hiddenInput = dropdown.querySelector("#sort-value");
        const items = menu.querySelectorAll("li");

        const toggleMenu = () => {
            const isOpen = menu.classList.contains("opacity-100");
            if (isOpen) {
                menu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
                menu.classList.add("opacity-0", "pointer-events-none", "translate-y-2", "scale-95");
                chevron.classList.remove("rotate-180");
            } else {
                menu.classList.remove("opacity-0", "pointer-events-none", "translate-y-2", "scale-95");
                menu.classList.add("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
                chevron.classList.add("rotate-180");
            }
        };

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        items.forEach(item => {
            item.addEventListener("click", () => {
                const val = item.getAttribute("data-value");
                const text = item.textContent;

                selectedText.textContent = text;
                hiddenInput.value = val;

                items.forEach(i => i.classList.remove("bg-gray-50", "text-primary"));
                item.classList.add("bg-gray-50", "text-primary");

                menu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
                menu.classList.add("opacity-0", "pointer-events-none", "translate-y-2", "scale-95");
                chevron.classList.remove("rotate-180");

                console.log(`Sorted by: ${text} (${val})`);
            });
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0", "scale-100");
                menu.classList.add("opacity-0", "pointer-events-none", "translate-y-2", "scale-95");
                chevron.classList.remove("rotate-180");
            }
        });
    }

    // Price Range Slider Update Label logic
    const priceRangeInput = document.getElementById("priceRange");
    const priceMaxLabel = document.getElementById("priceMax");
    if (priceRangeInput && priceMaxLabel) {
        priceRangeInput.addEventListener("input", (e) => {
            priceMaxLabel.textContent = `$${e.target.value}`;
        });
    }

    // QuickView Modal toggling and actions logic
    const quickViewModal = document.getElementById("quickview-modal");
    const quickViewCloseBtn = document.getElementById("quickview-close");
    
    // Quickview fields to update
    const quickViewImg = document.getElementById("quickview-img");
    const quickViewGallery = document.getElementById("quickview-gallery");

    const openQuickView = (productCard) => {
        if (!quickViewModal) return;
        
        // Find product details from card
        const img = productCard.querySelector("img");
        const titleLink = productCard.querySelector("h4 a");
        const currentPrice = productCard.querySelector(".text-primary span, .text-red-500 span, .pricing span");
        const originalPrice = productCard.querySelector("del");

        // Update modal info if elements found
        const modalTitle = quickViewModal.querySelector("h3");
        const modalPriceContainer = document.getElementById("quickview-price");

        if (img && quickViewImg) {
            quickViewImg.src = img.src;
            
            // Build gallery dynamically or highlight first thumbnail
            if (quickViewGallery) {
                const thumbs = quickViewGallery.querySelectorAll(".gallery-thumb");
                thumbs.forEach(thumb => {
                    thumb.classList.remove("border-primary", "border-2");
                    thumb.classList.add("border-gray-200", "border");
                    
                    const thumbImg = thumb.querySelector("img");
                    if (thumbImg && thumbImg.src === img.src) {
                        thumb.classList.remove("border-gray-200", "border");
                        thumb.classList.add("border-primary", "border-2");
                    }
                });
            }
        }
        if (titleLink && modalTitle) {
            modalTitle.textContent = titleLink.textContent;
        }
        if (modalPriceContainer) {
            let priceHTML = "";
            if (currentPrice) {
                priceHTML += `<span>${currentPrice.textContent}</span>`;
            }
            if (originalPrice) {
                priceHTML += `<del class="text-sm text-muted font-normal line-through ml-2.5">${originalPrice.textContent}</del>`;
            }
            modalPriceContainer.innerHTML = priceHTML;
        }

        // Show modal with animation
        quickViewModal.classList.remove("hidden");
        setTimeout(() => {
            quickViewModal.classList.remove("opacity-0", "pointer-events-none");
            quickViewModal.classList.add("opacity-100");
            const dialog = quickViewModal.querySelector("div");
            if (dialog) {
                dialog.classList.remove("scale-95");
                dialog.classList.add("scale-100");
            }
        }, 50);
    };

    const closeQuickView = () => {
        if (!quickViewModal) return;
        
        const dialog = quickViewModal.querySelector("div");
        if (dialog) {
            dialog.classList.remove("scale-100");
            dialog.classList.add("scale-95");
        }
        quickViewModal.classList.remove("opacity-100");
        quickViewModal.classList.add("opacity-0", "pointer-events-none");
        
        setTimeout(() => {
            quickViewModal.classList.add("hidden");
        }, 300);
    };

    // Attach click triggers to all quick view buttons in cards
    const quickViewTriggers = document.querySelectorAll("[data-bs-target='#QuickViewModal'], button.far.fa-eye, button.fa-eye, a[data-bs-target='#QuickViewModal']");
    quickViewTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Find parent product card
            const card = btn.closest(".product-item");
            if (card) {
                openQuickView(card);
            }
        });
    });

    if (quickViewCloseBtn) {
        quickViewCloseBtn.addEventListener("click", closeQuickView);
    }
    
    // Close quickview on click outside dialog
    if (quickViewModal) {
        quickViewModal.addEventListener("click", (e) => {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    }

    // Modal gallery thumb click swap logic
    if (quickViewGallery) {
        const thumbs = quickViewGallery.querySelectorAll(".gallery-thumb");
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => {
                const targetImgSrc = thumb.getAttribute("data-img");
                if (targetImgSrc && quickViewImg) {
                    quickViewImg.src = targetImgSrc;
                }
                
                // Toggle active border styles
                thumbs.forEach(t => {
                    t.classList.remove("border-primary", "border-2");
                    t.classList.add("border-gray-200", "border");
                });
                thumb.classList.remove("border-gray-200", "border");
                thumb.classList.add("border-primary", "border-2");
            });
        });
    }

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
