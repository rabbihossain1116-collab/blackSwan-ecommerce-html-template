document.addEventListener("DOMContentLoaded", () => {
    // Preloader fadeout
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Since DOMContentLoaded fires after HTML parsed, window load might fire soon after.
        // We listen to the window load event to fade out preloader.
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
            mobileDrawer.classList.add("-translate-x-full");
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
    // Mobile menu trigger
    const mobileTriggers = document.querySelectorAll(".canvas_open");
    mobileTriggers.forEach(btn => {
        btn.addEventListener("click", () => openDrawer(mobileDrawer));
    });

    // Search trigger
    const searchTriggers = document.querySelectorAll(".header-search");
    searchTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openDrawer(searchDrawer);
        });
    });

    // Cart trigger
    const cartTriggers = document.querySelectorAll(".mini-cart-icon");
    cartTriggers.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openDrawer(cartDrawer);
        });
    });

    // Event Listeners for Closing Drawers
    const closeButtons = document.querySelectorAll(".drawer-close, #overlay");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", closeAllDrawers);
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                const content = slide.querySelector(".container > div");
                if (i === index) {
                    slide.classList.remove("opacity-0", "pointer-events-none");
                    slide.classList.add("opacity-100", "pointer-events-auto");
                    if (content) {
                        content.classList.remove("opacity-0", "translate-y-4");
                        content.classList.add("opacity-100", "translate-y-0");
                    }
                } else {
                    slide.classList.remove("opacity-100", "pointer-events-auto");
                    slide.classList.add("opacity-0", "pointer-events-none");
                    if (content) {
                        content.classList.remove("opacity-100", "translate-y-0");
                        content.classList.add("opacity-0", "translate-y-4");
                    }
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add("bg-primary");
                    dot.classList.remove("bg-secondary/30");
                } else {
                    dot.classList.remove("bg-primary");
                    dot.classList.add("bg-secondary/30");
                }
            });

            currentSlide = index;
        };

        const nextSlide = () => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        const prevSlide = () => {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };

        const startAutoplay = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };

        const stopAutoplay = () => {
            clearInterval(slideInterval);
        };

        // Attach listeners
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                stopAutoplay();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                stopAutoplay();
                startAutoplay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                showSlide(i);
                stopAutoplay();
                startAutoplay();
            });
        });

        // Initialize
        showSlide(0);
        startAutoplay();
    }

    // Deals Slider Logic
    const dealSlides = document.querySelectorAll(".deal-slide");
    const dealPrevBtn = document.querySelector(".deal-prev");
    const dealNextBtn = document.querySelector(".deal-next");
    
    if (dealSlides.length > 0) {
        let currentDeal = 0;

        const showDeal = (index) => {
            dealSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove("opacity-0", "pointer-events-none");
                    slide.classList.add("opacity-100", "pointer-events-auto");
                } else {
                    slide.classList.remove("opacity-100", "pointer-events-auto");
                    slide.classList.add("opacity-0", "pointer-events-none");
                }
            });
            currentDeal = index;
        };

        if (dealNextBtn) {
            dealNextBtn.addEventListener("click", () => {
                let nextIndex = (currentDeal + 1) % dealSlides.length;
                showDeal(nextIndex);
            });
        }

        if (dealPrevBtn) {
            dealPrevBtn.addEventListener("click", () => {
                let prevIndex = (currentDeal - 1 + dealSlides.length) % dealSlides.length;
                showDeal(prevIndex);
            });
        }

        // Initialize first slide
        showDeal(0);
    }

    // Dynamic Countdown Timer Logic
    const countdownElements = document.querySelectorAll("[data-countdown-codepopular]");
    countdownElements.forEach(el => {
        const targetStr = el.getAttribute("data-countdown-codepopular");
        let targetDate = new Date(targetStr);
        // If target date is in the past, set to 3 days from now for visual demonstration
        if (targetDate < new Date()) {
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 3);
        }
        
        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate - now;
            if (diff <= 0) {
                el.innerHTML = "Deal Ended";
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            el.innerHTML = `
                <ul class="flex items-center gap-1.5">
                    <li class="w-[60px] h-[60px] bg-secondary flex flex-col items-center justify-center text-center rounded">
                        <span class="text-white text-base lg:text-lg font-bold leading-none">${days}<small class="block text-[10px] text-primary font-semibold uppercase mt-0.5">days</small></span>
                    </li>
                    <li class="w-[60px] h-[60px] bg-secondary flex flex-col items-center justify-center text-center rounded">
                        <span class="text-white text-base lg:text-lg font-bold leading-none">${hours}<small class="block text-[10px] text-primary font-semibold uppercase mt-0.5">Hours</small></span>
                    </li>
                    <li class="w-[60px] h-[60px] bg-secondary flex flex-col items-center justify-center text-center rounded">
                        <span class="text-white text-base lg:text-lg font-bold leading-none">${minutes}<small class="block text-[10px] text-primary font-semibold uppercase mt-0.5">Minute</small></span>
                    </li>
                    <li class="w-[60px] h-[60px] bg-secondary flex flex-col items-center justify-center text-center rounded">
                        <span class="text-white text-base lg:text-lg font-bold leading-none">${seconds}<small class="block text-[10px] text-primary font-semibold uppercase mt-0.5">SEC</small></span>
                    </li>
                </ul>
            `;
        };
        updateTimer();
        setInterval(updateTimer, 1000);
    });

    // Quantity Increment / Decrement Listener
    document.addEventListener("click", (e) => {
        const upBtn = e.target.closest(".qty-up");
        const downBtn = e.target.closest(".qty-down");
        
        if (upBtn) {
            const input = upBtn.parentElement.querySelector("input");
            if (input) {
                const max = parseInt(input.getAttribute("max")) || 1000;
                let val = parseInt(input.value) || 1;
                if (val < max) input.value = val + 1;
                input.dispatchEvent(new Event("change"));
            }
        }
        if (downBtn) {
            const input = downBtn.parentElement.querySelector("input");
            if (input) {
                const min = parseInt(input.getAttribute("min")) || 1;
                let val = parseInt(input.value) || 1;
                if (val > min) input.value = val - 1;
                input.dispatchEvent(new Event("change"));
            }
        }
    });

    // Featured Products Slider (Scroll Navigation)
    const featSlider = document.querySelector(".feat-slider");
    const featPrev = document.querySelector(".feat-prev");
    const featNext = document.querySelector(".feat-next");
    if (featSlider && featPrev && featNext) {
        featNext.addEventListener("click", () => {
            // Scroll by one card item's width (280px + 24px gap = 304px)
            featSlider.scrollLeft += 304;
        });
        featPrev.addEventListener("click", () => {
            featSlider.scrollLeft -= 304;
        });
    }
});
