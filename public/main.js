window.onload = function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var time = new Date();
    var x = 40;
    var y = 50;
    var vx = 1;
    var vy = 1;
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
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = "#ff0000"
        ctx.fillRect(x, y, 100, 300)
        if(inputState.d == true){
            x += vx
        }
        if(inputState.w == true){
            y -= vy
        }
        if(inputState.a == true){
            x += -vx
        }
        if(inputState.s == true){
            y += vy
        }
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
        window.requestAnimationFrame(update)
    }
    init()
}