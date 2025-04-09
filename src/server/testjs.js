<!DOCTYPE html>
<html>
<body>

<h2>My Heading</h2>

<p>Play around with the code and click on the "Run" button to view the result.</p>

<p id="demo"></p>

<script>
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const https = require('https');

function decodeSecretMessage(docUrl) {
    https.get(docUrl, (res) => {
        let data = '';

        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            const lines = data.trim().split('\n');
            let charPositions = [];
            let maxX = 0, maxY = 0;
            for (let i = 0; i < lines.length - 2; i += 3) {
                const x = parseInt(lines[i].trim());
                const char = lines[i + 1].trim();
                const y = parseInt(lines[i + 2].trim());

                if (!isNaN(x) && !isNaN(y)) {
                    charPositions.push({ x, y, char });
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
            let grid = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill(' '));
            charPositions.forEach(({ x, y, char }) => {
                grid[y][x] = char;
            });

            // Print the grid
            grid.forEach(row => console.log(row.join('')));
        });
    }).on('error', err => {
        console.error("Error fetching document:", err.message);
    });
}

const docUrl = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";
decodeSecretMessage(docUrl);
</script>

</body>
</html>
