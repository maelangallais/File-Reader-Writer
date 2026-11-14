
const fileInput = document.getElementById("input");
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.warn("File deleted.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64String = e.target.result;

        try {
            writeNewFile(file.name, base64String);
            console.log("Analysis completed successfully!");
        } catch (error) {
            console.error("Non-compliant file!");
            console.error("Critical error, execution has stopped.");
            console.error(error.message);
        }
    }

    reader.readAsDataURL(file);
});

function writeNewFile(fileName, base64Content) {
    const name = fileName.split('.').slice(0, -1).join('.');

    const fileContent =
`
const thisBuffer = {
    "${name}": "${base64Content}"
};

window.thisBuffer = thisBuffer;
`;

    const blob = new Blob([fileContent], { type: "application/javascript;charset=utf-8" });


    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.js`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
