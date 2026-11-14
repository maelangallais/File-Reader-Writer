
const fs = require('fs');
const path = require('path');

const folderName = 'folder';
const inputFolder = path.join(__dirname, folderName);
const outputFile = path.join(__dirname, 'thisBuffer.js');

try {
    if (!fs.existsSync(inputFolder)) {
        console.error(`The "${folderName}" folder doesn't exist. Please create it and add it your files.`);
        process.exit(1);
    }

    const files = fs.readdirSync(inputFolder);
    const thisBuffer = {};

    // 2. Boucler sur chaque élément
    for (const file of files) {
        const filePath = path.join(inputFolder, file);

        if (fs.statSync(filePath).isDirectory()) continue;

        const ext = path.extname(file).toLowerCase();
        const nameOnly = path.parse(file).name;

        let mimeType = "audio/mp3";
        if (ext === '.wav') mimeType = "audio/wav";
        else if (ext === '.ogg') mimeType = "audio/ogg";

        const fileBuffer = fs.readFileSync(filePath);
        const base64Data = fileBuffer.toString('base64');

        thisBuffer[nameOnly] = `data:${mimeType};base64,${base64Data}`;
    }

    const fileContent = `\nconst thisBuffer = ${JSON.stringify(thisBuffer, null, 2)};\n\nwindow.thisBuffer = thisBuffer;\n`;

    fs.writeFileSync(outputFile, fileContent);
    console.log(`Success : ${Object.keys(thisBuffer).length} file(s) compiled in file.js.`);

} catch (error) {
    console.error("Critical error, execution has stopped.");
    console.error(error.message);
}
