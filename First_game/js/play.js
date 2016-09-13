var playState = {
    
	create: function(){
			this.player = game.add.sprite(game.width/2, game.height/2 ,'player');
			this.player.anchor.setTo(0.5, 0.5);

			game.physics.arcade.enable(this.player);
			this.player.body.gravity.y = 500;

			this.cursor = game.input.keyboard.createCursorKeys();

			//created a new group
			this.walls = game.add.group();
			//Add arcade physics to the whould group
			this.walls.enableBody = true;

			//created 2 walls in the group
			game.add.sprite(0,0, 'wallV', 0, this.walls ); //Left
			game.add.sprite(480,0,'wallV',0,this.walls ); //Right
			//set all walls to be immovable
			this.walls.setAll('body.immoveable', true);

			game.add.sprite(0,0,'wallH',0, this.walls);
			game.add.sprite(300,0,'wallH',0, this.walls);
			game.add.sprite(0,320,'wallH',0, this.walls);
			game.add.sprite(300,320,'wallH',0, this.walls);

			game.add.sprite(-100, 160, 'wallH', 0, this.walls);
			game.add.sprite(400,160, 'wallH', 0 ,this.walls);
        
            var middelTop = game.add.sprite(100, 80,'wallH', 0 , this.walls);
            middelTop.scale.setTo(1.5, 1);
        
            var middleBottom = game.add.sprite(100,240, 'wallH',0, this.walls);
            middleBottom.scale.setTo(1.5,1);
        
            this.walls.setAll('body.immovable', true);
        
        // Coin part
        
            this.coin = game.add.sprite(60, 140, 'coin');
        
        //add arcade physics
            game.physics.arcade.enable(this.coin);
            this.coin.anchor.setTo(0.5, 0.5);
        
        //Showing the score
            this.scoreLabel = game.add.text(30,30, 'score : 0', {
                font: '18px Arial', fill: '#ffffff'
            });
            game.global.score = 0 ;
            game.add.text()
            
        // Create an enemy group with aecade physics
            this.enemies = game.add.group();
            this.enemies.enableBody = true;
        //Created 10 enemies
            this.enemies.createMultiple(10, 'enemy');
        
        //Call 'addEnemy' every 2 seconds : Should created addEnemy function
            game.time.events.loop(2200, this.addEnemy, this);
            game.time.events.loop(1000, this.addEnemy2, this);
        
        //add AUDIO 
            this.jumpSound = game.add.audio('jump');
            this.coinSound = game.add.audio('coin');
            this.deadSound = game.add.audio('dead');
            
            this.music = game.add.audio('music');
            this.music.loop = true;
            this.music.play();
        
        //created RIGHT animation
            this.player.animations.add('right', [1,2] , 8, true);
        //created LEFT animation 
            this.player.animations.add('left', [3,4], 8, true);
        this.emitter = game.add.emitter(0,0,15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150,150);
        this.emitter.setScale(2 , 0,2,0,800);
        this.emitter.gravity = 0;
        
	       },
    
    update: function(){
		
        game.physics.arcade.collide(this.player, this.walls);
        this.movePlayer();
       
              
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null ,this);
        
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null ,this);
   
        if (!this.player.alive){
            return;
        }
        
        if (!this.player.inWorld){
        this.playerDie();
        }  
        
        
	       },

    
    playerDie: function() {
       this.player.kill();
        
        
        this.deadSound.play();
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 800, null, 15);
        
        
        game.time.events.add(1000, this.startMenu, this);
        game.camera.shake(0.02, 300);
        this.music.stop();
            },
    
    
    updateCoinPosition: function() {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y:60},
            {x: 60 , y: 140}, {x:440 , y:140},
            {x: 130 , y: 300}, {x: 370, y: 300},
                ];
        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x == this.coin.x) {
                coinPosition.splice(i,1 );
            }
        }
        
        var newPosition = game.rnd.pick(coinPosition);
        
        this.coin.reset(newPosition.x, newPosition.y);
        
    },
    
    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();
        
        if(!enemy){
            return;
        }
        
        enemy.anchor.setTo(0.5,1);
        enemy.reset(game.width/2 , 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        
    },
    
    addEnemy2: function() {
        var enemy = this.enemies.getFirstDead();
        
        if(!enemy){
            return;
        }
        
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.width/2 , game.height);
        enemy.body.gravity.y = -500;
        enemy.body.velocity.x = -100 * game.rnd.pick([-1, 1]);
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        
    },
    
    
    takeCoin: function(player, coin) {
        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;
        
        this.updateCoinPosition();
        this.coinSound.play();
        this.coin.scale.setTo(0,0);
        
        game.add.tween(this.coin.scale).to({x: 1, y:1 }, 300).start();
        
        game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 100).yoyo(true).start();
    },

    
	movePlayer: function() {

			if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -200;
                this.player.animations.play('left'); //Left animation
			}

			else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 200;
                this.player.animations.play('right'); //Right animation
			}

			else {
				this.player.body.velocity.x = 0;
                
                this.player.animations.stop();
                this.player.frame = 0;
			}

			if (this.cursor.up.isDown && this.player.body.touching.down){
				this.player.body.velocity.y = -320;
			}
        this.jumpSound.play();
	},
    
    startMenu: function() {
            game.state.start('menu');  
    },
};



