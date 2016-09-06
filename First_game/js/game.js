var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

//define global var

game.global = {
    score: 0
};

//Add all state

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);


//start 'booth state

game.state.start('boot');