document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filter-options");
  const savedFilter = localStorage.getItem("filter");

  if (savedFilter) {
    filterSelect.value = savedFilter;
    applyFilter(savedFilter);
  }

  filterSelect.addEventListener("change", () => {
    const selectedFilter = filterSelect.value;
    localStorage.setItem("filter", selectedFilter);
    applyFilter(selectedFilter);
  });

  function applyFilter(filter) {
    console.log(`Applying filter: ${filter}`);
    // Implement filtering logic here
  }
});
