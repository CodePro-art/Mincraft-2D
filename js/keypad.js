// Toggle keyboard
function toggleKeyboard() {
  let keyboard1 = document.querySelector('.key-wrapper-1');
  if (keyboard1.style.display === 'none' || keyboard1.style.display === '') {
    showKeyboard(1);
  } else {
    hideKeyboard(1);
  }
  let keyboard2 = document.querySelector('.key-wrapper-2');
  if (keyboard2.style.display === 'none' || keyboard2.style.display === '') {
    showKeyboard(2);
  } else {
    console.log('hide keyboard 2');
    hideKeyboard(2);
  }
}
// Show keyboard
function showKeyboard(id) {
  let keyboard = document.querySelector(`.key-wrapper-${id}`)
  if (keyboard !== null){
    setTimeout(() => {
      keyboard.classList.add('show');
      keyboard.classList.remove('hide');
    }, 10);
    setTimeout(() => {
      keyboard.style.display = 'flex';
    }, 10); 
  }
}
// Hide keyboard
function hideKeyboard(id) {
  let keyboard = document.querySelector(`.key-wrapper-${id}`);
  if (keyboard !== null){
    keyboard.classList.add('hide');
    keyboard.classList.remove('show');
    setTimeout(() => {
      keyboard.style.display = 'none';
    }, 450); 
  }
}

function changeTool(key){
  switch(key){
    case 'k80':
      document.querySelector('.pickaxe').click();
      break;
    case 'k72':
      document.querySelector('.hoe').click();
      break;
    case 'k65':
      document.querySelector('.axe').click();
      break;
    case 'k83':
      document.querySelector('.shovel').click();
      break;
  }
}

// Handle keyup event
function handleKeyup(event) {
    const key = event.key;
    const keyCode = event.keyCode;
    const activeElements = document.querySelectorAll('.key.k' + keyCode);
    activeElements.forEach(el => el.classList.remove('active-key'));
  }

// Handle keydown event
function handleKeydown(event) {
    const key = event.key;
    const keyCode = event.keyCode;
    const activeElements = document.querySelectorAll('.key.k' + keyCode);
    if (key === 'k' || key === 'K'){
      toggleKeyboard(1);
      toggleKeyboard(2);  
    }
    if (key === 'r' || key === 'R'){
      document.querySelector('.fa-refresh').click();
    }
    if (key === 'm' || key === 'M'){
      document.querySelector('.start').click();
    }
    if (key === '+' || key === '='){
      document.querySelector('.fa-plus').click();
    }
    if (key === '-' || key === '_'){
      document.querySelector('.fa-minus').click();
    }
    if (key === 'p' || key === 'P'){
      changeTool('k80');
    }
    if (key === 'h' || key === 'H'){
      changeTool('k72');
    }
    if (key === 'a' || key === 'A'){
      changeTool('k65');
    }
    if (key === 's' || key === 'S'){
      changeTool('k83');
    }

    activeElements.forEach(el => el.classList.add('active-key'));
  }



// Event listener for keydown event
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    hideKeyboard(1);
    hideKeyboard(2);
  }
});

// Register keydown and keyup event listeners
window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);


document.addEventListener('DOMContentLoaded', function() {
  tippy('.k80', {
    content: 'Pickaxe tool',
  });
  tippy('.k72', {
    content: 'Hoe tool',
  });
  tippy('.k65', {
    content: 'Axe tool',
  });
  tippy('.k72', {
    content: 'Hoe tool',
  });
  tippy('.k83', {
    content: 'Shovel tool',
  });
  tippy('.k77', {
    content: 'Play/Stop music',
  });
  tippy('.k107', {
    content: 'Volume up',
  });
  tippy('.k109', {
    content: 'Volume down',
  });
  tippy('.k75', {
    content: 'Un/Summon Keyboard',
  });
  tippy('.k82', {
    content: 'Reset World',
  });

  tippy('.s80', {
    content: 'Pickaxe tool',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s72', {
    content: 'Hoe tool',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s65', {
    content: 'Axe tool',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s72', {
    content: 'Hoe tool',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s83', {
    content: 'Shovel tool',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s77', {
    content: 'Play/Stop music',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s107', {
    content: 'Volume up',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s109', {
    content: 'Volume down',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s75', {
    content: 'Un/Summon Keyboard',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  tippy('.s82', {
    content: 'Reset World',
    zIndex: 9999999999999, 
    appendTo: document.body
  });
  
});

  