const fs = require('fs').promises;
const path = require('path');

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

// Find the largest image and store its name in a JS file for later use
(async () => {
  const dir = './assets'; // Replace with your directory path
  const largestImage = await findLargestImage(dir);
  if (largestImage) {
    const content = `export const largestImage = "${largestImage}";`;
    await fs.writeFile('./largestImage.js', content);
  }
})();
