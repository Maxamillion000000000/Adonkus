window.onload = function () {
    var c = document.getElementById("canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var boxes = [];
    var ctx = c.getContext("2d");
    var x = 40;
    var y = 50;
    var vx = 3;
    var vy = 3;
    var game = {
        player1Score: 0,
        player2Score: 0,
        remainingTime: 60000,
        startTime: undefined,
        endTime: undefined,
        init: function () {
            player1Score = 0;
            player2Score = 0;
            this.startTime = new Date();
            this.endTime = new Date(this.startTime.getTime() + 60 * 1000);
            this.remainingTime = this.endTime.getTime() - this.startTime.getTime()
        },
        getRemainingTime: function () {
            var currentTime = new Date();
            this.remainingTime = this.endTime.getTime() - currentTime;
        },
        endGameCheck: function () {
            if (this.remainingTime <= 0) {
                this.isOver = true;
            }
        },
        loadStage: function () {

        },
        updateUI: function () {
            ctx.font = "30px Helvetica";
            ctx.fillStyle = player1.color;
            ctx.fillText("Player 1: " + this.player1Score, 10, 10 + 30);
            ctx.fillStyle = player2.color;
            ctx.fillText("Player 2: " + this.player2Score, 10, 10 + 60);
            ctx.fillStyle = "White";
            ctx.fillText("T-Minus: " + Math.floor(this.remainingTime / 1000), c.width / 2, 10 + 30);
        }
    }
    var background = {
        color: "#000000",
        width: c.width,
        height: c.height,
        x: 0,
        y: 0,
        render: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    class Vector2d {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Box2d {
        constructor(topLeft, bottomRight) {
            this.topLeft = topLeft;
            this.bottomRight = bottomRight;
            this.isColliding = false;
            boxes.push(this);
        }
        containsPoint(point) {
            var isColliding = false;
            if (point.x >= this.topLeft.x && point.x <= this.bottomRight.x && point.y >= this.topLeft.y && point.y <= this.bottomRight.y) { //doublecheck logic
                isColliding = true
            }
            console.log("contains point( " + point.x + ", " + point.y + ") " + isColliding)
            return isColliding;
        }

        overlapsBox() {
            var overlapsAny = false;
            var index = boxes.indexOf(this);
            for (var i = 0; i < boxes.length; i++) {
                if(index === i) continue;
                var box = boxes[i];
                if (box !== this &&
                    box.bottomRight.x >= this.topLeft.x &&
                    box.topLeft.x <= this.bottomRight.x &&
                    box.bottomRight.y >= this.topLeft.y &&
                    box.topLeft.y <= this.bottomRight.y) {   //always true?
                        overlapsAny = true;
                    }
            }
            this.isColliding = overlapsAny;
        }
    }
    var stage = {
        color: "#057905",
        width: c.width - 100,
        height: 275,
        x: 50,
        y: c.height - 275,
        debugColor: "yellow",
        render: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        },
        updateBounds: function () {
            var topLeft = new Vector2d(this.x, this.y)
            var bottomRight = new Vector2d(this.x + this.width, this.y + this.height)
            this.bounds = new Box2d(topLeft, bottomRight)
        }
    }
    class Controller {
        constructor(upKey, downKey, leftKey, rightKey) {
            this.moveUp = upKey;
            this.moveDown = downKey;
            this.moveLeft = leftKey;
            this.moveRight = rightKey;
        }
    }
    var player1Controls = new Controller("w", "s", "a", "d")
    var player2Controls = new Controller("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight")
    class Player {
        constructor(color, width, height, x, y, controller, ) {
            this.color = color;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.controls = controller;
            this.updateBounds();
            this.debugColor = "#ffff00";
            this.collisionHelper = false;
        }
        updateBounds() {
            var topLeft = new Vector2d(this.x, this.y)
            var bottomRight = new Vector2d(this.x + this.width, this.y + this.height)
            this.bounds = new Box2d(topLeft, bottomRight)
        }
        render() {
            if (this.bounds.isColliding && this.collisionHelper) {
                ctx.fillStyle = "Yellow"; //commenting out turns boxes green
            }
            else {
                ctx.fillStyle = this.color;
            }
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        updateInput() {
            if (inputState[this.controls.moveRight] == true) {
                this.x += vx
            }
            if (inputState[this.controls.moveUp] == true) {
                this.y -= vy
            }
            if (inputState[this.controls.moveLeft] == true) {
                this.x += -vx
            }
            if (inputState[this.controls.moveDown] == true) {
                this.y += vy
            }
        }
        init() {
            this.x = c.width / 2 - this.width / 2;
            this.y = c.height / 2 - this.height / 2;
            console.log(this.x, this.y);
        }
        setCollisionHelper(isOn) {
            this.collisionHelper = isOn; //commenting this out breaks the game
        }
    }
    var characterDimensions = new Vector2d(100, 300);
    var spawnLocations = [
        new Vector2d(c.width / 2 - characterDimensions.x / 2, c.height / 2 - characterDimensions.y / 2),
        new Vector2d(c.width / 2 + characterDimensions.x / 2, c.height / 2 - characterDimensions.y / 2),
    ]
    var player1;
    var player2;
    var inputState = {
        w: false,
        a: false,
        s: false,
        d: false,
    }
    function init() {
        game.init();
        player1 = new Player("#ff0000",
            characterDimensions.x,
            characterDimensions.y,
            spawnLocations[0].x,
            spawnLocations[0].y,
            player1Controls);
        player2 = new Player("#0000ff",
            characterDimensions.x,
            characterDimensions.y,
            spawnLocations[1].x,
            spawnLocations[1].y,
            player2Controls);
        player1.setCollisionHelper(true);
        player2.setCollisionHelper(true);
        window.addEventListener("keydown", function (event) {
            inputState[event.key] = true;
        });
        window.addEventListener("keyup", function (event) {
            inputState[event.key] = false;
        });
        window.requestAnimationFrame(update)
    }
    function update() {
        player1.updateInput();
        player2.updateInput();
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        if (player1.y + player1.height > c.height - 50) {
            game.player2Score += 1;
        }
        if (player2.y + player2.height > c.height - 50) {
            game.player1Score += 1;
        }
        stage.updateBounds();
        player1.updateBounds();
        player2.updateBounds();
        player1.bounds.overlapsBox(player2.bounds);
        player1.bounds.overlapsBox(stage.bounds);
        player2.bounds.overlapsBox(player1.bounds);
        player2.bounds.overlapsBox(stage.bounds);
        var width = window.innerWidth;
        var height = window.innerHeight;
        background.render();
        stage.render();
        player1.render();
        player2.render();
        game.getRemainingTime();
        game.endGameCheck();
        if (game.isOver) {
            ctx.font = "100px Helvetica";
            ctx.fillStyle = "Yellow";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", c.width / 2, c.height / 2);

        }
        console.log(c.width);
        game.updateUI();
        window.requestAnimationFrame(update)
    }
    init()
}