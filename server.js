// -------------------------------
// pgt generated 75%
// Hugh generated 25%
// James generated 0%
// Hugh Understanding 100%
// James Understanding 0%
// ------------------------------

// The required libraries to run the server

const express = require('express'); // The express module for the server
const { readFile } = require('fs'); // 
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/save-image', (req, res) => {
  const imageData = req.body.image.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(imageData, 'base64');

  fs.writeFile('public/assets/character.png', buffer, (err) => {
    if (err) {
      console.error('Failed to save image:', err);
      return res.status(500).send({ message: 'Failed to save image' });
    }
    res.send({ message: 'Image saved successfully' });
  });
});


function randomNumber() {
  randomNum = Math.floor(Math.random() * 4) + 1;
  return randomNum
}

async function findSelectedStyle(dir, style) {
  try {
    const files = await fs.readdir(dir);
    const chosenBlocks = [];

    console.log(style);

    // Filter files that end with the style number
    files.forEach(file => {
      const ext = path.extname(file);
      const base = path.basename(file, ext);

      let match = base.match(/^(.*?)(\d+)$/);
      if (match) {
        const number = match[2];
        if (number === style) {
          chosenBlocks.push(file);
        }
      }
    });

    if (chosenBlocks.length > 0) {
      console.log("Blocks found for style", style, ":", chosenBlocks);
      return chosenBlocks;
    } else {
      console.log("No matching blocks found for style:", style);
      return null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}

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

async function findLargestBlock(dir) {
  try {
    const files = await fs.readdir(dir);
    let maxFlatNumber = -1;
    let maxFlippedNumber = -1;
    let maxBclNumber = -1;
    let maxBcldNumber = -1;
    let maxBcrNumber = -1;
    let maxBcrdNumber = -1;
    let maxMoveNumber = -1;
    let maxFloatNumber = -1;
    let maxGankNumber = -1;
    let maxIceNumber = -1;
    let maxDoorNumber = -1;
    let maxQackNumber = -1;
    let largestFlat = null;
    let largestFlipped = null;
    let largestBcl = null;
    let largestBcld = null;
    let largestBcr = null;
    let largestBcrd = null;
    let largestMove = null;
    let largestFloat = null;
    let largestGank = null;
    let largestIce = null;
    let largestDoor = null;
    let largestQack = null;

    for (const file of files) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);

      let match = base.match(/^flipped(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxFlippedNumber) {
          maxFlippedNumber = number;
          largestFlipped = file;
        }
      }

      match = base.match(/^flat(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxFlatNumber) {
          maxFlatNumber = number;
          largestFlat = file;
        }
      }

      match = base.match(/^bcl(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxBclNumber) {
          maxBclNumber = number;
          largestBcl = file;
        }
      }

      match = base.match(/^bcld(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxBcldNumber) {
          maxBcldNumber = number;
          largestBcld = file;
        }
      }

      match = base.match(/^bcr(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxBcrNumber) {
          maxBcrNumber = number;
          largestBcr = file;
        }
      }

      match = base.match(/^bcrd(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxBcrdNumber) {
          maxBcrdNumber = number;
          largestBcrd = file;
        }
      }

      match = base.match(/^move(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxMoveNumber) {
          maxMoveNumber = number;
          largestMove = file;
        }
      }

      match = base.match(/^float(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxFloatNumber) {
          maxFloatNumber = number;
          largestFloat = file;
        }
      }
    

      match = base.match(/^gank(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxGankNumber) {
          maxGankNumber = number;
          largestGank = file;
        }
      }

      match = base.match(/^ice(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxIceNumber) {
          maxIceNumber = number;
          largestIce = file;
        }
      }

      match = base.match(/^Door(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxIceNumber) {
          maxDoorNumber = number;
          largestDoor = file;
        }
      }

      match = base.match(/^Qack(\d+)$/);
      if (match) {
        const number = parseInt(match[1], 10);

        if (number > maxIceNumber) {
          maxQackNumber = number;
          largestQack = file;
        }
      }
    }

    const largestBlocks = [];
    if (largestBcl) largestBlocks.push(largestBcl);
    if (largestBcld) largestBlocks.push(largestBcld);
    if (largestBcr) largestBlocks.push(largestBcr);
    if (largestBcrd) largestBlocks.push(largestBcrd);
    if (largestFlat) largestBlocks.push(largestFlat);
    if (largestFlipped) largestBlocks.push(largestFlipped);
    if (largestFloat) largestBlocks.push(largestFloat);
    if (largestGank) largestBlocks.push(largestGank);
    if (largestIce) largestBlocks.push(largestIce);
    if (largestMove) largestBlocks.push(largestMove);
    if (largestDoor) largestBlocks.puch(largestDoor);
    if (largestQack) largestBlocks.puch(largestQack);


    if (largestBlocks.length > 0) {
      console.log("Largest blocks found:", largestBlocks);
      return largestBlocks;
    } else {
      console.log("No matching blocks found.");
      return null;
    }
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}

async function findRandomBlock(dir) {
  try {
    const files = await fs.readdir(dir);
    const chosenBlocks = [];
    const randNum = randomNumber();

  
    files.forEach(file => {
      const ext = path.extname(file);
      const base = path.basename(file, ext);

      let match = base.match(/^(.*?)(\d+)$/);
      if (match) {
        const number = match[2];  
        if (number == randomNum) {
          chosenBlocks.push(file);
          console.log(chosenBlocks);

        }
      }
    });

    if (chosenBlocks.length > 0) {
      console.log("Random blocks found:", chosenBlocks);
      return chosenBlocks;
    } 
    else {
      console.log("No matching blocks found.");
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
      const randomImage = images[randomIndex]; // Pick a random image from the array
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

async function updateFileLine(filePath, lineNumber, content) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    lines[lineNumber] = content;
    await fs.writeFile(filePath, lines.join('\n'), 'utf-8');
  } catch (error) {
    console.error("Error updating file:", error);
  }
}

app.get('/find-selected-style', async (req, res) => {
  const dir = './public/assets/blocks'; // Replace with your directory path
  const style = req.query.style;
  const StyleBlocks = await findSelectedStyle(dir, style);

  if (StyleBlocks && StyleBlocks.length > 0) {  
    const blockList = StyleBlocks.map(block => `"${block}"`).join(', ');
    await updateFileLine('./public/SelectedImage.js', 2, `export const ChosenBlock = [${blockList}];`);
    res.send(`Random blocks found and saved: \n ${blockList}`);
  } else {
    res.send("No matching blocks found.");
  }
});

app.get('/find-largest-image', async (req, res) => {
  const dir = './public/assets'; // Replace with your directory path
  const largestImage = await findLargestImage(dir);
  if (largestImage) {
    await updateFileLine('./public/SelectedImage.js', 1, `export const ChosenImage = "${largestImage}";`);
    res.send(`Largest image file found and saved: ${largestImage}`);
  } else {
    res.send("No matching images found.");
  }
});

app.get('/find-largest-block', async (req, res) => {
  const dir = './public/assets/blocks'; // Replace with your directory path
  const largestBlocks = await findLargestBlock(dir);

  if (largestBlocks && largestBlocks.length > 0) {
    const blockList = largestBlocks.map(block => `"${block}"`).join(', ');
    await updateFileLine('./public/SelectedImage.js', 2, `export const ChosenBlock = [${blockList}];`);
    res.send(`Largest blocks found and saved: \n ${blockList}`);
  } else {
    res.send("No matching blocks found.");
  }
});

app.get('/find-random-image', async (req, res) => {
  const dir = './public/assets'; // Replace with your directory path
  const randomImage = await findRandomImage(dir);
  if (randomImage) {
    await updateFileLine('./public/SelectedImage.js', 1, `export const ChosenImage = "${randomImage}";`);
    res.send(`Random image file found and saved: ${randomImage}`);
  } else {
    res.send("No matching images found.");
  }
});

app.get('/find-random-block', async (req, res) => {
  
  const dir = './public/assets/blocks'; // Replace with your directory path
  const randomBlocks = await findRandomBlock(dir);

  if (randomBlocks && randomBlocks.length > 0) {
    const blockList = randomBlocks.map(block => `"${block}"`).join(', ');
    await updateFileLine('./public/SelectedImage.js', 2, `export const ChosenBlock = [${blockList}];`);
    res.send(`Random blocks found and saved: \n ${blockList}`);

  } else {
    res.send("No matching blocks found.");
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
