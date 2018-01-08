window.onload = function () {
    var c = document.getElementById("canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var ctx = c.getContext("2d");
    var x = 40;
    var y = 50;
    var vx = 1;
    var vy = 1;
    var game = {
        player1Score: 0,
        player2Score: 0,
        remainingTime: 60000,
        startTime: undefined,
        endTime: undefined,
        init: function(){
            player1Score = 0;
            player2Score = 0;
            this.startTime = new Date();
            this.endTime = new Date(this.startTime.getTime() + 60*1000);
            this.remainingTime = this.endTime.getTime() - this.startTime.getTime()
        },
        getRemainingTime: function(){
        var currentTime = new Date();
        this.remainingTime = this.endTime.getTime() - currentTime;
        },
        endGameCheck: function(){
            if (this.remainingTime<=0){
                this.isOver = true; 
            }     
        },
        updateUI: function(){
            ctx.font = "30px Helvetica";
            ctx.fillStyle = player1.color;
            ctx.fillText( "Player 1: " + this.player1Score, 10,10+30 );
            ctx.fillStyle = player2.color;
            ctx.fillText( "Player 2: " + this.player2Score, 10,10+60 );
            ctx.fillStyle = "White";
            ctx.fillText( "T-Minus: " + Math.floor(this.remainingTime/1000), c.width/2,10+30 );
        }
    }
    var background = {
        color: "#000000", 
        width: c.width,
        height: c.height,
        x: 0,
        y: 0,
        render: function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    class Controller {
        moveUp;
        moveDown;
        moveLeft;
        moveRight;
        constructor (upKey, downKey, leftKey, rightKey){
            this.moveUp = upKey;
            this.moveDown = downKey;
            this.moveLeft = leftKey;
            this.moveRight = rightKey;
        }
    }
    var player1Controls = new Controller("w","s","a","d")   
    var player2Controls = new Controller("ArrowUp","ArrowDown","ArrowLeft","ArrowRight")
    class Player {
        color;
        width;
        height;
        x;
        y;
        controls; 
        constructor (color, width, height, x, y, controller){
            this.color = color;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.controls = controller; 
        }
        render (){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        updateInput (){
            if(inputState[this.controls.moveRight] == true){
                this.x += vx
            }
            if(inputState[this.controls.moveUp] == true){
                this.y -= vy
            }
            if(inputState[this.controls.moveLeft] == true){
                this.x += -vx
            }
            if(inputState[this.controls.moveDown] == true){
                this.y += vy
            }
        }
        init (){
            this.x = c.width/2 - this.width/2;
            this.y = c.height/2 - this.height/2;  
            console.log(this.x, this.y);
        }
    }
    var player1 =  new Player("#ff0000",100, 300,0,0,player1Controls);
    // var player2 =  new Player("#0000ff",100, 300,0,0,player2Controls);
    // {
    //     color: "#ff0000",
    //     width: 100,
    //     height: 300,
    //     x: 0,
    //     y: 0, 
    //     render: function(){
    //         ctx.fillStyle = this.color;
    //         ctx.fillRect(this.x, this.y, this.width, this.height)
    //     }, 
    //     updateInput: function(){
    //         if(inputState.d == true){
    //             this.x += vx
    //         }
    //         if(inputState.w == true){
    //             this.y -= vy
    //         }
    //         if(inputState.a == true){
    //             this.x += -vx
    //         }
    //         if(inputState.s == true){
    //             this.y += vy
    //         }
    //     },  
    //     init: function(){
    //         this.x = c.width/2 - this.width/2;
    //         this.y = c.height/2 - this.height/2; 
    //     }, 
    // }
    // var player2 = {
    //     color: "#0000ff",
    //     width: 100,
    //     height: 300,
    //     x: 0,
    //     y: 0,
    //     render: function(){
    //         ctx.fillStyle = this.color;
    //         ctx.fillRect(this.x, this.y, this.width, this.height)
    //     },
    //     updateInput: function(){
    //         if(inputState.ArrowRight == true){
    //             this.x += vx
    //         }
    //         if(inputState.ArrowUp == true){
    //             this.y -= vy
    //         }
    //         if(inputState.ArrowLeft == true){
    //             this.x += -vx
    //         }
    //         if(inputState.ArrowDown == true){
    //             this.y += vy
    //         }
    //     }, 
    //     init: function(){
    //         this.x = c.width/2 + this.width/2;
    //         this.y = c.height/2 - this.height/2; 
    //         console.log(this.x, this.y);
    //     }
    // }
    var inputState = {
        w:false, 
        a:false, 
        s:false, 
        d:false, 
    }
    // ctx.beginPath();
    // ctx.arc(95, 50, 40,0,2*Math.PI);
    // ctx.stroke();
    // var img = document.getElementById("picture")
    // ctx.drawImage(img, 0, 0);
    // var width = window.innerWidth;
    // var height = window.innerHeight;
    // ctx.fillRect(0, 0, width, height)
    // ctx.fillStyle = "#ff0000"
    // ctx.fillRect(56, 67, 100, 300)
    // ctx.clearRect(0,0,c.width,c.height)
    function init() {
        game.init();
        player1.init();
        player2.init();
        window.addEventListener("keydown", function(event){
            inputState[event.key] = true;
        });
        window.addEventListener("keyup", function(event){
            inputState[event.key] = false;
        });
        window.requestAnimationFrame(update)
    }
    function update() {
        player1.updateInput();
        player2.updateInput();
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        if (player1.y+player1.height>c.height-50){
            game.player2Score += 1;
        }
        if (player2.y+player2.height>c.height-50){
            game.player1Score += 1;
        }
        var width = window.innerWidth;
        var height = window.innerHeight;
        background.render(); 
        player1.render();
        player2.render();
        game.getRemainingTime();
        game.endGameCheck();
        if (game.isOver){
            ctx.font = "100px Helvetica";
            ctx.fillStyle = "Yellow";
            ctx.textAlign = "center";
            ctx.fillText ("Game Over", c.width/2, c.height/2);

        }
        console.log(ctx.width);
        game.updateUI();
        window.requestAnimationFrame(update)
    }
    init()
}