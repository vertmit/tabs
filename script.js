searchInput = document.getElementById('search');

document.getElementById("mainSearch").addEventListener("submit", function(event) {
  event.preventDefault();
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value;
    window.location.href = `search?q=${searchQuery}`;
  }
});
