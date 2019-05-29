//game loop - init , draw , update

function init(){
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext('2d');
   //  a method which gives us a pen to draw on 2d canvas
   W = canvas.width;
   H = canvas.height;
   gameover = false;

   food = getrandomfood();
   score = 5; 

    snake = {
        init_length : 5,
        color : "yellow",
        cells : [],
        direction : "right",

        createsnake : function(){
            for(var i = this.init_length-1;i>=0;i--)
            {
                this.cells.push({x : i, y:0});
            }
        },

        drawsnake : function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                
                pen.strokeStyle = "black";
                pen.lineWidth  = 5;
                
                pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                //if we draw on 1,2,3,4-- very small dots ; therefore we map coordinates to 10,20,30,40 
                pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);  
            }
        } ,

        updatesnake : function(){
            //update the head and make it tail to make the snake move

            //current head
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            // //assume snake moving in right
            // //insert at head
            // nextHeadX = headX + 1;
            if(headX===food.x && headY===food.y){
                food = getrandomfood();
                score++;
            }
            else{
                //Pop last cell if food not eaten
                this.cells.pop();
            }
            // //unshift - inset at head
            // this.cells.unshift({x:nextHeadX,y:headY});

            if(this.direction =="right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }
            //Insert the new cell at head/front
            this.cells.unshift({x:nextX,y:nextY})

              //Find out the last coordinate (boundaries)
              var last_x = Math.round(W/10);
              var last_y = Math.round(H/10);
              
              if(this.cells[0].y<0 || this.cells[0].x <0|| this.cells[0].x>last_x || this.cells[0].y>last_y){
                      alert("GameOver");
                      gameover = true;   
              }
        } 
        
    };

    snake.createsnake();
    function KeyPressed(e){
        
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
        
    }
    
    
    document.addEventListener('keydown',KeyPressed);
    
}

function draw(){
   //to make a box move, erase the previous box and then shift the box
   pen.clearRect(0,0,W,H);//removing the entire canvas from origin to W & H
   snake.drawsnake();

   //draw food
   pen.fillStyle = food.color;
    
    pen.fillRect(food.x*10,food.y*10,10,10);
    
    pen.fillStyle = "white";

    //write score
    pen.font = "14px Roboto";
    pen.fillText("Score : "+score,10,10);
    
}

function update(){
   snake.updatesnake();
}

function gameloop()
{
   draw();
   update();

   if(gameover == true){
       clearInterval(f); //to stop setinterval 
   }
}

function getrandomfood(){
    var foodX = Math.round(Math.random()*(W-10)/10);
    var foodY = Math.round(Math.random()*(H-10)/10);
    
    foodColors = ["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);

    var food = {
        x:foodX,
        y:foodY,
        color:foodColors[i],
    };
    
    return food;
}



init();
var f = setInterval(gameloop,100);