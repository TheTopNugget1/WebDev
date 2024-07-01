// -------------------------------
// pgt generated 25%
// Hugh generated 75%
// James generated 0%
// Hugh Understanding 100%
// James Understanding 0%
// ------------------------------


let bool = true;

function saveCharacter(){
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    // Draw a red rectangle on the canvas
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 100);

    // Get the data URL of the canvas
    const dataURL = canvas.toDataURL();

    // Create an <a> element to trigger download
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = dataURL;

    // Programmatically click the link to trigger download
    link.click();

}

function randomizeCharacter(){

}
