document.addEventListener("DOMContentLoaded", () => {
    const textLines = [
        "<br><h2 class=\"sub-logo\">Mine, Craft, Build!</h2><br>",
        "<h4>Use the arrow keys to navigate the menu and press 'Enter' to approve</h4>",
        "<h4>Use the up and down arrows to control the music volume</h4>",
        "<h4>While in the game, follow the instructions on the top right corner</h4>"
    ];

    const container = document.getElementById("text-container");

    let currentLine = 0;

    function typeText(lineIndex, charIndex = 0) {
        if (lineIndex < textLines.length) {
            const lineElement = document.createElement("div");
            container.appendChild(lineElement);

            (function typeCharacter() {
                if (charIndex < textLines[lineIndex].length) {
                    lineElement.innerHTML = textLines[lineIndex].substring(0, charIndex + 1);
                    setTimeout(typeCharacter, 10); // Adjust typing speed here (faster for human eyes)
                    charIndex++;
                } else if (++currentLine < textLines.length) {
                    setTimeout(() => typeText(currentLine), 100); // Adjust delay between lines here
                }
            })();
        }
    }

    typeText(currentLine);
});
