function getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
  }
  
  function darkenColor(color, percentage) {
    var darkenAmount = Math.round((percentage / 100) * 255);
    var r = color[0] - darkenAmount;
    var g = color[1] - darkenAmount;
    var b = color[2] - darkenAmount;
    return [r, g, b];
  }
  
  function createGrid() {
    var container = document.querySelector('.container');
    var gridSize = prompt('Enter the number of squares per side for the new grid (maximum 100):');
    
    // Validate the user input
    gridSize = parseInt(gridSize);
    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
      alert('Invalid input. Please enter a number between 1 and 100.');
      return;
    }
    
    // Clear existing grid
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Calculate square size
    var squareSize = 960 / gridSize;
    
    // Create new grid
    for (var i = 0; i < gridSize * gridSize; i++) {
      var gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridSquare.style.width = squareSize + 'px';
      gridSquare.style.height = squareSize + 'px';
      container.appendChild(gridSquare);
    }
  }
  
  // Add event listener to grid squares for the hover effect
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('grid-square')) {
      var currentColor = e.target.style.backgroundColor;
      var rgbValues = currentColor.match(/\d+/g);
      var r, g, b;
      
      if (rgbValues === null) {
        r = getRandomRGBValue();
        g = getRandomRGBValue();
        b = getRandomRGBValue();
      } else {
        r = parseInt(rgbValues[0]);
        g = parseInt(rgbValues[1]);
        b = parseInt(rgbValues[2]);
      }
      
      var darkenPercentage = (10 * e.target.dataset.interactions) || 0;
      var darkenedColor = darkenColor([r, g, b], darkenPercentage);
      
      e.target.style.backgroundColor = `rgb(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]})`;
      e.target.dataset.interactions = (parseInt(e.target.dataset.interactions) || 0) + 1;
    }
  });
  