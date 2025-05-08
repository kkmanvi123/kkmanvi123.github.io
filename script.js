// Filter content based on category
function filterContent(category, clickEvent) {
    // First, remove active class from all buttons
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
      btn.classList.remove('active');
    });
  
    // Add active class to clicked button if event is provided
    if (clickEvent && clickEvent.currentTarget) {
      clickEvent.currentTarget.classList.add('active');
    } else if (event && event.currentTarget) {
      event.currentTarget.classList.add('active');
    }
  
    // Get the loving-list container
    const lovingList = document.querySelector('.loving-list');
    if (!lovingList) return;
  
    // Get all columns
    const columns = Array.from(lovingList.querySelectorAll('.column'));
    if (columns.length === 0) return;
  
    // Get all cards - important to get a fresh reference to all cards in the DOM
    // Don't rely on previously stored references which might be stale
    const allItems = Array.from(document.querySelectorAll('.loving-card'));
    
    // Temporarily detach all cards from DOM to prevent losing them when clearing columns
    const cardParents = new Map();
    allItems.forEach(card => {
      cardParents.set(card, card.parentNode);
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    });
    
    // Filter cards based on category
    let filteredItems;
    if (category === 'all') {
      filteredItems = allItems; // Use all items
    } else {
      filteredItems = allItems.filter(item => item.classList.contains(category));
    }
  
    // Clear all columns
    columns.forEach(column => {
      column.innerHTML = '';
    });
  
    // Redistribute filtered cards across columns
    redistributeCards(filteredItems, columns);
  }
  
  // Function to distribute cards across columns
  function redistributeCards(cards, columns) {
    const windowWidth = window.innerWidth;
    
    // For large screens (3 columns)
    if (windowWidth > 768) {
      columns[1].style.display = 'flex';
      columns[2].style.display = 'flex';
      
      cards.forEach((card, index) => {
        const columnIndex = index % 3;
        columns[columnIndex].appendChild(card);
      });
    }
    // For medium screens (2 columns)
    else if (windowWidth <= 768 && windowWidth > 480) {
      columns[1].style.display = 'flex';
      columns[2].style.display = 'none';
      
      cards.forEach((card, index) => {
        const columnIndex = index % 2;
        columns[columnIndex].appendChild(card);
      });
    }
    // For small screens (1 column)
    else {
      columns[1].style.display = 'none';
      columns[2].style.display = 'none';
      
      cards.forEach(card => {
        columns[0].appendChild(card);
      });
    }
  }
  
  // Initialize the layout when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Get the loving-list container
    const lovingList = document.querySelector('.loving-list');
    if (!lovingList) return;
  
    // Get all the cards
    const cards = Array.from(lovingList.querySelectorAll('.loving-card'));
    if (cards.length === 0) return;
  
    // Clear the loving-list container
    lovingList.innerHTML = '';
  
    // Create three columns
    const column1 = document.createElement('div');
    column1.className = 'column';
  
    const column2 = document.createElement('div');
    column2.className = 'column';
  
    const column3 = document.createElement('div');
    column3.className = 'column';
  
    // Add columns to the loving-list
    lovingList.appendChild(column1);
    lovingList.appendChild(column2);
    lovingList.appendChild(column3);
  
    // Store columns for easier access
    const columns = [column1, column2, column3];
  
    // Initial distribution of cards
    redistributeCards(cards, columns);
  
    // Handle window resize to adjust number of columns
    function adjustColumns() {
      // Find the active filter category
      const activeButton = document.querySelector('.filter-btn.active');
      const activeCategory = activeButton ? (activeButton.getAttribute('data-category') || 'all') : 'all';
      
      // Apply the current filter again to redistribute cards properly
      filterContent(activeCategory);
    }
  
    // Re-adjust on window resize
    window.addEventListener('resize', adjustColumns);
  
    // Add click event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const category = this.getAttribute('data-category') || 'all';
        filterContent(category, event);
      });
    });
  });