// -------------------------------
// pgt generated 25%
// Hugh generated 75%
// James generated 0%
// Hugh Understanding 100%
// James Understanding 0%
// ------------------------------


let bool = true;
const ColourImage = document.getElementById("Colour");
const HatImage = document.getElementById("Hat");
const EyeImage = document.getElementById("Eye");

const eyeBut =document.getElementById("EyeOption");
const hatBut =document.getElementById("HatOption");
const colourBut =document.getElementById("ColourOption");

const colourOptions = document.getElementById("colourButtonGroup");
const hatOptions = document.getElementById("hatButtonGroup");
const eyeOptions = document.getElementById("eyeButtonGroup");


colourBut.addEventListener('click', () => {
  colourOptions.style.display = "block";
  hatOptions.style.display = "none";
  eyeOptions.style.display = "none";
});

hatBut.addEventListener('click', () => {
  colourOptions.style.display = "none";
  hatOptions.style.display = "block";
  eyeOptions.style.display = "none";
});

eyeBut.addEventListener('click', () => {
  colourOptions.style.display = "none";
  hatOptions.style.display = "none";
  eyeOptions.style.display = "block";
});

function saveCharacter() {
  const canvas = document.createElement('canvas');
  canvas.width = 400; // Width of the final image
  canvas.height = 200; // Height of the final image
  const ctx = canvas.getContext('2d');

  const base = document.getElementById("Base");
  const colour = document.getElementById("Colour");
  const hat = document.getElementById("Hat");
  const eye = document.getElementById("Eye");

  // Draw images in correct order
  ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(colour, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hat, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(eye, 0, 0, canvas.width, canvas.height);

  // Get the data URL of the canvas and trigger download
  const dataURL = canvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'custom-alpaca.png';
  link.href = dataURL;
  link.click();
}

function ChangeColour(Colour){
    ColourImage.src = `assets/${Colour}Sheet.png`;
}

function ChangeHat(Hat){
    HatImage.src = `assets/${Hat}Sheet.png`;
}

function ChangeEye(Eye){
    EyeImage.src = `assets/${Eye}.png`;
}

function randomizeCharacter(){

}
