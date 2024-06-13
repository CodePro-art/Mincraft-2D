const rows = 20;
const cols = 25;
let size = rows*cols;
let grass = rows-6;
let ground = rows-5;
let lava = rows-1;
let screen = document.querySelector('.game-screen');
const map = document.querySelector('#wrapper-2');
const tool = document.querySelectorAll('.tool');
const inventory = document.querySelectorAll('.inv');
random = (min,max) => Math.random() * (max - min) + min;

class Minecraft {
  constructor(width,trees,bushes) {
    this.width = width;
    this.trees = trees;
    this.bushes = bushes;
    this.selectedTool ="cursor-default";
    this.selectedItem ="";
    this.inventoryCounter ={
      dirt: 0,
      brick: 0,
      coal: 0,
      ice: 0,
      gold: 0,
      grass: 0,
      silver: 0,
      glass: 0,
      sand: 0,
      snow: 0,
      stone: 0,
      wood: 0
    };
  }
  // function to initialize world
  initialize(){
    console.log("init");
    for(let i=0; i<rows ;i++){
      for(let j=0; j<cols ;j++){
        let box = document.createElement('button');
        box.classList.add('box');
        box.classList.add('cursor-default');
        box.setAttribute('id',`btn-increment ${j}-${i}`);
        if(i<grass-1)
          box.classList.add('sky');
        if(i<grass && i>grass-4 && (j === 15))
          box.classList.add('wood');
        if((i<grass-3 && i>grass-7) && (j>13 && j<17))
          box.classList.add('leaves');
        if((i == grass-1 && j === 8) || (i == grass-1 && j === 9))
            box.classList.add('bush');
        if((i == grass-1 && (j === 20 || j===21)))
            box.classList.add('stone');
        if(i === grass )
          box.classList.add('grass');
        if(i>=ground && i<lava){
          (j%17) || (i !== ground+3) ? box.classList.add('ground') : box.classList.add('gold');
          (j%12) || (i !== ground+1) ? box.classList.add('ground') : box.classList.add('silver');
        }
        if(i === rows-1)
          box.classList.add('lava'); 
        box.setAttribute('row',`${j}`);
        box.setAttribute('col',`${i}`);

        screen.appendChild(box);
        setTimeout(()=> box.classList.add("animate"), (i+j)*100);
      }
    }
  }
 
  generateRandom(bush,tree){
    const maxBushes = Math.floor(cols/3);
    const maxTrees = Math.floor(cols/5);
    bush = bush > maxBushes ? maxBushes : bush;
    tree = tree > maxTrees ? maxTrees : tree;
    let rand = random(0,cols-1);
  }

  resetMap(){
    console.log("remove!");
    screen.remove();
    screen = document.createElement('section');
    screen.classList.add('game-screen');
    screen.setAttribute("id","screen");
    map.appendChild(screen);
    this.initialize();
    tiles.forEach((box)=>{
      box.classList.add('cursor-default');
    });
  }
}

// initialize game
let game = new Minecraft(1);
game.initialize();

// clense cursor
document.body.addEventListener("keydown", function(e){
  var keycode = e.charCode || e.keyCode;
  switch ( keycode ) {
    default: 
      break;
    case 27:
      clearCursor();
      break; 
  }
})

// function to clear cursor to default
function clearCursor(){
  tiles.forEach((box)=>{
    box.classList.remove('cursor-shovel');
    box.classList.remove('cursor-pickaxe');
    box.classList.remove('cursor-axe');
    box.classList.remove('cursor-hoe');
  });
}

function initiateCursor(){
  tiles.forEach((box)=>{
    box.classList.add('cursor-default');
  });
}

// reset
function reset(){
  document.getElementById('rst-btn').classList.add('rst');
  game.resetMap();
  setTimeout(() => {
  document.getElementById('rst-btn').classList.remove('rst');
  },500)
}

// cursor
let tiles = document.querySelectorAll('.box');
initiateCursor();
tool.forEach((e)=>{
  e.addEventListener('click',()=>{
    if(e.classList.contains('axe')){
      game.selectedTool ="axe";
      document.querySelector('.axe').classList.add('selected');
      document.querySelector('.pickaxe').classList.remove('selected');
      document.querySelector('.shovel').classList.remove('selected');
      document.querySelector('.hoe').classList.remove('selected');
      tiles.forEach((box)=>{
        box.classList.add('cursor-axe');
        box.classList.remove('cursor-default');
        box.classList.remove('cursor-pickaxe');
        box.classList.remove('cursor-shovel');
        box.classList.remove('cursor-hoe');
      });
    }
    if(e.classList.contains('pickaxe')){
      game.selectedTool ="pickaxe";
      document.querySelector('.axe').classList.remove('selected');
      document.querySelector('.pickaxe').classList.add('selected');
      document.querySelector('.shovel').classList.remove('selected');
      document.querySelector('.hoe').classList.remove('selected');
      tiles.forEach((box)=>{
        box.classList.add('cursor-pickaxe');
        box.classList.remove('cursor-default');
        box.classList.remove('cursor-axe');
        box.classList.remove('cursor-shovel');
        box.classList.remove('cursor-hoe');
      });
    }
    if(e.classList.contains('shovel')){
      game.selectedTool ="shovel";
      document.querySelector('.axe').classList.remove('selected');
      document.querySelector('.pickaxe').classList.remove('selected');
      document.querySelector('.shovel').classList.add('selected');
      document.querySelector('.hoe').classList.remove('selected');
      tiles.forEach((box)=>{
        box.classList.add('cursor-shovel');
        box.classList.remove('cursor-default');
        box.classList.remove('cursor-pickaxe');
        box.classList.remove('cursor-axe');
        box.classList.remove('cursor-hoe');
      });
    }
    if(e.classList.contains('hoe')){
      game.selectedTool ="hoe";
      document.querySelector('.axe').classList.remove('selected');
      document.querySelector('.pickaxe').classList.remove('selected');
      document.querySelector('.shovel').classList.remove('selected');
      document.querySelector('.hoe').classList.add('selected');
      tiles.forEach((box)=>{
        box.classList.add('cursor-hoe');
        box.classList.remove('cursor-pickaxe');
        box.classList.remove('cursor-shovel');
        box.classList.remove('cursor-axe');
      });
    }
  })
});

// tiles event
tiles.forEach((box)=>{
  box.addEventListener('click',()=>{
    if(game.selectedTool === 'shovel'){
      if(box.classList.contains('ground')){
        harvest(box)
        box.classList.remove('ground');
        game.inventoryCounter.dirt++;
      }
      if(box.classList.contains('grass')){
        harvest(box)
        box.classList.remove('grass');
        game.inventoryCounter.grass++;
      }    
    }
    if(game.selectedTool === 'axe'){
      if(box.classList.contains('leaves')){
        harvest(box)
        box.classList.remove('leaves');
        game.inventoryCounter.grass++;
      }
      if(box.classList.contains('wood')){
        harvest(box)
        box.classList.remove('wood');
        game.inventoryCounter.wood++;
      }
    }
    if(game.selectedTool === 'pickaxe'){
      if(box.classList.contains('gold')){
        harvest(box)
        box.classList.remove('gold');
        game.inventoryCounter.gold++;
      }
      if(box.classList.contains('stone')){
        harvest(box)
        box.classList.remove('stone');
        game.inventoryCounter.stone++;
      }
      if(box.classList.contains('silver')){
        harvest(box)
        box.classList.remove('silver');
        game.inventoryCounter.silver++;
      }
      if(box.classList.contains('diamond')){
        harvest(box)
        box.classList.remove('diamond');
        game.inventoryCounter.diamond++;
      }
    }
    if(game.selectedTool === 'hoe'){
      if(box.classList.contains('lava')){
        harvest(box)
        box.classList.remove('lava');
        game.inventoryCounter.coal++;
      }
      if(box.classList.contains('stone')){
        harvest(box)
        box.classList.remove('stone');
        game.inventoryCounter.brick++;
      }
      if(box.classList.contains('water')){
        harvest(box)
        box.classList.remove('water');
        game.inventoryCounter.ice++;
      }
      if(box.classList.contains('ground')){
        harvest(box)
        box.classList.remove('ground');
        game.inventoryCounter.sand++;
      }
      if(box.classList.contains('sand')){
        harvest(box)
        box.classList.remove('sand');
        game.inventoryCounter.glass++;
      }
    }

    updateInventory();
  });
});

// function to update inventory
function updateInventory(){
  inventory.forEach((item)=>{
    if (item.classList[1].slice(4))
    item.innerHTML = game.inventoryCounter[item.classList[1].slice(4)];
  });
}

//dynamically wrie text
document.addEventListener("DOMContentLoaded", function() {
  const textLines = [
      "<br><h2 class=\"sub-logo\">Mine, Craft, Build!</h2><br>",
      "<h4>Use the arrow keys to navigate the menu and press 'Enter' to approve</h4>",
      "<h4>Use the up and down arrows to control the music volume</h4>",
      "<h4>While in the game, follow the instructions on the top right corner</h4>"
  ];

  const container = document.getElementById("text-container");

  let currentLine = 0;
  let currentChar = 0;

  function typeLine() {
      if (currentLine < textLines.length) {
          let lineElement = document.createElement("div");
          container.appendChild(lineElement);
          typeCharacter(lineElement, textLines[currentLine], 0);
      }
  }

  function typeCharacter(element, text, index) {
      if (index < text.length) {
          element.innerHTML = text.substring(0, index + 1);
          setTimeout(function() {
              typeCharacter(element, text, index + 1);
          }, 50); // Adjust typing speed here
      } else {
          currentLine++;
          if (currentLine < textLines.length) {
              setTimeout(typeLine, 500); // Adjust delay before starting next line here
          }
      }
  }

  typeLine();
});

function showMediaPlayer() {
  mediaPlayerContainer = document.querySelector('.media-player')
  mediaPlayerContainer.style.display = 'flex';
}

function hideMediaPlayer() {
  const mediaPlayerContainer = document.querySelector('.media-player');
  const video = document.getElementById('minecraftTrailer');

  mediaPlayerContainer.style.display = 'none';
  video.pause(); // Pause the video when hiding the media player
  video.currentTime = 0; // Reset the video to the beginning
}

// hide and show leadboard
function showLeadboard() {
  let leadboard = document.querySelector('.leadboard')
  leadboard.style.display = 'flex';
  setTimeout(() => {
    leadboard.classList.add('show');
    leadboard.classList.remove('hide');
  }, 10); // Slight delay to ensure the display property is set before adding the class
  leadboard.style.display = 'flex';
}

function hideLeadboard() {
  let leadboard = document.querySelector('.leadboard');
  leadboard.classList.add('hide');
}

// Event listener for keydown event
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    hideMediaPlayer();
    hideLeadboard();
  }
});


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

// Add +1 Effect to buttons
function harvest(box) {
  box.classList.add("plus-one")
  box.innerText = "+1"
  box.classList.remove("hidden")
    
  setTimeout(() => {
    box.classList.remove("plus-one")
    box.classList.add("hidden")
    box.innerText = ""
  }, 500)
}

// Tooltip for buttons
document.getElementById('infoButton').addEventListener('click', function() {
  var tooltip = document.getElementById('tooltip');
  tooltip.style.display = (tooltip.style.display === 'none' || tooltip.style.display === '') ? 'flex' : 'none';

  setTimeout(function() {
    tooltip.style.display = (tooltip.style.display === 'none' || tooltip.style.display === '') ? 'flex' : 'none';
    setTimeout(function() {
      if (tooltip.style.display !== 'none' || tooltip.style.display !== '')
        tooltip.style.display = tooltip.style.display = 'none';
    }, 100); 
  }, 1000);
});