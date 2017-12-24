window.onload = function () {
    var c = document.getElementById("canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var ctx = c.getContext("2d");
    var time = new Date();
    var x = 40;
    var y = 50;
    var vx = 1;
    var vy = 1;
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
    var player1 = {
        color: "#ff0000",
        width: 100,
        height: 300,
        x: 0,
        y: 0,
        render: function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }, 
        updateInput: function(){
            if(inputState.d == true){
                this.x += vx
            }
            if(inputState.w == true){
                this.y -= vy
            }
            if(inputState.a == true){
                this.x += -vx
            }
            if(inputState.s == true){
                this.y += vy
            }
        },   
    }
    var player2 = {
        color: "#0000ff",
        width: 100,
        height: 300,
        x: 0,
        y: 0,
        render: function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        },
        updateInput: function(){
            if(inputState.ArrowRight == true){
                this.x += vx
            }
            if(inputState.ArrowUp == true){
                this.y -= vy
            }
            if(inputState.ArrowLeft == true){
                this.x += -vx
            }
            if(inputState.ArrowDown == true){
                this.y += vy
            }
        }, 
    }
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
        window.addEventListener("keydown", function(event){
            inputState[event.key] = true;
        });
        window.addEventListener("keyup", function(event){
            inputState[event.key] = false;
        });
        window.requestAnimationFrame(update)
    }
    function update() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        var width = window.innerWidth;
        var height = window.innerHeight;
        background.render(); 
        player1.render();
        player2.render();
        player1.updateInput();
        player2.updateInput();
        console.log(ctx.width);
        // if (x + 100 + vx > canvas.width){
        //     vx *= -1
        // }
        // if (x + vx < 0){
        //     vx *= -1
        // }
        // if (y + 100 + vy > canvas.height){
        //     vy *= -1
        // }
        // if (y + vy < 0){
        //     vy *= -1
        // }
        ctx.font = "30px Helvetica";
        ctx.fillStyle = "Red";
        ctx.fillText( "Player 1: 0", 10,10+30 );
        ctx.fillStyle = "White";
        ctx.fillText( "Player 2: 0", 10,10+60 );
        window.requestAnimationFrame(update)
    }
    init()
}