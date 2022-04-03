var N_SIZE = 3, // TAILLE DE LA GRILLE
EMPTY = "&nbsp;", // contenu d'une cas vide
boxes = [], // tableau qui contient comme element chaque td de la grille

turn = "X", // Vaut "X" ou "O"
moves = 0; // nombre de mouvements


function init(){
    var board = document.createElement('table');
    for (var i = 0; i < N_SIZE; i++){
        var row = document.createElement('tr');
        board.appendChild(row);
        for(var j = 0; j < N_SIZE; j++){
            var cell = document.createElement('td');
            cell.style.height = 120;
            cell.style.width = 120;
            cell.style.textAlign ='center'; cell.style.verticalAlign = 'center';
            cell.classList.add('col' + j, 'row' + 1);
            if (i == j) cell.classList.add('diagonal0');
            if (j == N_SIZE - i - 1) cell.classList.add('diagonal1');
            cell.addEventListener("click", set);
            row.appendChild(cell);
            boxes.push(cell);
        }
    }
    document.getElementById("tictactoe").appendChild(board);
    startNewGame();
}

function startNewGame(){
    moves = 0;
    turn = "X";
    boxes.forEach(function(square) {square.innerHTML = EMPTY; });
}

function set(){
    if (this.innerHTML !== EMPTY)
        return;
        this.innerHTML = turn;
        moves += 1;
    
    if (win(this)){
        alert('Winner: Player ' + turn);
        startNewGame();
    }
    else if (moves === N_SIZE * N_SIZE){
        alert("Draw");
        startNewGame();
    }
    else{
        if (turn === "X") turn = "O";
        else turn = "X";
        document.getElementById("turn").textContent = "Player" + turn;
    }
}


function win(clicked){
    var classes = clicked.classList;
    for (var i = 0; i < classes.legth; i++){
        var testClass = '.' + classes.item(i);
        var items = contains ('#tictactoe ' + testClass, turn);
        if (items.length == N_SIZE){
            return true;
        }
    }

    return false;
}

function contains(selector, text){
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
        return RegExp(text).test(element.innerHTML);
    });
}