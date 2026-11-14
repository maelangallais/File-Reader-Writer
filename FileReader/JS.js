
const fileInput = document.getElementById("input");
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.warn("File deleted.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const currentFile = new DataView(arrayBuffer);

        try {
            WriteOnPage(currentFile);
            console.log("Analysis completed successfully!");
        } catch (error) {
            console.error("Non-compliant file!");
            console.error("Critical error, execution has stopped.");
            console.error(error.message);
        }
    }

    reader.readAsArrayBuffer(file);
});


function WriteOnPage(file, start = 0, end = file.byteLength) {
    const container = document.querySelector('#container');

    for (let i = start; i < end; i++) {
        const byte = file.getUint8(i);
        const hexa = DecToHex(byte);
        const char = String.fromCharCode(byte);

        let column = document.createElement("div");
        column.classList.add("column");
        let cell1 = document.createElement("div");
        let cell2 = document.createElement("div");
        let cell3 = document.createElement("div");
        cell1.textContent = i;
        cell2.textContent = hexa;
        cell3.textContent = char;
        column.appendChild(cell1);
        column.appendChild(cell2);
        column.appendChild(cell3);

        container.appendChild(column);
    }
}
function DecToHex(Dec) {
    const HEX = ["A", "B", "C", "D", "E", "F"];
    const DEC = [10, 11, 12, 13, 14, 15];
    let iHex = Array(0);
    let Hex = "";
    if (Dec == 0) Hex += "0";
    while (Dec != 0) {
        iHex.push(Dec % 16);
        Dec = Math.floor(Dec / 16);
    }
    if (iHex.length < 2) {
        for (let i = 0; i < (2 - iHex.length); i++) {iHex.push(0);}
    }
    for (let i = iHex.length - 1; i >= 0; i--) {
        let string = iHex[i];
        if (DEC.includes(string)) {
            string = HEX[DEC.indexOf(string)];
        }
        Hex += string;
    }
    return Hex;
}