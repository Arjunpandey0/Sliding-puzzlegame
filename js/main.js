let size = 4;
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;

let buttonContainer = document.getElementById('tiles');

// Keyboard controls
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 40;
const DOWN_ARROW = 38;
window.onkeydown = function (event) {
    if (event.keyCode === RIGHT_ARROW) {
        swap(highlighted + 1);
    } else if (event.keyCode === LEFT_ARROW) {
        swap(highlighted - 1);
    } else if (event.keyCode === UP_ARROW) {
        swap(highlighted + size);
    } else if (event.keyCode === DOWN_ARROW) {
        swap(highlighted - size);
    }
};

newGame();

function newGame() {
    buttonContainer.innerHTML = "";
    highlighted = numberOfTiles;
    shuffled = false;
    loadTiles(size);
    setTimeout(() => {
        shuffle();
    }, 500);
}

function loadTiles(n) {
    for (let b = 1; b <= numberOfTiles; b++) {
        let newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b === numberOfTiles ? "" : b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
        });
        buttonContainer.append(newTile);
    }
    let selectedTile = document.getElementById('btn' + highlighted);
    selectedTile.classList.add("selected");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles = minShuffles + Math.floor(Math.random() * 100 + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function () {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x === 0) direction = highlighted + 1;
            else if (x === 1) direction = highlighted - 1;
            else if (x === 2) direction = highlighted + size;
            else if (x === 3) direction = highlighted - size;

            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

function swap(clicked) {
    if (clicked < 1 || clicked > numberOfTiles) return;

    if (clicked === highlighted + 1 && clicked % size !== 1) {
        setSelected(clicked);
    } else if (clicked === highlighted - 1 && clicked % size !== 0) {
        setSelected(clicked);
    } else if (clicked === highlighted + size || clicked === highlighted - size) {
        setSelected(clicked);
    }

    if (shuffled && checkHasWon()) {
        document.getElementById("winnerOverlay").style.display = "flex";
    }
}

function checkHasWon() {
    for (let b = 1; b <= numberOfTiles; b++) {
        let currentTile = document.getElementById(`btn${b}`);
        let currentTileIndex = currentTile.getAttribute('index');
        let currentTileValue = currentTile.innerHTML || numberOfTiles;
        if (parseInt(currentTileIndex) !== parseInt(currentTileValue)) {
            return false;
        }
    }
    return true;
}

function setSelected(index) {
    let currentTile = document.getElementById(`btn${highlighted}`);
    let currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    let newTile = document.getElementById(`btn${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    newTile.innerHTML = currentTileText;
    newTile.classList.add("selected");
    highlighted = index;
}
