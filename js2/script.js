function calcula(){
    raio = document.getElementById("textRaio").value;
    area = document.getElementById("textArea");
    circ = document.getElementById("textCirc");

    area.value = (Math.PI * Math.pow(raio, 2)).toFixed(2);
    circ.value = (2 * Math.PI * raio).toFixed(2);
}
