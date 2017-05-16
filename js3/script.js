var graficoArea = document.createElement("div");
graficoArea.setAttribute("id", "graficoArea");
document.body.appendChild(graficoArea);

function gerarGrafico(){
  var largura = document.getElementById("largura").value;
  var alturas = document.getElementsByClassName("altura");
  var img = document.getElementsByClassName("img");

  //limpa gráfico anterior
  while (graficoArea.firstChild){
    graficoArea.removeChild(graficoArea.firstChild);
  }

  //desenha cada barra por altura
  for(i = 0; i < alturas.length; i++){
      desenharBarra(alturas[i].value, largura);
  }

  //achar maior altura entre todas as barras
  var maiorAltura = parseInt(img[0].getAttribute("height"));
  var maiorIndex = 0;
  for(i = 0; i < img.length; i++){
      var candidato = parseInt(img[i].getAttribute("height"));
      if(candidato > maiorAltura){
        maiorIndex = i;
      }
  }

  //acertar a posição usando como referencia a maior barra
  img[maiorIndex].style.cssText("position : fixed");
}

function desenharBarra(altura, largura){
  var img = new Image();
  img.setAttribute("src", "red.gif");
  img.setAttribute("height", altura);
  img.setAttribute("width", largura);
  img.setAttribute("class", "img")
  graficoArea.appendChild(img);
}
