class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];
            finish = false;
        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        player.getFinishedPlayers();
        if(player.score >=15&&finish === false){
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();
            finish = true;
        }
        image(back_img, 0, 0, 1000, 800);
        fill("lightgreen")
        textSize(20);
        text("Both players must reach a score 0f 15, whomever scores 15 first will win the game",200,100);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        var textY = 20;
        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;
            if(plr === "player"+player.index){
                fill("yellow");
            }else{
                fill("grey");
            }
            
            textSize(20);
            textY+=60;
            text(allPlayers[plr].name+" : "+allPlayers[plr].score,50,textY);
            if(index === player.index){
                fill("blue");
                textSize(25);
                text(player.name,x-40,y+30);
            }
            if(player.index === 1){
                
            }
            // the name of the player on the basket. 

        }


        // Give movements for the players using arrow keys
        if(keyDown(RIGHT_ARROW)&&finish === false){
            player.distance-=7;
            player.update();
        }
        if(keyDown(LEFT_ARROW)&&finish === false){
            player.distance+=7;
            player.update();
        }
        
        
        if(frameCount%50 === 0){
            var rand = Math.round(random(1,5));
            fruits = createSprite(Math.round(random(100,900)),-60,20,20);
            fruits.velocityY = 6;
            switch(rand){
                case 1: fruits.addImage(fruit1_img);
                break;
                case 2: fruits.addImage(fruit2_img);
                break;
                case 3: fruits.addImage(fruit3_img);
                break;
                case 4: fruits.addImage(fruit4_img);
                break;
                case 5: fruits.addImage(fruit5_img);
                default:
                break;
                
            }
            fruitGroup.add(fruits);
        }
        if(fruitGroup.isTouching(players)){
            fruitGroup[0].destroy();
            player.score+=1;

            player.update();
        }
        if(finishedPlayers === 2){
            this.end();
        }

        
    }

    end(){
        game.update(2);
        clear();
        background("black")
        textSize(50);
        fill("yellow");
        text("Results:",400,50);
        for(var i in allPlayers){
            if(allPlayers[i].rank === 1){
                textSize(35);
                fill("green");
                text(allPlayers[i].name+" Won!",400,200);
            }
            if(allPlayers[i].rank === 2){
                textSize(35);
                fill("red");
                text(allPlayers[i].name+" Lost!",400,250);
            }
                
            
        }
           
       
    }
}
