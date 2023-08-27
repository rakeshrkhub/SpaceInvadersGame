const grid=document.querySelector('.grid');
const resultDisplay=document.querySelector('.results');
let currentShooterIndex=202;
let width=15;
let direction =1;
let invadersId;
let isGoing=true;
let aliensRemoved=[];
let results=0;

for(let i=0;i<225;i++){
    //creating 225 div into div of grid class
    const square=document.createElement('div');
    grid.appendChild(square);
}

const squares=Array.from(document.querySelectorAll('.grid div'));
const alienInvaders=[
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

//To draw alienInvaders
function draw(){
    //adding class(it has css that is background-color and border radius)
    // to alienInvaders array
    for(let i=0;i<alienInvaders.length;i++){
        //if aliensRemoved array does not include this index then draw that invaders
        if(!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader');
        }
    }
}

draw();

//To remove alienInvaders
function remove(){
    //adding class(it has css that is background-color and border radius)
    // to alienInvaders array
    for(let i=0;i<alienInvaders.length;i++){
        squares[alienInvaders[i]].classList.remove('invader');
    }
}

squares[currentShooterIndex].classList.add('shooter');

//To move the shooter left and right we have used cases here
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width !==0)
                currentShooterIndex -=1;
            break;
        case 'ArrowRight':
            if(currentShooterIndex % width < width-1)
                currentShooterIndex +=1;
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

function moveInvaders(){
    const leftEdge=alienInvaders[0] %width ===0
    const rightEdge=alienInvaders[alienInvaders.length - 1] % width ===width-1
    remove();

    if(rightEdge && isGoing){
        for(let i=0;i< alienInvaders.length;i++){
            alienInvaders[i] += width+1;
            direction = -1;
            isGoing=false;
        }
    }

    if(leftEdge && !isGoing){
        for(let i=0;i< alienInvaders.length;i++){
            alienInvaders[i] += width-1;
            direction = 1;
            isGoing=true;
        }
    }

    for(let i=0;i<alienInvaders.length;i++){
        alienInvaders[i] +=direction;

    }
    draw();

    //if invaders touch the shooter it will stop(clearInterval) and game over
    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        resultDisplay.innerHTML='GAME OVER'
        clearInterval(invadersId);
    }

    for(let i=0;i<alienInvaders.length;i++){
        if(alienInvaders[i]>squares.length){
            resultDisplay.innerHTML='GAME OVER'
            clearInterval(invadersId);
        }
    }
    if(aliensRemoved.length===alienInvaders.length){
        resultDisplay.innerHTML='You Won The Game!!';
        clearInterval(invadersId);
    }

}

invadersId= setInterval(moveInvaders,100);


//To shoot aliens

function shoot(e){
    let laserId;
    let currentLaserIndex=currentShooterIndex;
    function moveLaser(){
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -=width;
        squares[currentLaserIndex].classList.add('laser');

        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(()=>
            squares[currentLaserIndex].classList.remove('boom'),300);
            clearInterval(laserId);

            const alienRemoved=alienInvaders.indexOf(currentLaserIndex);
            //Collecting all the aliens that we have to remove in a array
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML=results;
        }
    }

    //if we press Arrow up button it will fire
    switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);

/*
I have used these methods in this project: 

•querySelector () : The querySelector() method returns the first element that matches a CSS selector.
.createElement () : The createElement() method creates an element node.
.appendChild() : The appendChild() method appends a node (element) as the last child of an element.
Array.from () : The Array.from() method is used to create a new array instance from a given array
.querySelectorAl1 () : To return all matches (not only the first), use the querySelectorAll() instead of querySelector()
.length : To find the length of the array
.includes () : The includes() method returns true if an array contains a specified value.
.classList.add () : The classList property returns the CSS classnames of an element.
     add() : Adds one or more tokens to the list
.classList.remove ()
    remove() : Removes one or more tokens from the list
.classList.contains ()
    contains() : Returns true if the list contains a class
clearInterval () : The clearInterval() method clears a timer set with the setTimeout() method.
setInterval () : The setInterval() method calls a function at specified intervals (in milliseconds).
innerHTML : The innerHTML property sets or returns the HTML content (inner HTML) of an element.
setTimeout() : The setTimeout() method calls a function after a number of milliseconds.
e.key : The key property returns the key that was pressed when the event occured.

*/