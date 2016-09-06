var loadState = {
    preload: function() {
    
    //add loading lable 
    var loadingLable = game.add.text(game.width/2, 150 , 'loading..', {font: '30px Arial', fill: '#ffffff' });
        
    loadingLable.anchor.setTo(0.5, 0.5 );
        
    var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
    progressBar.anchor.setTo(0.5,0.5);
    game.load.setPreloadSprite(progressBar);

    //Load all our assets
        game.load.image('player', 'assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');

    //Load a new assets
        game.load.image ('background', 'assets/background.png');

},
    create: function(){
        //go to menu state
        game.state.start('menu');
    }
}