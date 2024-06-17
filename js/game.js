document.addEventListener("DOMContentLoaded", () => {
  const rows = 20;
  const cols = 25;
  const grass = rows - 6;
  const snow = rows - 6;
  const road = rows - 6;
  const ground = rows - 5;
  const lava = rows - 1;
  const water = rows - 1;

  const mapSize = {
    small: { rows: 20, cols: 25 },
    medium: { rows: 25, cols: 30 },
    large: { rows: 30, cols: 35 }
  };
  
  const screen = document.querySelector('.game-screen');
  const tools = document.querySelectorAll('.tool');
  const inventory = document.querySelectorAll('.inv');

  // Define the actions and inventory updates for each tool
  const toolActions = {
    shovel: { ground: 'dirt', grass: 'grass', sand: 'glass', snow: 'snow', road: 'stone'},
    axe: { bush: 'grass', leaves: 'grass', wood: 'wood' },
    pickaxe: { gold: 'gold', stone: 'stone', silver: 'silver', diamond: 'diamond' },
    hoe: { lava: 'coal', stone: 'brick', water: 'ice' },
    default: {}
  };

  // Define the mapping object for tool behaviors
  const toolBox = {
    axe: { selectedClass: 'cursor-axe', toolClass: 'axe' },
    pickaxe: { selectedClass: 'cursor-pickaxe', toolClass: 'pickaxe' },
    shovel: { selectedClass: 'cursor-shovel', toolClass: 'shovel' },
    hoe: { selectedClass: 'cursor-hoe', toolClass: 'hoe' },
    default: { selectedClass: 'cursor-default', toolClass: 'default' }
  };

  // Define the Minecraft theme
  const theme = {
    liquid: { lava: 'lava', water: 'water' },
    ground: { ground: 'ground', sand: 'sand', gold: 'gold', silver: 'silver', stone: 'stone' },
    mineral: { diamond: 'diamond', coal: 'coal', brick: 'brick', ice: 'ice', glass: 'glass'},
    plant: { grass: 'grass', bush: 'bush', leaves: 'leaves', wood: 'wood' },
    snow: { snow: 'snow' },
    road: { road: 'road' }
  };

  class Minecraft {
    constructor(rows, cols) {
      this.selectedTool = "cursor-default";
      this.inventoryCounter = {
        dirt: 0, brick: 0, coal: 0, ice: 0, gold: 0, grass: 0, silver: 0,
        glass: 0, sand: 0, snow: 0, stone: 0, wood: 0
      };
      this.mapSize = 0;
      this.mapRandomGeneration = false;
      this.rows = rows;
      this.cols = cols;
      this.grass = rows - 6;
      this.snow = rows - 6;
      this.road = rows - 6;
      this.ground = rows - 5;
      this.lava = rows - 1;
      this.water = rows - 1;
      this.map = [];
    }

    // Initialize the game world
    initialize() {
      this.mapRandomGeneration ? this.generateRandomMap(): this.generateMap();

      const tiles = document.querySelectorAll('.box');

      // Assign event listeners to each tool
      tools.forEach(tool => { tool.addEventListener('click', () => { Object.keys(toolBox).forEach(toolName => {  if (tool.classList.contains(toolBox[toolName].toolClass)) selectTool(toolName, tiles)})})});
      // Assign event listeners to each tile
      tiles.forEach(box => box.addEventListener('click', () => handleBoxClick(box, this.map)));

      // Clear cursor on Escape key press
      document.body.addEventListener("keydown", event => {
        if (event.key === 'Escape'){
          clearCursorToDefault(tiles);
          hideLeadboard();
          hideMediaPlayer();
        }
        });

      // Reset map on reset button click
      document.getElementById('rst-btn').addEventListener('click', () => game.resetMap());
    }

    // Function to generate a specific map
    generateMap() {
      this.map = [];
      for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
          const box = this.newTile(i,j);
          
          // Define the various tile types based on their positions
          if (i < grass && i > grass - 4 && j === 15) box.classList.add('wood');
          else if (i < grass - 3 && i > grass - 7 && j > 13 && j < 17) box.classList.add('leaves');
          else if (i === grass - 1 && (j === 8 || j === 9)) box.classList.add('bush');
          else if (i === grass - 1 && (j === 20 || j === 21)) box.classList.add('stone');
          else if (i === grass) box.classList.add('grass');
          else if (i >= ground && i < lava) {
            if (j % 17 === 0 && i === ground + 3)
              box.classList.add('gold');
            else if (j % 12 === 0 && i === ground + 1)
              box.classList.add('silver');
            else
              box.classList.add('ground');  
          }
          else if (i === rows - 1) box.classList.add('lava');
          else
            box.classList.add('sky');
          
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
          setTimeout(() => this.map[i][j].classList.add("animate"), (i + j) * 60);
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
    generateRandomMap() {
      
    }

    // Reset the game map
    resetMap() {
      screen.innerHTML = '';
      this.initialize();
    }
  }

  // Initialize the game instance
  const game = new Minecraft(20, 25);
  game.initialize();

  // Function to select a tool
  function selectTool(toolName, tiles) {
    game.selectedTool = toolName;
    const { selectedClass, _ } = toolBox[toolName];
    
    // Update selected tool UI
    Object.keys(toolBox).forEach(tool => {
      const element = document.querySelector(`.${toolBox[tool].toolClass}`);
      if(element !== null) element.classList.toggle('selected', tool === toolName);
    });

    // Update tile cursor class for each box
    tiles.forEach(box => {
      Object.values(toolBox).forEach(({ selectedClass: cls }) => {if (cls !== selectedClass && box.classList.contains(cls)) box.classList.remove(cls) });
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
  function handleBoxClick(box, map) {
    const actions = toolActions[game.selectedTool];
    let row = parseInt(box.dataset.row, 10);
    let col = parseInt(box.dataset.col, 10);
    
    if (actions && (isSky(map,row+1,col) || isSky(map,row,col+1) || isSky(map,row-1,col) || isSky(map,row,col-1)))
      removeBox(box, actions)
  }

  // Function to remove box from screen and update inventory
  function removeBox(box, actions) {
    for (const [className, inventoryItem] of Object.entries(actions)) {
      if (box.classList.contains(className)) {
        harvest(box);
        box.classList.remove(className);
        game.inventoryCounter[inventoryItem]++;
        break;
      }
    }
    updateInventory();
  }

  // Function to update inventory display
  function updateInventory() {
    inventory.forEach(item => {
      const itemName = item.classList[1].slice(4);
      item.innerHTML = game.inventoryCounter[itemName];
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
  
  // Tooltip toggle for info button
  document.getElementById('infoButton').addEventListener('click', () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = (tooltip.style.display === 'none' || tooltip.style.display === '') ? 'flex' : 'none';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 1100); // Total delay of 1.1 seconds
  });

  
});
