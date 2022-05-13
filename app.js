const endGameData = [{
    name: "space-stone", avengers: ["captain-america", "iron-man"]
}, {
    name: "mind-stone", avengers: ["ant-man", "captain-america"]
}, {
    name: "reality-stone", avengers: ["rocket-raccoon", "thor"]
}, {
    name: "power-stone", avengers: ["war-machine", "nebula"]
}, {
    name: "time-stone", avengers: [{name: "hulk"}]
}, {
    name: "soul-stone", avengers: ["black-widow", "hawkeye"]
}];

const stones = document.querySelectorAll('.stone');
const avengers = document.querySelectorAll('.avenger');
const glove = document.querySelector('.infinity_glove');
const userAnswer = {name:"",avengers: {avengerOne:"",avengerTow:""}};
let isHulk = false
let counterCorrectAvengers = 0;

function renewUserAnswer() {
    counterCorrectAvengers=0
    userAnswer.name="";
    userAnswer.avengers.avengerOne="";
    userAnswer.avengers.avengerTow="";
    isHulk = false;
}

function noneDisplayElements(){
    if(!isHulk){
        document.getElementById(userAnswer.name).style.display = "none";
        document.getElementById(userAnswer.avengers.avengerOne).style.display = "none";
        document.getElementById(userAnswer.avengers.avengerTow).style.display = "none";
    }else{
        document.getElementById(userAnswer.name).style.display = "none";
        document.getElementById(userAnswer.avengers.avengerOne).style.display = "none";
    }
}

function onGloveClicked(target){
    counterCorrectAvengers = 0
    if(userAnswer.name && userAnswer.avengers.avengerOne && userAnswer.avengers.avengerTow){
        const endGameCurrentObg = endGameData.filter((endGameObg)=>endGameObg.name===userAnswer.name)
        if(userAnswer.name === endGameCurrentObg[0].name){
            endGameCurrentObg[0].avengers.forEach((dataAvenger)=>{
                if(dataAvenger === userAnswer.avengers.avengerOne || dataAvenger === userAnswer.avengers.avengerTow){
                    counterCorrectAvengers++;                    
                }else{
                    renewUserAnswer();
                    alert("The attempt failed because there was no match between the Avengers and Stone try again");
                }
            });
        }
    }else if(userAnswer.avengers.avengerOne === "hulk" && userAnswer.name ==="time-stone"){
        isHulk = true
        counterCorrectAvengers = 2;
    }else{
        alert("first you have to choose atlist tow avngers and one infinity stone");
    }
    if(counterCorrectAvengers === 2){
        noneDisplayElements();
        renewUserAnswer();
    }
}

function onStoneClicked(target){
    if(!userAnswer.name){
        userAnswer.name = target.currentTarget.id;
    }else{
        alert("A stone has already been selected");
    }
}

function onAvengerClicked(target){
    if(!userAnswer.avengers.avengerOne){
        userAnswer.avengers.avengerOne = target.currentTarget.id;
    }else if(!userAnswer.avengers.avengerTow){
        userAnswer.avengers.avengerTow = target.currentTarget.id;
    }else{
        alert("An avengers has already been selected");
    }
}


glove.addEventListener('click', onGloveClicked);

stones.forEach((stone)=>{
    stone.addEventListener('click',onStoneClicked);
});

avengers.forEach((avenger)=>{
    avenger.addEventListener('click', onAvengerClicked)
});