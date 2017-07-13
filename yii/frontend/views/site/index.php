<?php
/* @var $this yii\web\View */
use yii\helpers\Html;
$this->title = 'Jogo Tetris';
$url = '@web/img/teste.png';
$urlTetris = '@web/Tetris/index.html';
$options = [
    'id' => 'logo',
];

echo Html::img($url, $options);
?>

<div class="site-index">

    <div class="jumbotron">
        <p>O Instituto de Computação (IComp), antigo Departamento de Ciência da Computação (DCC),
          é um instituto acadêmico que agrega os professores da área de computação.
          Como todo instituto acadêmico o IComp atua no ensino, pesquisa e extensão,
          além de desempenhar atividades administrativas.</p>
        </p>
        <a class="btn btn-lg btn-success" href="index.php?r=jogada/play">Iniciar Jogo!</a></p>
    </div>
</div>
