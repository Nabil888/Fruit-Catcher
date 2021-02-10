class Form{
    constructor(){
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.reset = createButton('Reset');
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.html("FRUIT CATCHER");
        this.title.position(600, 50);
        this.title.style('font-size', '70px');
        this.title.style('color', 'blue');
        this.input.position(750,400);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'yellow');
        this.button.position(750,500);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'green');
        this.button.style('color','white')

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(630,250);
            this.greeting.style('color', 'white');
            this.greeting.style('font-size', '100px');
        });
        this.reset.position(1250,135);
        this.reset.style('background','skyblue');
        this.reset.style('color','blue');
        this.reset.style('border-radius','50px');
        this.reset.mousePressed(()=>{
            game.update(0);
            player.updateCount(0)
            database.ref('/').update({
                players: null,
                finishedPlayers: 0
            })
        })
    }
}