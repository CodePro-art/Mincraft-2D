document.addEventListener("DOMContentLoaded", () => {

  // Define message to user
  const MSG = "Cannot harvest; surrounded by other materials. Clear the surrounding materials first.";

  // Define the game screen, inventory, and tools
  const screen = document.querySelector('.game-screen');
  const tools = document.querySelectorAll('.tool');
  const inventory = document.querySelectorAll('.inv');

  // Define the actions and inventory updates for each tool
  const toolActions = {
    shovel: { ground: 'dirt', grass: 'grass', sand: 'glass', snow: 'snow', road: 'stone'},
    axe: { bush: 'grass', leaves: 'grass', wood: 'wood' },
    pickaxe: { gold: 'gold', stone: 'stone', silver: 'silver', diamond: 'diamond' },
    hoe: { lava: 'coal', stone: 'brick', water: 'ice' },
    bucket: { lava: 'coal', water: 'ice' },
    default: {}
  };

  // Define the mapping object for tool behaviors
  const toolBox = {
    axe: { selectedClass: 'cursor-axe', toolClass: 'axe' },
    pickaxe: { selectedClass: 'cursor-pickaxe', toolClass: 'pickaxe' },
    shovel: { selectedClass: 'cursor-shovel', toolClass: 'shovel' },
    hoe: { selectedClass: 'cursor-hoe', toolClass: 'hoe' },
    bucket: { selectedClass: 'cursor-bucket', toolClass: 'bucket' },
    sword: { selectedClass: 'cursor-sword', toolClass: 'sword' },
    default: { selectedClass: 'cursor-default', toolClass: 'default' }
  };

  class Minecraft {
    constructor(theme = 'normal', mapSize = 'small') {
      this.selectedTool = "cursor-default";
      this.inventoryCounter = {
        dirt: 0, brick: 0, coal: 0, ice: 0, gold: 0, grass: 0, silver: 0,
        glass: 0, sand: 0, snow: 0, stone: 0, wood: 0, diamond: 0
      };
      this.theme = {
        normal: { liquid: 'lava', ground: 'ground', mineral: 'gold', mineral2: 'silver', mineral3: 'diamond', leaves: 'leaves', rock: 'stone', plant: 'bush', wood: 'wood', sky: 'sky', road: 'grass' },
        winter: { liquid: 'water', ground: 'ground', mineral: 'diamond', mineral2: 'silver', mineral3: 'gold', leaves: 'leaves', rock: 'stone',  plant: 'bush', wood: 'wood', sky: 'sky', road: 'snow'}
      }
      // Define the map size
      const mapSizes = {
        small: { rows: 20, cols: 25 },
        medium: { rows: 20, cols: 30 },
        large: { rows: 20, cols: 35 }
      };
      this.mapSize = mapSize;
      this.userChoice = theme;
      this.rows = mapSizes[mapSize].rows;
      this.cols = mapSizes[mapSize].cols;
      this.road = mapSizes[mapSize].rows - 6;
      this.ground = mapSizes[mapSize].rows - 5;
      this.liquid = mapSizes[mapSize].rows - 1;
      this.map = [];
    }

    // Initialize the game world
    initialize() {
      let mapGen = document.querySelector('.map-generation').textContent === 'random' ? true : false;
      mapGen ? this.generateRandomMap(this.theme[this.userChoice]): this.generateMap(this.theme[this.userChoice]);
      const tiles = document.querySelectorAll('.box');

      // Assign event listeners to each tool
      tools.forEach(tool => { 
        tool.addEventListener('click', () => { 
          Object.keys(toolBox).forEach(toolName => {  
            if (tool.classList.contains(toolBox[toolName].toolClass)) selectTool(toolName, tiles, this);
          });
        });
      });
      
      // Assign event listeners to each tile
      tiles.forEach(box => box.addEventListener('click', () => handleBoxClick(box, this.map, this)));

      // Clear cursor on Escape key press
      document.body.addEventListener("keydown", event => {
        if (event.key === 'Escape'){
          clearCursorToDefault(tiles);
          hideLeadboard();
          hideMediaPlayer();
        }
      });

      // Reset map on reset button click
      document.getElementById('rst-btn').addEventListener('click', () => this.resetMap());
    }

    // Function to generate a specific map
    generateMap(theme) {
      this.map = [];
      for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
          const box = this.newTile(i,j);
          
          // Define the various tile types based on their positions
          if (i < this.road && i > this.road - 4 && j === 15) box.classList.add(theme.wood);
          else if (i < this.road - 3 && i > this.road - 7 && j > 13 && j < 17) box.classList.add(theme.leaves);
          else if (i === this.road - 1 && (j === 8 || j === 9)) box.classList.add(theme.plant);
          else if (i === this.road - 1 && (j === 20 || j === 21)) box.classList.add(theme.rock);
          else if (i === this.road) box.classList.add(theme.road);
          else if (i >= this.ground && i < this.liquid) {
            if (j % 17 === 0 && i === this.ground + 3)
              box.classList.add(theme.mineral);
            else if (j % 12 === 0 && i === this.ground + 1)
              box.classList.add(theme.mineral2);
            else
              box.classList.add(theme.ground);  
          }
          else if (i === this.rows - 1) box.classList.add(theme.liquid);
          else box.classList.add(theme.sky);
          
          row.push(box);
        }
        this.map.push(row);
      }
      this.drawMaptoScreen();
    }
    
    drawMaptoScreen() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          screen.appendChild(this.map[i][j]);
          setTimeout(() => this.map[i][j].classList.add("animate"), (i + j) * 40);
        }
      }
    }

    // Function to create button
    newTile(row, col) {
      const box = document.createElement('button');
      box.classList.add('box', 'cursor-default');
      box.dataset.row = row;
      box.dataset.col = col;
      return box;
    }

    // Function to generate a random map
    generateRandomMap(theme) {
      this.map = [];
      for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
          const box = this.newTile(i, j);
          if (i === this.rows - 1) box.classList.add(theme.liquid);
          else if (i >= this.rows - 5 && i < this.rows - 1) box.classList.add(this.randomMineral(theme));
          else if (i === this.rows - 6) box.classList.add(theme.road);
          else box.classList.add(theme.sky);
          row.push(box);
        }
        this.map.push(row);
      }
    
      // Add special elements on the road
      for (let j = 0; j < this.cols; j++) {
        if (Math.random() < 0.1) {
          if (Math.random() < 0.5) {
            this.addTile(this.rows - 7, j, theme.wood); 
            if (j + 2 < this.cols) {
              this.addTile(this.rows - 8, j, theme.wood);
              this.addTile(this.rows - 9, j, theme.wood);
              this.addTile(this.rows - 10, j, theme.wood);
              for (let k = -1; k <= 1; k++) 
                for (let l = -1; l <= 1; l++) 
                  if (this.rows - 11 + k >= 0 && this.cols + j + l >= 0) 
                    this.addTile(this.rows - 11 + k, j + l, theme.leaves);
            }
          } 
          else this.addTile(this.rows - 6, j, theme.rock);
        } 
        else if (Math.random() < 0.3) this.addTile(this.rows - 7, j, theme.plant);
      }
    
      this.drawMaptoScreen();
    }

    // Function to choose random mineral
    randomMineral(theme) {
      if (Math.random() < 0.93) return theme.ground;
      let randomMineral = Math.random();
      if (randomMineral < 0.5) return theme.rock;
      else if (randomMineral < 0.75) return theme.mineral;
      else if (randomMineral < 0.875) return theme.mineral2;
      else return theme.mineral3;
    }

    // function to add tile and remove sky class
    addTile(row, col, className) {
      this.map[row][col].classList.remove('sky');
      this.map[row][col].classList.add(className);
    }

    // Reset the game map
    resetMap() {
      screen.innerHTML = '';
      this.initialize();
    }
  }

  // Function to select a tool
  function selectTool(toolName, tiles, game) {
    game.selectedTool = toolName;
    const { selectedClass, _ } = toolBox[toolName];
    
    // Update selected tool UI
    Object.keys(toolBox).forEach(tool => {
      const element = document.querySelector(`.${toolBox[tool].toolClass}`);
      if(element !== null) element.classList.toggle('selected', tool === toolName);
    });

    // Update tile cursor class for each box
    tiles.forEach(box => {
      Object.values(toolBox).forEach(({ selectedClass: cls }) => {
        if (cls !== selectedClass && box.classList.contains(cls)) box.classList.remove(cls);
      });
      box.classList.add(selectedClass);
    });
  }

  // Function to clear the cursor to default
  function clearCursorToDefault(tiles) {
    tiles.forEach(box => {
      Object.values(toolBox).forEach(({ selectedClass }) => box.classList.remove(selectedClass));
      box.classList.add('cursor-default');
    });
  }

  // Check if neighbor is sky
  function isSky(map, row, col) {
    if (row < 0 || col < 0 || row >= map.length || col >= map[0].length) 
      return false;
    else 
      return map[row][col].classList.contains('sky');
  }

  // Function to handle box click events
  function handleBoxClick(box, map, game) {
    const actions = toolActions[game.selectedTool];
    let row = parseInt(box.dataset.row, 10);
    let col = parseInt(box.dataset.col, 10);
    
    if (isSky(map, row + 1, col) || isSky(map, row, col + 1) || isSky(map, row - 1, col) || isSky(map, row, col - 1)){
      if (actions) removeBox(box, actions, game);
    }
    else {
      for (const [className, inventoryItem] of Object.entries(actions)) {
        if (box.classList.contains(className)) {
          displayMessage(MSG);
        }
      }
    }
  }

  // Function to remove box from screen and update inventory
  function removeBox(box, actions, game) {
    for (const [className, inventoryItem] of Object.entries(actions)) {
      if (box.classList.contains(className)) {
        harvest(box);
        box.classList.remove(className);
        game.inventoryCounter[inventoryItem]++;
        updateInventory(game, inventoryItem);
        break;
      }
    }
  }

  // Function to update inventory display
  function updateInventory(game, element) {
    inventory.forEach(item => {
      const itemName = item.classList[1].slice(4);
      if (element === item.classList[1].split('-')[1]){
        item.classList.add("inv-update");
        item.innerHTML = game.inventoryCounter[itemName];
        setTimeout(() => item.classList.remove("inv-update"), 500);
      }
    });
  }

  // Function to show "+1" effect on harvest
  function harvest(box) {
    box.classList.add("plus-one", "sky");
    box.innerText = "+1";
    setTimeout(() => {
      box.classList.remove("plus-one");
      box.innerText = "";
    }, 500);
  }

  const letsPlay = document.querySelector('.one');

  letsPlay.addEventListener('click', () => {
    // Initialize the game instance
    const size = document.querySelector('.map-size').textContent;
    let theme = document.querySelector('.theme').textContent;
    const game = new Minecraft(theme, size);
    game.initialize();
  });

  // Tooltip toggle for info button
  document.getElementById('infoButton').addEventListener('click', () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = (tooltip.style.display === 'none' || tooltip.style.display === '') ? 'flex' : 'none';
    setTimeout(() => { tooltip.style.display = 'none' }, 1100);
  });

  function displayMessage(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
  
    // Optionally hide the message after a few seconds
    setTimeout(() => { messageContainer.style.display = 'none' }, 3000);
  }
  
});
