const endGameData = [
  {
    name: "space-stone",
    avengers: ["captain-america", "iron-man"],
  },
  {
    name: "mind-stone",
    avengers: ["ant-man", "captain-america"],
  },
  {
    name: "reality-stone",
    avengers: ["rocket-raccoon", "thor"],
  },
  {
    name: "power-stone",
    avengers: ["war-machine", "nebula"],
  },
  {
    name: "time-stone",
    avengers: [{ name: "hulk" }],
  },
  {
    name: "soul-stone",
    avengers: ["black-widow", "hawkeye"],
  },
];

let gameData = {};
//re-arrange the data so it will be easier to work with
endGameData.map((data) => {
  if (data.name === "time-stone") {
    gameData[data.name] = [data.avengers[0].name];
  } else {
    gameData[data.name] = data.avengers;
  }
});

let currentStoneId = null;
let currentAvengersIdArray = [];
let stoneFound = 0;

const allStoneMatchGif = { src: "assets/gif/hand_click.gif", duration: 3200 };
const matchStoneGifArray = [
  { src: "assets/gif/match_2.gif", duration: 1800 },
  { src: "assets/gif/match_1.gif", duration: 2700 },
  { src: "assets/gif/match_3.gif", duration: 1700 },
];
const wrongMatch = { src: "assets/gif/noMatch.gif", duration: 2000 };

const stones = document.querySelectorAll(".stone");
const avengers = document.querySelectorAll(".avenger");
const glove = document.querySelector(".infinity_glove");

stones.forEach((stone) => {
  stone.addEventListener("click", onStoneClicked);
});

avengers.forEach((avenger) => {
  avenger.addEventListener("click", onClickAvenger);
});

glove.addEventListener("click", checkForMatch);

function onStoneClicked(target) {
  let id = target.target.id;
  if (currentStoneId === id) {
    setElementBackgroundColor(id, "");
    currentStoneId = null;
  } else {
    if (currentStoneId) {
      setElementBackgroundColor(currentStoneId, "");
    }
    currentStoneId = id;
    setElementBackgroundColor(currentStoneId, "red");
  }
}
function onClickAvenger(target) {
  let id = target.target.id;
  if (isAvengerAlreadyWasClicked(id)) {
    removeAvengerFromArray(id);
    setElementBackgroundColor(id, "");
  } else {
    currentAvengersIdArray.push(id);
    setElementBackgroundColor(id, "silver");
  }
}

function checkForMatch() {
  if (isErrorExsit()) {
    resetClickedTags();
    return;
  }
  if (
    sortArray(gameData[currentStoneId]) === sortArray(currentAvengersIdArray)
  ) {
    if (stoneFound != 6) {
      celebrateMatch();
    }

    uodateMatchStones();

    markMatchStone();

    resetClickedTags();
    if (stoneFound == 6) {
      showGif(allStoneMatchGif);
    }
  } else {
    showGif(wrongMatch);
    resetClickedTags();
  }
}

function isErrorExsit() {
  let error = false;
  if (!currentStoneId) {
    error = true;
    alert("You should choose stone first");
  } else if (
    currentStoneId !== "time-stone" &&
    currentAvengersIdArray.length !== 2
  ) {
    error = true;
    alert(
      "you need to match 2 heroes to one stone ( hint :except from a unique one that match the bigest guy)"
    );
  } else if (
    (currentStoneId === "time-stone") &
    (currentAvengersIdArray.length === 2)
  ) {
    error = true;
    alert("The time-stone match only one hero, guss who?");
  }
  return error;
}

function isAvengerAlreadyWasClicked(id) {
  return currentAvengersIdArray.includes(id);
}

function setElementBackgroundColor(id, color) {
  let myAvenger = document.getElementById(id);
  myAvenger.style.backgroundColor = color;
}

function removeAvengerFromArray(id) {
  let avengerIndexToBeRemove = currentAvengersIdArray.indexOf(id);
  currentAvengersIdArray.splice(avengerIndexToBeRemove, 1);
}
function convertArrayToString(array) {
  return JSON.stringify(array);
}

function sortArray(array) {
  array.sort();
  return convertArrayToString(array);
}

function resetClickedTags() {
  if (currentStoneId) {
    setElementBackgroundColor(currentStoneId, "");
    currentStoneId = null;
  }
  if (currentAvengersIdArray.length > 0) {
    currentAvengersIdArray.forEach((avengerId) => {
      setElementBackgroundColor(avengerId, "");
    });
    currentAvengersIdArray = [];
  }
}

function resetGame() {
  currentStoneId = null;
  currentAvengersIdArray = [];
  stoneFound = 0;
}

function showGif(gif) {
  const { src, duration } = gif;
  const img = document.createElement("img");
  const div = document.createElement("div");
  img.src = src;
  div.id = "popUp";
  img.id = "gif";
  img.className = "gif";
  div.className = "pop_up";
  div.appendChild(img);
  document.body.appendChild(div);
  setTimeout(removeGif, duration);
}

function removeGif() {
  const div_element = document.getElementById("popUp");
  div_element.remove();
}

function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

function celebrateMatch() {
  if (stoneFound % 2 === 0) {
    let index = getRandomNumber(matchStoneGifArray.length);
    let gif = matchStoneGifArray[index];
    matchStoneGifArray.splice(index, 1);
    showGif(gif);
  } else {
    alert("keep going! your doing great.");
  }
}

function markMatchStone() {
  let myAvenger = document.getElementById(currentStoneId);
  myAvenger.style.pointerEvents = "none";
  myAvenger.style.boxShadow = " 0px 0px 11px rgb(241, 209, 3)";
}

function uodateMatchStones() {
  stoneFound += 1;
}
