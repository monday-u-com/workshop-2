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

const stones = document.querySelectorAll(".stone");
const avengers = document.querySelectorAll(".avenger");
const glove = document.querySelector(".infinity_glove");

const BLACK = "black";
const RED = "red";

let selectedStones = [];
let selectedAvanger = [];

endGameData[4] = {
  //cheating
  name: "time-stone",
  avengers: ["hulk"],
};

glove.addEventListener("click", () => {
  checkIfMatches();
});

let stonesMap = [...stones].map((stone) => {
  stone.addEventListener("click", ({ target }) => {
    onStoneClicked(target);
  });
  return stone;
});

let avengersMap = [...avengers].map((avenger) => {
  avenger.addEventListener("click", ({ target }) => {
    onAvangerClicked(target);
  });
  return avenger;
});

function onStoneClicked(target) {
  if (!selectedStones.includes(target.id)) {
    addToSelectedStones(target);
  } else {
    selectedStones = [...selectedStones].filter((item) => {
      if (item !== target.id) {
        return item;
      }
    });
    target.style.backgroundColor = "";
  }
}

function onAvangerClicked(target) {
  if (!selectedAvanger.includes(target.id)) {
    addToSelectedAvengers(target);
  } else {
    selectedAvanger = [...selectedAvanger].filter((item) => {
      if (item !== target.id) {
        return item;
      }
    });
    target.style.backgroundColor = "";
  }
}

function addToSelectedStones(target) {
  selectedStones.push(target.id);
  paintBackground(target, BLACK);
  return;
}

function addToSelectedAvengers(target) {
  selectedAvanger.push(target.id);
  paintBackground(target, RED);
  return;
}

function paintBackground(target, color) {
  target.style.backgroundColor = color;
  return;
}

function checkIfMatches() {
  userCorrect = true;
  if (selectedStones.length > 1) {
    alert("Pick only ONE stone!");
    return;
  }
  let answer = [...endGameData].filter((item) => {
    if (selectedStones[0] === item.name) {
      return item.avengers;
    }
  });
  for (let name in selectedAvanger) {
    if (!answer[0].avengers.includes(selectedAvanger[name])) {
      alert("wrong answer!");
      userCorrect = false;
    }
  }
  if (userCorrect) {
    console.log(selectedStones);
    let stoneElem = [...stones].filter((elem) => {
      if (elem.id === selectedStones[0]) return elem;
    });
    stoneElem[0].style.display = "none";
  }
}