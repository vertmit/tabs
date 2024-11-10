const topSearchInput = document.getElementById('topSearch');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get('q');

topSearchInput.value = searchQuery;

function selectText(element) {
    element.select();
}

document.getElementById("topSearchForm").addEventListener("submit", function(event) {
  event.preventDefault();
});

topSearchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = topSearchInput.value;
    window.location.href = `search.html?q=${searchQuery}`;
  }
  
});