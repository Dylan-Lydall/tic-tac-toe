let currentMove = 'X'

document.querySelectorAll('.js-place').forEach((value) => {
  value.addEventListener('click', () => {
    value.innerHTML = currentMove;
    if (currentMove === 'X') {
      document.querySelector('.current-move').innerHTML = `O's turn`;
      checkIfWinner(currentMove);
      currentMove = 'O';
    } else {
      document.querySelector('.current-move').innerHTML = `X's turn`;
      checkIfWinner(currentMove);
      currentMove = 'X';
    }
  });
});

document.querySelector('.js-reset-grid-button').addEventListener('click', () => {
  resetGrid();
});

function resetGrid () {
  document.querySelectorAll('.js-place').forEach((value) => {
    value.innerHTML = '';
  });
}

function checkIfWinner(currentMove) {
  let grid = [['','',''],['','',''],['','','']];
  let isWinner = false;

  //Place grid values in arrays
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[i][j] = document.querySelector(`.js-row${i + 1}-column${j + 1}`).innerHTML;
    }
  }

  function isWinnerFunction(grid) {
    //Check rows for winner
    for (let i = 0; i < 3; i++) {
      let rowWinner = true;
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] !== currentMove) {
          rowWinner = false;
          break;
        }
      }
      if (rowWinner) {
        return true;
      }
    }

    //Check columns for winner
    for (let i = 0; i < 3; i++) {
      let columnWinner = true;
      for (let j = 0; j < 3; j++) {
        if (grid[j][i] !== currentMove) {
          columnWinner = false;
          break;
        }
      }
      if (columnWinner) {
        return true;
      }
    }

    //Check diagonals for winner
    let diagonal1Winner = true;
    for (let i = 0; i < 3; i++) {
      if (grid[i][i] !== currentMove) {
        diagonal1Winner = false;
        break;
      }
    }
    if (diagonal1Winner) {
      return true;
    }

    let diagonal2Winner = true;
    for (let i = 0; i < 3; i++) {
      if (grid[i][2 - i] !== currentMove) {
        diagonal2Winner = false;
        break;
      }
    }
    if (diagonal2Winner) {
      return true;
    }

    return false;
  }

  isWinner = isWinnerFunction(grid);
  if(isWinner) {
    //console.log(`${currentMove} won`);
    displayWinner(currentMove);
  }

  function displayWinner(winner) {
    document.querySelector('.js-display-winner-container').innerHTML = `
    <div class="x-button-container">
        <button class="x-button js-x-button">X</button>
      </div>
      <p class="display-winner js-display-winner">X won</p>
      <div class="ok-button-container">
        <button class="ok-button js-ok-button">OK</button>
      </div>
    `;

    document.querySelector('.js-x-button').addEventListener('click', () => {
      document.querySelector('.js-display-winner-container').innerHTML ='';
    });

    document.querySelector('.js-ok-button').addEventListener('click', () => {
      document.querySelector('.js-display-winner-container').innerHTML ='';
      resetGrid();
    })
  }
}