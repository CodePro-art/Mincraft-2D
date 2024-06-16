var PigThoughts = [
    "Hhhmmm..., What is this human doing??...",
    "Oh, look, a pancake! I wonder if I could fly with this?",
    "Why do humans keep staring at me? Is my curly tail that mesmerizing?",
    "A mud bath sounds delightful right about now... I'll just blame it on the dog later.",
    "If I roll in enough pans, maybe I'll become a superhero...Pig Pan!",
    "To nap or to eat... that is the eternal pig dilemma.",
    "Human, why are you exercising when you could be napping with me?",
    "Is that a carrot? Oh, it's just another human pretending to be a carrot.",
    "What if we pigs invented flying? Would bacon fly too?",
    "Ah, the sweet smell of freshly baked bread... Wait, is that bacon?!",
    "If I stare at the fridge long enough, maybe it will open by itself.",
    "I'm sure these humans hide treats behind their ears... I just need to figure out how to reach up there.",
    "How do humans manage to spill food everywhere except their mouths?",
    "If I had thumbs, I'd be ruling this kitchen... and probably making a mess too.",
    "That moment when you're too lazy to oink, so you just stare and hope for snacks.",
    "Do you think anyone has ever mistaken me for a piggy bank? I'm open for donations in the form of cookies."
  ];

var Quotes = [
    "Its groundbreaking!", 
    "Undfeated!", 
    "Woo, tigsource!", 
    "Bees, bees, bees!", 
    "Hobo humping slobo babe!", 
    "Minecraft!", 
    "Hotter than the sun!", 
    "Casual gaming!",
    "Dungeon!",
    "Also try terraria!",
    "WTF?!",
    "Best in Class!",
    "Don't bother with the clones!",
    "Netanel has an amazing hair!",
    "Sweet is neat!",
    "Indev!"
];

// change page
function changePage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.add('hidden'));
  
    const newPage = document.querySelector(page);
    newPage.classList.remove('hidden');

    displayQuote();
  }
  
function displayQuote(){
  var num = Math.floor(Math.random() * 16);
  document.getElementById("quote").innerHTML = Quotes[num];
  document.getElementById("thought").innerHTML = PigThoughts[num];
}

function myFunction() {
  alert('Check Out My other projects!\nClick "Projects" to check them out!');
}

function toggleGenerationMode() {
    // const mapGeneration = document.querySelector('.random-map');
    var spanElement = document.querySelector('.map-generation');
    spanElement.textContent = (spanElement.textContent === "off") ? "on" : "off";
}

function toggleMapSize() {
    var spanElement = document.querySelector('.map-size');
    spanElement.textContent = (spanElement.textContent === "small") ? "large" : "small";
}

