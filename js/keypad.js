const INT_MAX = 9999999999999;

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
    // check if the keyboadr is in english
    if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
      
    }
    if (key === 'k' || key === 'K'){
      toggleKeyboard(1);
      toggleKeyboard(2);  
    }
    else if (key === 'r' || key === 'R') document.querySelector('.fa-refresh').click();
    else if (key === 'm' || key === 'M') document.querySelector('.start').click();
    else if (key === '+' || key === '=') document.querySelector('.fa-plus').click();
    else if (key === '-' || key === '_') document.querySelector('.fa-minus').click();
    else if (key === 't' || key === 'T') document.querySelector('.fa-television').click();
    else if (key === 'g' || key === 'G') document.querySelector('.fa-gamepad').click();
    else if (key === 'l' || key === 'L') document.querySelector('.fa-globe').click();
    else if (key === 'p' || key === 'P') changeTool('k80');
    else if (key === 'h' || key === 'H') changeTool('k72');
    else if (key === 'a' || key === 'A') changeTool('k65');
    else if (key === 's' || key === 'S') changeTool('k83');

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

const toolTips = [
  { selector: '.k65', content: 'Axe tool' },
  { selector: '.s65', content: 'Axe tool' },
  { selector: '.k71', content: 'Play Game' },
  { selector: '.s71', content: 'Play Game' },
  { selector: '.k72', content: 'Hoe tool' },
  { selector: '.s72', content: 'Hoe tool' },
  { selector: '.k76', content: 'Show Leadboard' },
  { selector: '.s76', content: 'Show Leadboard' },
  { selector: '.k79', content: 'Open options' },
  { selector: '.s79', content: 'Open options' },
  { selector: '.k80', content: 'Pickaxe tool' },
  { selector: '.s80', content: 'Pickaxe tool' },
  { selector: '.k82', content: 'Reset World' },
  { selector: '.s82', content: 'Reset World' },
  { selector: '.k83', content: 'Shovel tool' },
  { selector: '.s83', content: 'Shovel tool' },
  { selector: '.k84', content: 'Show Trailer' },
  { selector: '.s84', content: 'Show Trailer' },
  { selector: '.k77', content: 'Play/Stop music' },
  { selector: '.s77', content: 'Play/Stop music' },
  { selector: '.k75', content: 'Un/Summon Keyboard' },
  { selector: '.s75', content: 'Un/Summon Keyboard' },
  { selector: '.k107', content: 'Volume up' },
  { selector: '.s107', content: 'Volume up' },
  { selector: '.k109', content: 'Volume down' },
  { selector: '.s109', content: 'Volume down' },
  { selector: '.one', content: 'Play!!' },
  { selector: '.two', content: 'Watch Trailer!' },
  { selector: '.three', content: 'Show Shortcuts' },
  { selector: '.four', content: 'Options' },
  { selector: '.five', content: 'Show Leader Board' },
  { selector: '.six', content: 'Play/Mute Music' },
];


document.addEventListener('DOMContentLoaded', function() {

  toolTips.forEach(tip => {
    tippy(tip.selector, {
      content: tip.content,
      zIndex: INT_MAX,
      appendTo: document.body,
    });
  });
  
});

  