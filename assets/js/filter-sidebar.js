// Filter Sidebar Toggle
document.addEventListener('DOMContentLoaded', function () {
  var filterToggle = document.getElementById('filterToggle');
  var filterSidebar = document.getElementById('filterSidebar');
  var filterOverlay = document.getElementById('filterOverlay');
  var filterClose = document.getElementById('filterClose');
  var priceRange = document.getElementById('priceRange');
  var priceMin = document.getElementById('priceMin');
  var priceMax = document.getElementById('priceMax');
  var filterApply = document.querySelector('.filter-apply');
  var filterClear = document.querySelector('.filter-clear');

  // Open sidebar
  filterToggle.addEventListener('click', function () {
    filterSidebar.classList.add('active');
    filterOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close sidebar
  function closeSidebar() {
    filterSidebar.classList.remove('active');
    filterOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  filterClose.addEventListener('click', closeSidebar);
  filterOverlay.addEventListener('click', closeSidebar);

  // Price range slider
  if (priceRange) {
    priceRange.addEventListener('input', function () {
      priceMax.textContent = '$' + this.value;
    });
  }

  // Apply filters
  if (filterApply) {
    filterApply.addEventListener('click', function () {
      closeSidebar();
    });
  }

  // Clear all filters
  if (filterClear) {
    filterClear.addEventListener('click', function () {
      var checkboxes = filterSidebar.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      if (priceRange) {
        priceRange.value = 250;
        priceMax.textContent = '$500';
      }
    });
  }
});
