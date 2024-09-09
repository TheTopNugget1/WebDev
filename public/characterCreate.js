let bool = true;
const ColourImage = document.getElementById("Colour");
const HatImage = document.getElementById("Hat");
const PantImage = document.getElementById("Pant");

const ColourImageSingle = document.getElementById("ColourSingle");
const HatImageSingle = document.getElementById("HatSingle");
const PantImageSingle = document.getElementById("PantSingle");

const PantBut = document.getElementById("PantOption");
const hatBut = document.getElementById("HatOption");
const colourBut = document.getElementById("ColourOption");

const colourOptions = document.getElementById("colourButtonGroup");
const hatOptions = document.getElementById("hatButtonGroup");
const PantOptions = document.getElementById("PantButtonGroup");


colourBut.addEventListener('click', () => {
  colourOptions.style.display = "block";
  hatOptions.style.display = "none";
  PantOptions.style.display = "none";
});

hatBut.addEventListener('click', () => {
  colourOptions.style.display = "none";
  hatOptions.style.display = "block";
  PantOptions.style.display = "none";
});

PantBut.addEventListener('click', () => {
  colourOptions.style.display = "none";
  hatOptions.style.display = "none";
  PantOptions.style.display = "block";
});

function saveCharacter() {

  const canvas = document.createElement('canvas');
  canvas.width = 88; // Width of the final image
  canvas.height = 126; // Height of the final image
  const ctx = canvas.getContext('2d');

  const base = document.getElementById("Base");
  const colour = document.getElementById("Colour");
  const hat = document.getElementById("Hat");
  const pant = document.getElementById("Pant");

  // Draw images in correct order
  ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(colour, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hat, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(pant, 0, 0, canvas.width, canvas.height);

  // Get the data URL of the canvas and trigger download
  const dataURL = canvas.toDataURL('image/png');
  //const link = document.createElement('a');
  //link.download = 'CustomChar.png';
  //link.href = dataURL;
  //link.click();

  fetch('/save-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: dataURL }),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

function ChangeColour(Colour){
    ColourImage.src = `assets/${Colour}Sheet.png`;
    ColourImageSingle.src = `assets/items/${Colour}.png`;
}

function ChangeHat(Hat){
    HatImage.src = `assets/${Hat}Sheet.png`;
    HatImageSingle.src = `assets/items/${Hat}.png`;
}

function ChangePant(Pant){
    PantImage.src = `assets/${Pant}Sheet.png`;
    PantImageSingle.src = `assets/items/${Pant}.png`;
}

function randomizeCharacter() {
  const colours = ['Red', 'Yellow', 'Blue', 'Green', 'Purple', 'White'];
  const hats = ['TopHat', 'FezHat', 'PartyHat', 'WitchHat', 'PartyHat', 'BowHat', 'Void'];
  const pants = ['HighVisPant', 'TutuPant', 'Void'];

  // Select a random color
  const randomColour = colours[Math.floor(Math.random() * colours.length)];
  ChangeColour(randomColour);

  // Select a random hat
  const randomHat = hats[Math.floor(Math.random() * hats.length)];
  ChangeHat(randomHat);

  // Select a random pant
  const randomPant = pants[Math.floor(Math.random() * pants.length)];
  ChangePant(randomPant);
}

function Reset(){
  ColourImage.src = `assets/items/Void.png`;
  HatImage.src = `assets/items/Void.png`;
  PantImage.src = `assets/items/Void.png`;

  ColourImageSingle.src = `assets/items/Void.png`;
  HatImageSingle.src = `assets/items/Void.png`;
  PantImageSingle.src = `assets/items/Void.png`;
}
