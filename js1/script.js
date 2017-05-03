for (i = 1; i <= 10; i++){
document.writeln("<table>");
  document.writeln("<th colspan=2> Produtos de " + i + "</th>");
  for (j = 1; j <= 10; j++){
    document.writeln("<tr>");
    document.writeln("<td>");
    document.writeln(i + "x" + j);
    document.writeln("</td>");
    document.writeln("<td>");
    document.writeln(i * j);
    document.writeln("</td>");
    document.writeln("</tr>")
  }
  document.writeln("</table>");
}
