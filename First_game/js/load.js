var loadState = {
    preload: function() {
    
    //add loading lable 
    var loadingLable = game.add.text(game.width/2, 150 , 'loading..', {font: '30px Arial', fill: '#ffffff' });
        
    loadingLable.anchor.setTo(0.5, 0.5 );
        
    var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
    progressBar.anchor.setTo(0.5,0.5);
    game.load.setPreloadSprite(progressBar);

    //Load all our assets
        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');

    //Load a new assets
        game.load.image ('background', 'assets/background.png');
        
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        game.load.image('jumpButton', 'assets/jumpButton.png');
        game.load.image('rightButton', 'assets/rightButton.png');
        game.load.image('leftButton', 'assets/leftButton.png');

        //Sound when the player jump
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        
        //sound when taked the coin
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        
        //sound when player die
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        
        //Load BG sound
        game.load.audio('music', [ 'assets/music.mp3']);
        
        //Pixel
        game.load.image('pixel', 'assets/pixel.png');
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
},
    create: function(){
        //go to menu state
        game.state.start('menu');
    },
}