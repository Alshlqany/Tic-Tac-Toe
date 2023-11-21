const selectPlayer = document.querySelector(".select-box"),
  selectX = document.querySelector(".player-X"),
  selectO = document.querySelector(".player-O"),
  playBoard = document.querySelector(".play-board"),
  players = document.querySelector(".players"),
  cells = document.querySelectorAll(".play-area div"),
  resultBox = document.querySelector(".result-box");

let player = "X",
  count = 0;

selectX.addEventListener("click", select);
selectO.addEventListener("click", select);

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => {
    count++;
    cells[i].innerHTML = player;
    cells[i].style.pointerEvents = "none"; 
    players.classList.toggle("o");
    if (
      // Check if the player wins the game
      check(cells[0], cells[1], cells[2], player) ||
      check(cells[3], cells[4], cells[5], player) ||
      check(cells[6], cells[7], cells[8], player) ||
      check(cells[0], cells[4], cells[8], player) ||
      check(cells[2], cells[4], cells[6], player) ||
      check(cells[0], cells[3], cells[6], player) ||
      check(cells[1], cells[4], cells[7], player) ||
      check(cells[2], cells[5], cells[8], player)
    ) {
      finish(player);
    } else if (count === 9) {
      // Check if there is no empty cell
      finish("Draw");
    }
    player = player === "X" ? "O" : "X";
  });
}

function select() {
  player = this.id;
  selectPlayer.classList.remove("show");
  playBoard.classList.add("show");
  if (player === "O") {
    players.classList.add("o");
  }
}

function check(c1, c2, c3, val) {
  if (c1.innerHTML === val && c2.innerHTML === val && c3.innerHTML === val) {
    c1.style.backgroundColor = "#2e00ff";
    c2.style.backgroundColor = "#2e00ff";
    c3.style.backgroundColor = "#2e00ff";
    return true;
  }
  return false;
}

function finish(winner) {
  // Wait 500 mili sec before showing the winner
  setTimeout(() => {
    playBoard.classList.remove("show");
    resultBox.classList.add("show");
    cells.forEach((e) => {
      e.innerHTML = "";
      e.removeAttribute("style");
      count = 0;
    });

    if (text === "Draw")
      resultBox.innerHTML = `<div class="text">Draw</div>
  <button onclick=replay()>Replay</button>`;
    else {
      resultBox.innerHTML = `<div class="text">Player <span>${winner}</span> won The Game!</div>
    <button onclick=replay()>Replay</button>`;
    }
  }, 500);
}

function replay() {
  resultBox.classList.remove("show");
  selectPlayer.classList.add("show");
}
