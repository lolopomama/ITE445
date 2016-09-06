//Have 2 function not have preloade state there doing some configureation and having own start function

var menuState = {
    create: function(){
        game.add.image(0,0 , 'background');
        
        //Display the name of the game
        
        var nameLabel = game.add.text(game.width/2, 80, 'Super Coin Box', {font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        //Show the score at the senter of the screen
        
        var scoreLabel = game.add.text(game.width/2, game.height/2, 'score: ' + game.global.score, {font:'25px Arial', fill: '#ffffff'});
        scoreLabel.anchor.setTo(0.5,0.5);
        
        //Explain how to start the game
        var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrorw key to start ');
        startLabel.anchor.setTo(0.5,0.5);
        
        //create a new phaser keyboard are invisible 
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
        
    },
    
start: function() {
    //Starting the actual game
        game.state.start('play');
    }
}