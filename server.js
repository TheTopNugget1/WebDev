// -------------------------------
// pgt generated 75%
// Hugh generated 25%
// James generated 0%
// Hugh Understanding 100%
// James Understanding 0%
// ------------------------------

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

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
    }

    const largestBlocks = [];
    if (largestFlat) largestBlocks.push(largestFlat);
    if (largestFlipped) largestBlocks.push(largestFlipped);
    if (largestBcl) largestBlocks.push(largestBcl);
    if (largestBcld) largestBlocks.push(largestBcld);
    if (largestBcr) largestBlocks.push(largestBcr);
    if (largestBcrd) largestBlocks.push(largestBcrd);
    if (largestMove) largestBlocks.push(largestMove);
    if (largestFloat) largestBlocks.push(largestFloat);
    if (largestGank) largestBlocks.push(largestGank);
    if (largestIce) largestBlocks.push(largestIce);

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
    let blocks = {};

    for (const file of files) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);

      let match = base.match(/^(flat|flipped|bcl|bcld|bcr|bcrd|move|gank|float|ice)(\d+)$/);
      if (match) {
        const type = match[1];
        const number = match[2];

        if (!blocks[number]) {
          blocks[number] = {
            flat: null,
            flipped: null,
            bcl: null,
            bcld: null,
            bcr: null,
            bcrd: null,
            move: null,
            gank: null,
            float: null,
            ice: null
          };
        }

        if (type === 'flat') {
          blocks[number].flat = file;
        } else if (type === 'flipped') {
          blocks[number].flipped = file;
        } else if (type === 'bcl') {
          blocks[number].bcl = file;
        } else if (type === 'bcld') {
          blocks[number].bcld = file;
        } else if (type === 'bcr') {
          blocks[number].bcr = file;
        } else if (type === 'bcrd') {
          blocks[number].bcrd = file;
        } else if (type === 'move') {
          blocks[number].move = file;
        } else if (type === 'gank') {
          blocks[number].gank = file;
        } else if (type === 'ice') {
          blocks[number].ice = file;
        } else if (type === 'float') {
          blocks[number].float = file;
        }

      }
    }

    const blockNumbers = Object.keys(blocks);
    if (blockNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * blockNumbers.length);
      const randomNumber = blockNumbers[randomIndex];
      const randomBlock = blocks[randomNumber];

      const chosenBlocks = [];
      if (randomBlock.flat) chosenBlocks.push(randomBlock.flat);
      if (randomBlock.flipped) chosenBlocks.push(randomBlock.flipped);
      if (randomBlock.bcl) chosenBlocks.push(randomBlock.bcl);
      if (randomBlock.bcld) chosenBlocks.push(randomBlock.bcld);
      if (randomBlock.bcr) chosenBlocks.push(randomBlock.bcr);
      if (randomBlock.bcrd) chosenBlocks.push(randomBlock.bcrd);
      if (randomBlock.move) chosenBlocks.push(randomBlock.move);
      if (randomBlock.float) chosenBlocks.push(randomBlock.float);
      if (randomBlock.gank) chosenBlocks.push(randomBlock.gank);
      if (randomBlock.ice) chosenBlocks.push(randomBlock.ice);

      if (chosenBlocks.length > 0) {
        console.log("Random blocks found:", chosenBlocks);
        return chosenBlocks;
      }
    } else {
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
