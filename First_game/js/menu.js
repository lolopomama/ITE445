//Have 2 function not have preloade state there doing some configureation and having own start function

var menuState = {
    create: function(){
        game.add.image(0,0 , 'background');
        
        //Display the name of the game
        
        var nameLabel = game.add.text(game.width/2, -50, 'Super Coin Box', {font: '80px Geo', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(nameLabel).to({y: 80}, 1500).easing(Phaser.Easing.Bounce.Out).start();
        
        
        //Show the score at the senter of the screen
        //adding High score
        
        var text = 'score' + game.global.score + '\nbest score: ' + localStorage.getItem('bestscore');
        
        var scoreLabel = game.add.text(game.width/2, game.height/2, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
        scoreLabel.anchor.setTo(0.5,0.5);
        
        //Explain how to start the game
        var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrorw key to start ');
        startLabel.anchor.setTo(0.5,0.5);
        
        game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2 }, 1000 ).to({angle:0}, 500).loop().start();
        
        //create a new phaser keyboard are invisible 
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
        
        if(!localStorage.getItem('bestscore')){
            localStorage.setItem('bestscore', 0);
        }
        if(game.global.score > localStorage.getItem('bestscore')){
            
            localStorage.setItem('bestScore', game.global.score);
        }
        
        this.muteButton = game.add.button(20 , 20 ,'mute', this.toggleSound, this );
    },
    
toggleSound: function() {
        game.sound.mute = !game.sound.mute;
        
        this.muteButton.frame = game.sound.mute ? 1:0 ;
    
//            if (game.sound.mute) {
//                    this.muteButton.frame = 1;
//            }else {
//                    this.muteButton.frame = 0;
//            }
    },
    
start: function() {
    //Starting the actual game
        game.state.start('play');
    }
}