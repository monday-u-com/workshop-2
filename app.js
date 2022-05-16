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
let matchFound = 0


function renewUserAnswer() {
    if(!isHulk){
        document.getElementById(userAnswer.avengers.avengerOne).style.backgroundColor = "initial";
        document.getElementById(userAnswer.avengers.avengerTow).style.backgroundColor = "initial";
    }else{
        document.getElementById(userAnswer.avengers.avengerOne).style.backgroundColor = "initial";
    }
    counterCorrectAvengers=0
    userAnswer.name="";
    userAnswer.avengers.avengerOne="";
    userAnswer.avengers.avengerTow="";
    isHulk = false;

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
                    alert("The attempt failed because there was no match between the Avengers and Stone try again If you continue like this half of life in the universe will be destroyed");
                }
            });
        }
    }else if(userAnswer.avengers.avengerOne === "hulk" && userAnswer.name ==="time-stone"){
        isHulk = true
        counterCorrectAvengers = 2;
    }else{
        alert("first you have to choose atlist tow avngers and one infinity stone");
        renewUserAnswer();
    }
    if(counterCorrectAvengers === 2 && matchFound < 5){
        alert("match found. keep that way you can save the univers!");
        matchFound++
        document.getElementById(userAnswer.name).style.display = "none";
        renewUserAnswer();
    }else if (matchFound < 6){
        alert("Thanos won! hlaf of the univers is destroyed!")
    }else if(matchFound === 6) {
        alert("Congratulations! You saved the universe.");
        window.location.reload();
    }
}

function onStoneClicked(target){
    if(!userAnswer.name){
        userAnswer.name = target.currentTarget.id;
        target.currentTarget.style.backgroundColor = "gold";
    }else{
        if(userAnswer.name === target.currentTarget.id){
            target.currentTarget.style.backgroundColor = "";
            userAnswer.name = "";

        }else{
            target.currentTarget.style.backgroundColor = "gold";
            document.getElementById(userAnswer.name).style.backgroundColor = "";
            userAnswer.name = target.currentTarget.id;        
        }
    }
}

function onAvengerClicked(target){
    if(!userAnswer.avengers.avengerOne){
        userAnswer.avengers.avengerOne = target.currentTarget.id;
        target.currentTarget.style.backgroundColor = "gold";

    }else if(!userAnswer.avengers.avengerTow && userAnswer.avengers.avengerOne != target.currentTarget.id){
        userAnswer.avengers.avengerTow = target.currentTarget.id;
        target.currentTarget.style.backgroundColor = "gold";

    }else if (userAnswer.avengers.avengerOne === target.currentTarget.id || userAnswer.avengers.avengerTow === target.currentTarget.id){
        if(target.currentTarget.id === userAnswer.avengers.avengerOne){
            document.getElementById(userAnswer.avengers.avengerOne).style.backgroundColor = "";
            userAnswer.avengers.avengerOne = "";
        
        }else if(target.currentTarget.id === userAnswer.avengers.avengerTow){
            document.getElementById(userAnswer.avengers.avengerTow).style.backgroundColor = "";
            userAnswer.avengers.avengerTow = "";
        };
        
    }else{
        alert("An avengers has already been selected");
        return;
    }
}


glove.addEventListener('click', onGloveClicked);

stones.forEach((stone)=>{
    stone.addEventListener('click',onStoneClicked);
});

avengers.forEach((avenger)=>{
    avenger.addEventListener('click', onAvengerClicked)
});
