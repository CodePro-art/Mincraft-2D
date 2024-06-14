// Minimize Instructions section
document.addEventListener('DOMContentLoaded', function() {
    var minimizeButtons = document.querySelectorAll('.minimize');
    var maximizeButtons = document.querySelectorAll('.maximize');
    
    minimizeButtons.forEach(function(button) {
        button.addEventListener('click', minimize);
    });
    
    maximizeButtons.forEach(function(button) {
        button.addEventListener('click', maximize);
    });
  });
  
  function minimize() {
    document.body.classList.add('minimized');
  }
  
  function maximize() {
    document.body.classList.remove('minimized');
  }
  