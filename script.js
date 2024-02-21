// Reference: https://www.youtube.com/watch?v=OUWFY1qY47Y by Adson Paulo Aug 30, 202

// import {startStopwatch, stopStopwatch, stopWatchStartTime } from './helperClass/stopwatch.js';






// LOGIC

const Movements={
    t1tot2: 12,
    t1tot3: 13,
    t2tot1: 21,
    t2tot3: 23,
    t3tot1: 31,
    t3tot2: 32,
}

const TowerNumber={
    Tower1:0,
    Tower2:1,
    Tower3:2,
}

let tower1=[]
let tower2=[]
let tower3=[]

let numberOfDisc = 3;
let numberOfSteps = 0;
let discFlashWaitTime = 50;

let fromtower= -1;
let totower=-1;

let showSolutionSteps = 0;
let hanoiArray=[];

let html_towers = document.querySelectorAll('.tower')
let feedback = document.querySelector(".feedback")
let steps = document.querySelector(".steps")
let container = document.querySelector(".container")
let diffDisc = document.querySelectorAll(".disc")
let showSolutionButton = document.querySelector(".show-solution")

let timer = document.querySelector(".timer")


function generateTower(){
    for (let index = numberOfDisc; index >= 1; index--) {
        tower1.push(index);        
    }
}
generateTower(numberOfDisc);
consoleLogTowerInfo();

function t1tot2(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower1,tower2)){
        tower2.push(tower1.pop())    
        moveDisc(TowerNumber.Tower1, TowerNumber.Tower2)
        return true;
    }
    else
        return false;
}

function t1tot3(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower1,tower3)){
        tower3.push(tower1.pop())
        moveDisc(TowerNumber.Tower1, TowerNumber.Tower3)
        return true;
    }
    else
        return false;
}

function t2tot1(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower2,tower1)){    
        tower1.push(tower2.pop())
        moveDisc(TowerNumber.Tower2, TowerNumber.Tower1)        
        return true;
    }
    else
        return false;
}

function t2tot3(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower2,tower3)){    
        tower3.push(tower2.pop())
        moveDisc(TowerNumber.Tower2, TowerNumber.Tower3)
        return true;
    }
    else
        return false;
}

function t3tot1(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower3,tower1)){    
        tower1.push(tower3.pop())
        moveDisc(TowerNumber.Tower3, TowerNumber.Tower1)        
        return true;
    }
    else
        return false;
}

function t3tot2(){
    if(Rules_CheckIsMovedDiscSmallerThanTargetTower(tower3,tower2)){    
        tower2.push(tower3.pop())
        moveDisc(TowerNumber.Tower3, TowerNumber.Tower2)        
        return true;
    }
    else
        return false;
}

function Rules_CheckIsMovedDiscSmallerThanTargetTower(from_Tower, to_Tower){
    let to_TowerDiscValue = -1;

    if (to_Tower.length===0){
        to_TowerDiscValue = 99; // an impossible value to beat
    }
    else{
        to_TowerDiscValue = to_Tower[to_Tower.length-1]
    }
    
    if (from_Tower[from_Tower.length-1] < to_TowerDiscValue)
        return true;
    else{
        const warning = "disc is bigger than target tower! pls try again.";
        uiUpdate_Feedback(warning);
        console.log(`${warning}`);
        return false;
    }
}

function movement(keyNumber){
    let result = false;
    switch (keyNumber) {
        case Movements.t1tot2:
            result=t1tot2();
            break;
        case Movements.t1tot3:
            result=t1tot3();
            break;
        case Movements.t2tot1:
            result=t2tot1();
            break;
        case Movements.t2tot3:
            result=t2tot3();
            break;
        case Movements.t3tot1:
            result=t3tot1();
            break;
        case Movements.t3tot2:
            result=t3tot2();
            break;
        default:
            break;
    }
    if (result){
        numberOfSteps += 1;
        uiUpdate_Steps(numberOfSteps);
    }
}

// showSolutionButton.addEventListener('click', function(event) {
//     console.log("inside click event listener")
//     showSolution();
// });


document.addEventListener('keydown', function(event) {
    uiUpdate_Feedback("");
    if(event.key == 1) {
        if (fromtower!=-1)
            totower = TowerNumber.Tower1;
        else{
            fromtower = TowerNumber.Tower1;
            fromTowerPreProcess(TowerNumber.Tower1);
        }
    }
    else if(event.key == 2) {
        if (fromtower!=-1)
            totower = TowerNumber.Tower2;
        else{
            fromtower = TowerNumber.Tower2;
            fromTowerPreProcess(TowerNumber.Tower2);
        }
    }
    else if(event.key == 3) {
        if (fromtower!=-1)
            totower = TowerNumber.Tower3;
        else{
            fromtower = TowerNumber.Tower3
            fromTowerPreProcess(TowerNumber.Tower3);
        }
    }
    if(event.key == 'z') {
        if (fromtower2!=-1)
            totower2 = TowerNumber.Tower1;
        else{
            fromtower2 = TowerNumber.Tower1;
            fromTowerPreProcess(TowerNumber.Tower1);
        }
    }
    else if(event.key == 'x') {
        if (fromtower2!=-1)
            totower2 = TowerNumber.Tower2;
        else{
            fromtower2 = TowerNumber.Tower2;
            fromTowerPreProcess(TowerNumber.Tower2);
        }
    }
    else if(event.key == 'c') {
        if (fromtower2!=-1)
            totower2 = TowerNumber.Tower3;
        else{
            fromtower2 = TowerNumber.Tower3
            fromTowerPreProcess(TowerNumber.Tower3);
        }
    }


    if (totower!=-1){
        moveValue = (fromtower+1)*10+(totower+1);
        console.log("moveValue=" + moveValue);

        if (IsTowerEmpty(fromtower))
            return;

        // rules check, all ok, can move pieces from tower to tower.
        movement(moveValue);
        fromtower=-1;
        totower=-1;
        // consoleLogTowerInfo();
        if (checkWin()){
            console.log("YOU WIN!");
            stopStopwatch();
        }
    }
});

function fromTowerPreProcess(towerNumber){
    // console.log("fromTowerPreProcess");
    if (!stopWatchStartTime)
        startStopwatch();

    if (!IsTowerEmpty(towerNumber))
        flashDisc(towerNumber);    
}

function IsTowerEmpty(checkTower){
    if ((checkTower ===TowerNumber.Tower1) && (tower1.length==0)){
        console.log(`nothing from that tower ${checkTower} `);
        fromtower=-1; //global variable is updated
        totower=-1;   //global variable is updated         
        return true;
    }
    else if ((checkTower ===TowerNumber.Tower2) && (tower2.length==0)){
        console.log(`nothing from that tower ${checkTower} `);
        fromtower=-1;
        totower=-1;            
        return true;
    }
    if ((checkTower ===TowerNumber.Tower3) && (tower3.length==0)){
        console.log(`nothing from that tower ${checkTower} `);
        fromtower=-1;
        totower=-1;            
        return true;
    }

    return false;    
}

function consoleLogTowerInfo(){
    console.log(`tower1 is ${tower1}`);
    console.log(`tower2 is ${tower2}`);
    console.log(`tower3 is ${tower3}`);
}

function checkWin(){
    if ((tower2.length == numberOfDisc)|| (tower3.length == numberOfDisc)){
        uiUpdate_Feedback("YOU WIN!");
        // app.say("You Win!")        
        return true;
    }
    else
        return false;
}

//HTML
let discDict = [[], [], []];

// https://www.w3schools.com/tags/ref_colornames.asp
const Disc_Color = ['Fuchsia','Gold','GreenYellow','LightSalmon','MediumBlue','MediumVioletRed','OrangeRed','DarkMagenta','BurlyWood'];

for (let index = 0; index < numberOfDisc; index++) {
    // let basePlate = document.getElementsByClassName('base-plate');
    let tempDisc = document.createElement("div");
    tempDisc.classList.add('disc');  // so can use disc class at css
    tempDisc.style.backgroundColor = Disc_Color[index];
    // tempDisc.style.width = basePlate.style.width - (index * 10);
    tempDisc.style.width = 180 - ((index+1) * 20) + 'px';

    // initially on game start, only tower 1 will be loaded with disc, 
    // from largest to smallest size.
    discDict[0].push(tempDisc) 
}

//********************************************************************************
//********************************************************************************
//*************************    User Interface      *******************************
//********************************************************************************
//********************************************************************************

function uiUpdate_Feedback(text){
    feedback.innerHTML = `${text}`;
}

function uiUpdate_Steps(stepValue){
    steps.innerHTML = `Number of Steps: ${stepValue}`;
}

function insertDisc(disc, towerNum){
    // html_towers[towerNum].innerHTML = disc.outerHTML + html_towers[towerNum].innerHTML;
    html_towers[towerNum].prepend(disc);
}

function removeDisc(towerNum){
    // html_towers[towerNum].innerHTML = html_towers[towerNum].innerHTML - html_towers[towerNum].innerHTML[0];
    let disc = html_towers[towerNum].firstChild;
    html_towers[towerNum].removeChild(disc);
    // html_towers[towerNum+1].prepend(disc);
    return disc;
}

function loadAllDiscToTower1(){
    // this is for INITIAL loading of all disc to tower1 using discDict
    for (let index = 0; index < discDict[0].length; index++) {
        insertDisc(discDict[0][index], TowerNumber.Tower1);    
    }
}
loadAllDiscToTower1();
// removeDisc(discDict[0][discDict[0].length-1], TowerNumber.Tower1);    

function moveDisc(fromWhichTower, ToWhichTower){
    insertDisc(removeDisc(fromWhichTower), ToWhichTower)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function flashDisc(towerNum){
    let disc_color = html_towers[towerNum].firstChild.style.backgroundColor;
    // console.log("original disc color is " + disc_color);
    html_towers[towerNum].firstChild.style.backgroundColor = 'blue';

    sleep(discFlashWaitTime).then(() => { 
        html_towers[towerNum].firstChild.style.backgroundColor = disc_color;
        sleep(discFlashWaitTime).then(()=>{ 
            html_towers[towerNum].firstChild.style.backgroundColor = 'blue';
            sleep(discFlashWaitTime).then(()=>{ 
                html_towers[towerNum].firstChild.style.backgroundColor = disc_color;
            });
        });
    });
}

function blinkElement(element){
    element.style.visibility = "hidden"
    sleep(500).then(() => { 
        element.style.visibility = "visible"
        sleep(500).then(() => { 
            element.style.visibility = "hidden"
            sleep(500).then(() => { 
                element.style.visibility = "visible"
            });
        });
    });
}

// https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/


function hanoiAlgo2(n, from_Tower, to_Tower, aux_Tower)
{
    // setTimeout( ()=>{
    // console.log(`${n}, ${from_Tower}, ${to_Tower}, ${aux_Tower}`)
    if (n===0){
        console.log("return")
        return;
    }
    // (async () => {
        hanoiAlgo2(n-1, from_Tower, aux_Tower, to_Tower);
        // console.log(`move disc ${n} from ${from_Tower} to ${to_Tower}`);
        console.log(`move disc from ${from_Tower} to ${to_Tower}`);
        hanoiArray.push({from_Tower, to_Tower});
        // document.dispatchEvent(new KeyboardEvent('keydown', {'key': from_Tower}));

        // https://www.sitepoint.com/delay-sleep-pause-wait/
        // // sleep2(1000);
        // // await sleep(1000);
        // document.dispatchEvent(new KeyboardEvent('keydown', {'key': to_Tower}));
        hanoiAlgo2(n-1, aux_Tower, to_Tower, from_Tower);
    // })();
    // }, 1000)
}

// hanoiAlgo1(numberOfDisc, TowerNumber.Tower1+1, TowerNumber.Tower3+1, TowerNumber.Tower2+1)
hanoiAlgo2(numberOfDisc, TowerNumber.Tower1+1, TowerNumber.Tower3+1, TowerNumber.Tower2+1)
console.log(hanoiArray)



var stopWatchStartTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

// https://www.educative.io/answers/how-to-create-a-stopwatch-in-javascript
function startStopwatch() {
    if (!stopwatchInterval) {
      stopWatchStartTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval); // stop the interval
    elapsedPausedTime = new Date().getTime() - stopWatchStartTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
}
  
function resetStopwatch() {
    stopStopwatch(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
    document.getElementById("stopwatch").innerHTML = "Timer 00:00"; // reset the display
}

function updateStopwatch() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - stopWatchStartTime; // calculate elapsed time in milliseconds
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    //var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    var displayTime = "Timer " + /*pad(hours) + ":" + */pad(minutes) + ":" + pad(seconds); // format display time
    document.getElementById("stopwatch").innerHTML = displayTime; // update the display
}
  31
function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
}


function showSolution(){
    console.log("in showsolution")
    console.log(`in showSolution ${showSolutionSteps}`);
    console.log(`in hanoiArray.length ${hanoiArray.length}`);
    if (showSolutionSteps < hanoiArray.length){
        moveValue = (hanoiArray[showSolutionSteps]['from_Tower'])*10+(hanoiArray[showSolutionSteps]['to_Tower']);
        console.log("moveValue=" + moveValue);
        movement(moveValue);
        showSolutionSteps++;
    }
}

function resetGame(){
    console.log("reset game")
    // elapsedPausedTime=0;
    stopWatchStartTime=0;
    resetStopwatch();

    numberOfSteps = 0;
    uiUpdate_Steps(0);
    uiUpdate_Feedback("Game Reset")
    for (let index = 0; index < tower2.length; index++) {
        removeDisc(TowerNumber.Tower2)        
    }
    tower2=[];

    for (let index2 = 0; index2 < tower3.length; index2++) {
        removeDisc(TowerNumber.Tower3)        
    }
    tower3=[];

    generateTower(numberOfDisc);
    loadAllDiscToTower1();
    showSolutionSteps=0;
    fromtower=-1;
    totower=-1;


}

blinkElement (container)
// blinkElement(html_towers[towerNum].firstChild);
// const allDisc = document.querySelectorAll('.disc')




