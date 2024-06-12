//initialize vars  
let arrowRight = document.querySelector('.arrow-right'),
    arrowLeft = document.querySelector('.arrow-left'),
    enterKey = document.querySelector('.active'),
    menuAngle = 0,
    iconAngle = 0,
    icons = document.querySelectorAll('#hex'),
    hexWrapper = document.querySelector('.hex-row-wrapper'),
    volume = document.querySelector('.volume'),
    debounce,
    delay = 50;

//movenment controls
function moveRight() {
  clearTimeout(debounce);
  debounce = setTimeout(function(){
    menuAngle += 60;
    iconAngle -= 60;
    //rotate icon
    for(let i = 0; i < icons.length; i ++){
      icons[i].setAttribute("style", 'transform: rotate(' + iconAngle + 'deg);');
    }
    //rotate menu
    hexWrapper.setAttribute("style", 'transform: rotate(' + menuAngle + 'deg);' );
    // Select next item
    let selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    selected.classList.contains('one') ? selected.parentElement.lastElementChild.classList.add('selected') : selected.previousElementSibling.classList.add('selected');
  },delay)
};

function moveLeft() {
  clearTimeout(debounce);
  debounce = setTimeout(function(){
    menuAngle -= 60;
    iconAngle += 60;
      //rotate icon
      for(let i = 0; i < icons.length; i ++){
        icons[i].setAttribute("style", 'transform: rotate(' + iconAngle + 'deg);');
      }
      //rotate menu
      hexWrapper.setAttribute("style", 'transform: rotate(' + menuAngle + 'deg);' );
      // Select the current
      let selected = document.querySelector('.selected');
      selected.classList.remove('selected');
      selected.classList.contains('six') ? selected.parentElement.firstElementChild.classList.add('selected') : selected.nextElementSibling.classList.add('selected');
  }, delay);
};
  
// Enter selected
function enterSelected() {
  let selected = document.querySelector('.selected');
  selected.click();
};

//click listeners
arrowLeft.addEventListener("click", function(){
  moveLeft();
});
arrowRight.addEventListener("click", function(){
  moveRight();
});
enterKey.addEventListener("click", function(){
  enterSelected();
});

//key listenters
document.body.addEventListener("keydown", function(e){
  var keycode = e.charCode || e.keyCode;
  switch ( keycode ) {
    default: 
      break;
    case 13:
      enterSelected();
      break; 
    case 37:
      moveLeft();
      break; 
    case 39:  
      moveRight();
      break; 
  }
});
  
// music play
let music = document.getElementById('player');
let button =  document.querySelector('.six');
let playStop =  document.querySelector('.start');
let musicIcon =  document.querySelector('.fa-music');
let checkbox = document.querySelector('.checkbox');
music.loop = true;
music.load();

button.addEventListener('click',()=>{
  checkbox.checked = checkbox.checked ? false: true;
  checkbox.checked ? musicIcon.classList.add('started') : musicIcon.classList.remove('started');
  music.paused ? music.play() : music.pause();
})

playStop.addEventListener('click',()=>{
  console.log(playStop);
  if(checkbox.checked){
    playStop.firstElementChild.style.display = "none";
    playStop.lastElementChild.style.display = "block";
    musicIcon.classList.add('started');
    checkbox.checked = false;
  }else{
    checkbox.checked = true;
    playStop.lastElementChild.style.display = "none";
    playStop.firstElementChild.style.display = "block";
    musicIcon.classList.remove('started');
  }
  music.paused ? music.play() : music.pause();
})

// Play link
let play = document.querySelector('.one');
let back = document.querySelector('.back');
let landingPage = document.querySelector('#wrapper-1');
let gameConsole = document.querySelector('#wrapper-2');


play.addEventListener('click',()=>{
  gameConsole.style.display = "flex";
  setTimeout(() => {
  landingPage.style.display = "none";
  },500)
})


back.addEventListener('click',()=>{
  landingPage.style.display = "flex";
  gameConsole.style.display = "none";
})

const player = document.getElementById('player');
const volumeRange = document.getElementById('volumeRange');

volumeRange.addEventListener('change', function() {
    player.volume = volumeRange.value;
});

function changeVolume(amount) {
    player.volume = Math.min(Math.max(player.volume + amount, 0), 1);
    volumeRange.value = player.volume;
}

function updateVolume() {
    player.volume = volumeRange.value;
}
