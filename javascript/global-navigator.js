document.addEventListener("DOMContentLoaded", () => {
    // Check if FontAwesome is loaded, if not add it dynamically for icons
    if (!document.querySelector("link[href*='font-awesome']")) {
        const fa = document.createElement("link");
        fa.rel = "stylesheet";
        fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(fa);
    }

    // Sitemap Widget Markup
    const sitemapHtml = `
      <!-- Floating Button -->
      <div id="quick-sitemap-btn" class="fixed bottom-6 left-6 z-[999] group cursor-pointer flex items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#C89B3C] to-[#1A2238] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20">
          <i class="fas fa-sitemap text-lg"></i>
        </div>
        <span class="bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-700">Quick Navigator</span>
      </div>

      <!-- Sitemap Drawer/Modal Overlay -->
      <div id="quick-sitemap-drawer" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300">
        <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 flex flex-col max-h-[85vh]">
          <!-- Header -->
          <div class="bg-gradient-to-r from-secondary to-[#2a3758] text-white p-6 flex justify-between items-center relative">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,155,60,0.15),transparent_45%)]"></div>
            <div class="relative z-10 space-y-1">
              <h2 class="text-xl font-black uppercase tracking-wider flex items-center gap-2 text-primary">
                <i class="fas fa-compass"></i> Site Navigator
              </h2>
              <p class="text-xs text-gray-300">Quickly switch between any page in this template</p>
            </div>
            <button id="close-sitemap-btn" class="relative z-10 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all text-sm focus:outline-none">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Content Grid -->
          <div class="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50">
            
            <!-- Category: Main -->
            <div class="space-y-3">
              <h4 class="text-xs font-black text-secondary uppercase tracking-widest border-b border-gray-100 pb-1.5">Main Pages</h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <a href="index2.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-home text-xs text-primary"></i> Home Page</a>
                <a href="about.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-info-circle text-xs text-primary"></i> About Us</a>
                <a href="shop-grid.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-store text-xs text-primary"></i> Shop Grid</a>
                <a href="product-details.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-eye text-xs text-primary"></i> Product Details</a>
                <a href="faq.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-question-circle text-xs text-primary"></i> FAQ</a>
                <a href="contact.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-envelope text-xs text-primary"></i> Contact Us</a>
              </div>
            </div>

            <!-- Category: E-Commerce Flow -->
            <div class="space-y-3">
              <h4 class="text-xs font-black text-secondary uppercase tracking-widest border-b border-gray-100 pb-1.5">Cart & Wishlist</h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <a href="cart.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-shopping-cart text-xs text-primary"></i> Shopping Cart</a>
                <a href="checkout.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-check-double text-xs text-primary"></i> Checkout Page</a>
                <a href="wishlist.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-heart text-xs text-primary"></i> Wishlist</a>
              </div>
              
              <h4 class="text-xs font-black text-secondary uppercase tracking-widest border-b border-gray-100 pb-1.5 pt-4">Blog & Articles</h4>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <a href="blog-grid.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-th text-xs text-primary"></i> Blog Grid</a>
                <a href="single.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-newspaper text-xs text-primary"></i> Blog Details</a>
              </div>
            </div>

            <!-- Category: Customer Account -->
            <div class="space-y-3 md:col-span-2">
              <h4 class="text-xs font-black text-secondary uppercase tracking-widest border-b border-gray-100 pb-1.5">Account & System</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <a href="myaccount.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-user-circle text-xs text-primary"></i> Account Dashboard</a>
                <a href="customer-dashboard.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-tachometer-alt text-xs text-primary"></i> Analytics Dashboard</a>
                <a href="login.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-sign-in-alt text-xs text-primary"></i> Login Page</a>
                <a href="register.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-user-plus text-xs text-primary"></i> Register Page</a>
                <a href="forget-password.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-key text-xs text-primary"></i> Reset Password</a>
                <a href="404.html" class="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all font-semibold text-secondary shadow-sm"><i class="fas fa-exclamation-triangle text-xs text-primary"></i> 404 Error Page</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    // Append to body
    const sitemapContainer = document.createElement("div");
    sitemapContainer.innerHTML = sitemapHtml;
    document.body.appendChild(sitemapContainer);

    // Interactive Logic
    const openBtn = document.getElementById("quick-sitemap-btn");
    const drawer = document.getElementById("quick-sitemap-drawer");
    const closeBtn = document.getElementById("close-sitemap-btn");
    const innerModal = drawer.querySelector(".scale-95");

    const openSitemap = () => {
        drawer.classList.remove("opacity-0", "pointer-events-none");
        drawer.classList.add("opacity-100");
        innerModal.classList.remove("scale-95");
        innerModal.classList.add("scale-100");
    };

    const closeSitemap = () => {
        drawer.classList.add("opacity-0", "pointer-events-none");
        drawer.classList.remove("opacity-100");
        innerModal.classList.remove("scale-100");
        innerModal.classList.add("scale-95");
    };

    openBtn.addEventListener("click", openSitemap);
    closeBtn.addEventListener("click", closeSitemap);
    drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
            closeSitemap();
        }
    });
});
