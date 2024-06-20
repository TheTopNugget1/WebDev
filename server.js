// -------------------------------
// chat pgt generated 
//------------------------------


const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

async function findLargestImage(dir) {
  try {
    const files = await fs.readdir(dir);
    let maxNumber = -1;
    let largestImage = null;

    for (const file of files) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);

      const match = base.match(/^char(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxNumber) {
          maxNumber = number;
          largestImage = file;
        }
      }
    }

    if (largestImage) {
      console.log("Largest image file found:", largestImage);
      return largestImage;
    } else {
      console.log("No matching images found.");
      return null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}

async function findRandomImage(dir) {
    try {
      const files = await fs.readdir(dir);
      let randomImage = null;
      let images = [];
  
      for (const file of files) {
        const ext = path.extname(file);
        const base = path.basename(file, ext);
  
        const match = base.match(/^char(\d+)$/);
        if (match) {
            images.push(file); // Add matching file to images array
        }
      }
      
  
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        randomImage = images[randomIndex]; // Pick a random image from the array
        console.log("Random image file found:", randomImage);
        return randomImage;
      } else {
        console.log("No matching images found.");
        return null;
      }
    } catch (error) {
      console.error("Error reading directory:", error);
      return null;
    }
}

app.get('/find-largest-image', async (req, res) => {
  const dir = './public/assets'; // Replace with your directory path
  const largestImage = await findLargestImage(dir);
  if (largestImage) {
    const content = `export const ChosenImage = "${largestImage}";`;
    await fs.writeFile('./public/largestImage.js', content); // Save in the 'public' directory
    res.send(`Largest image file found and saved: ${largestImage}`);
  } else {
    res.send("No matching images found.");
  }
});

app.get('/find-random-image', async (req, res) => {
    const dir = './public/assets'; // Replace with your directory path
    const randomImage = await findRandomImage(dir);
    if (randomImage) {
        const content = `export const ChosenImage = "${randomImage}";`;
        await fs.writeFile('./public/largestImage.js', content); // Save in the 'public' directory
        res.send(`random image file found and saved: ${randomImage}`);
    }   
    else {
        res.send("No matching images found.");
    }
});

// Serve game.html when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
