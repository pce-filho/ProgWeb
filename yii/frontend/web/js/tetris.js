(function () {
  var tabuleiro = document.querySelector("#tabuleiro");
  var fps = 1;
  var tableProxPeca = tableGenerator(4, 4);
  var mainTable = tableGenerator(16, 10);
  var formatoPeca = randomProxPeca();
  var pontos = 0;

  const player = {
    x: 4, y: 0,
    peca: preencherGrid(formatoPeca)
  }

  function init(){
    tabuleiro.appendChild(mainTable);
    gameLoop = setInterval(loop, 1000/fps);
  }

  function loop(){
    desenhaPeca(mainTable, player.peca, player.x, player.y, 0);
    player.y++;
    if(colisao()){
      //volta para y anterior da colisão
      desenhaPeca(mainTable, player.peca, player.x, player.y - 1, 1);
      score();
      escrevePontuacao();
      pecaGenerator();
    }
  }

  function escrevePontuacao(){
    document.querySelector("#informacoes").innerHTML = pontos;
  }

  //shift peca ACIMA da linha onde tudo foi igual a 1
  function shiftPecas(limite) {
    for(var i = limite - 1; i >= 0; i--){
      for(var j = 0; j < mainTable.rows[0].cells.length; j++){
          if (mainTable.rows[i].cells[j].innerHTML == "1"){
            mainTable.rows[i].cells[j].innerHTML = "0";
            mainTable.rows[i + 1].cells[j].style.backgroundColor = mainTable.rows[i].cells[j].style.backgroundColor;
            mainTable.rows[i].cells[j].style.backgroundColor = "";
            mainTable.rows[i + 1].cells[j].innerHTML = "1";
          }
      }
    }
  }

  function score(){
    var linha = booleanRowOne();
    if(linha != -1){
      for(var i = 0 ; i < mainTable.rows[linha].cells.length; i++){
        var cell = mainTable.rows[linha].cells[i];
        cell.innerHTML = 0;
        cell.style.backgroundColor = "";
      }
      shiftPecas(linha);
      score();
    }
  }

  function booleanRowOne(){
    for(var i = mainTable.rows.length - 1; i >= 0; i--){
      var fill = 0;
      for(var j = mainTable.rows[0].cells.length - 1; j >= 0; j--){
        var cell = mainTable.rows[i].cells[j];
        if(cell.innerHTML != 0){
            fill += parseInt(cell.innerHTML);
        }
      }
      if(fill == 10){
          pontos = pontos + 100;
          return i;
      }
    }
    return -1;
  }

  function pecaGenerator(){
    formatoPeca = randomProxPeca();
    player.x = 4;
    player.y = 0;
    player.peca = preencherGrid(formatoPeca);
    if(colisao()){
      janelaEnviaBanco();
      pontos = 0;
      escrevePontuacao();
      zeraTable(mainTable);
    }
  }

  function janelaEnviaBanco() {
    if (confirm("FIM DE JOGO - Deseja salvar sua pontuação?") == true) {
        //codidgkdjflgdkf
    }
  }

  function zeraTable(table){
    for(var i = 0; i < table.rows.length; i++){
      for(var j = 0; j < table.rows[0].cells.length; j++){
        var cell = table.rows[i].cells[j];
          cell.innerHTML = "0";
          cell.style.backgroundColor = "";
      }
    }
  }

  addEventListener("keydown", function(e) {
        if (e.key == "ArrowLeft") {
            player.x--;
            if(colisao()){
              player.x++;
            }
        } else if (e.key == "ArrowRight") {
            player.x++;
            if(colisao()){
              player.x--;
            }
        } else if (e.key == "ArrowDown"){
          player.y++;
          if(colisao()){
            player.y--;
          }
        } else if (e.key == "ArrowUp"){
            giro(0);
            if(colisao()){
              giro(1);
            }
        }
        desenhaPeca(mainTable, player.peca, player.x, player.y, 0);
  });

  function giro(colisao){
    if(formatoPeca != "o"){
      if(colisao == 0){
        if(formatoPeca.charAt(1) == 0){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "1");
        } else if (formatoPeca.charAt(1) == 1){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "2");
        } else if (formatoPeca.charAt(1) == 2){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "3");
        } else {
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "0");
        }
      } else {
        if(formatoPeca.charAt(1) == 0){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "3");
        } else if (formatoPeca.charAt(1) == 3){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "2");
        } else if (formatoPeca.charAt(1) == 2){
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "1");
        } else {
          formatoPeca = formatoPeca.replace(formatoPeca.charAt(1), "0");
        }
      }
      player.peca = preencherGrid(formatoPeca);
    }

  }

  function colisao(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(player.peca[i][j] != 0 &&
          (!mainTable.rows[i + player.y] || !mainTable.rows[0].cells[j + player.x] || !mainTable.rows[mainTable.rows.length - 1].cells[j + player.x] ||
            mainTable.rows[i + player.y].cells[j + player.x].innerHTML != 0)){
          return true;

        }
      }
    }
    return false;
  }

  function apagaRastro() {
    for(var i = 0; i < mainTable.rows.length; i++){
      for(var j = 0; j < mainTable.rows[0].cells.length; j++){
        var cell = mainTable.rows[i].cells[j];
        if(cell.innerHTML != 1){
          cell.innerHTML = "0";
          cell.style.backgroundColor = "";
        }
      }
    }
  }

  function tableGenerator(r, c){
    var table = document.createElement("table");
    for(var i = 0; i < r; i++){
      var row = document.createElement("tr");
      for(var j = 0; j < c; j++){
        var cell = document.createElement("td");
          cell.innerHTML = "0";
          row.appendChild(cell);
      }
      table.appendChild(row);
    }
    return table;
  }

  function randomProxPeca(){
    var letras = ["i0", "j0", "l0", "o", "s0", "t0", "z0"];
    var proximaPeca = letras[getRandomInt(0, letras.length - 1)];
    return proximaPeca;
  }

  function desenhaPeca(table, grid, x, y, merge){
    apagaRastro();
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if (grid[i][j] == 1){
          var cell = table.rows[i + y].cells[j + x];
          if(formatoPeca.indexOf("i") > -1){
            cell.style.backgroundColor = "cyan";
          } else if(formatoPeca.indexOf("j") > -1){
            cell.style.backgroundColor = "blue";
          } else if(formatoPeca.indexOf("l") > -1){
            cell.style.backgroundColor = "orange";
          } else if(formatoPeca.indexOf("o") > -1){
            cell.style.backgroundColor = "yellow";
          } else if(formatoPeca.indexOf("s") > -1){
            cell.style.backgroundColor = "green";
          } else if(formatoPeca.indexOf("t") > -1){
            cell.style.backgroundColor = "purple";
          } else if(formatoPeca.indexOf("z") > -1){
            cell.style.backgroundColor = "red";
          }
          if(merge == 1){
            cell.innerHTML = "1";
          }
        }
      }
    }
  }

  function gerarMatrizVazia(n){
    var arr = [];
    for(var i = 0; i < n; i++){
      arr[i] = [];
      for(var j = 0; j < n; j++){
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  function preencherGrid(letra){
    var grid = gerarMatrizVazia(4);
    grid[1][1] = 1;

    switch (letra) {
      case "i0":
        for (var i = 0; i < grid.length; i++) {
          grid[i][1] = 1;
        }
        break;
      case "i1":
        for (var i = 0; i < grid.length; i++) {
          grid[1][i] = 1;
        }
          break;
      case "i2":
        grid[1][1] = 0;
        for (var i = 0; i < grid.length; i++) {
          grid[i][2] = 1;
        }
        break;
      case "i3":
        grid[1][1] = 0;
        for (var i = 0; i < grid.length; i++) {
          grid[2][i] = 1;
        }
        break;
      case "j0":
        grid[0][1] = 1; grid[2][1] = 1; grid[2][0] = 1;
        break;
      case "j1":
        grid[0][0] = 1; grid[1][0] = 1; grid[1][2] = 1;
        break;
      case "j2":
        grid[0][1] = 1; grid[0][2] = 1; grid[2][1] = 1;
        break;
      case "j3":
        grid[1][0] = 1; grid[1][2] = 1; grid[2][2] = 1;
        break;
      case "l0":
        grid[0][1] = 1; grid[2][1] = 1; grid[2][2] = 1;
        break;
      case "l1":
        grid[2][0] = 1; grid[1][0] = 1; grid[1][2] = 1;
        break;
      case "l2":
        grid[0][0] = 1; grid[0][1] = 1; grid[2][1] = 1;
        break;
      case "l3":
        grid[1][0] = 1; grid[1][2] = 1; grid[0][2] = 1;
        break;
      case "o":
        grid[0][0] = 1; grid[0][1] = 1; grid[1][0] = 1;
        break;
      case "s0":
        grid[2][0] = 1; grid[2][1] = 1; grid[1][2] = 1;
        break;
      case "s1":
        grid[0][0] = 1; grid[1][0] = 1; grid[2][1] = 1;
        break;
      case "s2":
        grid[1][0] = 1; grid[0][1] = 1; grid[0][2] = 1;
        break;
      case "s3":
        grid[0][1] = 1; grid[1][2] = 1; grid[2][2] = 1;
        break;
      case "t0":
        grid[1][0] = 1; grid[2][1] = 1; grid[1][2] = 1;
        break;
      case "t1":
        grid[1][0] = 1; grid[0][1] = 1; grid[2][1] = 1;
        break;
      case "t2":
        grid[1][0] = 1; grid[0][1] = 1; grid[1][2] = 1;
        break;
      case "t3":
        grid[0][1] = 1; grid[2][1] = 1; grid[1][2] = 1;
        break;
      case "z0":
        grid[1][0] = 1; grid[2][1] = 1; grid[2][2] = 1;
        break;
      case "z1":
        grid[1][0] = 1; grid[2][0] = 1; grid[0][1] = 1;
        break;
      case "z2":
        grid[0][0] = 1; grid[0][1] = 1; grid[1][2] = 1;
        break;
      case "z3":
        grid[0][2] = 1; grid[1][2] = 1; grid[2][1] = 1;
        break;
      default:
      //limpa a matriz
        for(var i = 0; i < grid.length; i++){
          for(var j = 0; j < grid.length; j++){
            grid[i][j] = 0;
          }
        }
    }
    return grid;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  init();
})();
