let xp = 0;
let health = 150;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Pistol"];



const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const currentweaponText = document.querySelector("#currentweaponText")
const banditStats = document.querySelector("#banditStats");
const banditNameText = document.querySelector("#banditName");
const banditHealthText = document.querySelector("#banditHealth");
const weapons = [
  {
    accuracy: 7,
    name: "Pistol",
    damage: 10
  },
  {
    accuracy: 6,
    name: "Revolver",
    damage: 20
  },
  {
    accuracy: 9,
    name: "Rifle",
    damage: 30
  },
  {
    accuracy: 5,
    name: "Shotgun",
    damage: 50

  }
]

const bandits = [
  {
    level: 1,
    name: "Randal",
    health: 100,
    damage: 10,
    accuracy: 6,
    alive: true
  },
  {
    level: 2,
    name: "Mormont",
    health: 170,
    damage: 20,
    accuracy: 5,
    alive: true
  },
  {
    level: 3,
    name: "Niko",
    health: 150,
    damage: 20,
    accuracy: 10,
    alive: true
  },
  {
    level: 4,
    name: "Jabba",
    health: 200,
    damage: 20,
    accuracy: 7,
    alive: true
  },
  {
    level: 5,
    name: "Simon",
    health: 250,
    damage: 30,
    accuracy: 7,
    alive: true
  },
  {
    level: 6,
    name: "Falcone",
    health: 300,
    damage: 40,
    accuracy: 8,
    alive: true
  }

]
const locations = [
  {
    name: "town square",
    "button text": ["Go to Gun Shop", "Go to Saloon", "Go to Bandit Hideout"],
    "button function": [goGunShop, goSaloon, goBanditHideout],
    text: "You are in Town Square. You see a sign that says \"Gun Shop\"."
  },
  {
    name: "gun shop",
    "button text": ["Buy Weapon (30 Gold)", "Buy Armour (80 Gold)", "Go to Town Square"],
    "button function": [buyWeapon, buyArmour, goTown],
    text: "You enter the Gun Shop."
  },
  {
    name: "saloon",
    "button text": ["Eat Food (10 Gold)", "Drink Whiskey (20 Gold)", "Go to Town Square"],
    "button function": [eatFood, drinkWhiskey, goTown],
    text: "You enter the Saloon."
  },
  {
    name: "bridge",
    "button text": ["Duel Randal", "Duel Mormont", "Go to Town Square"],
    "button function": [duelRandal, duelMormont, goTown],
    text: "While on your way to the bandit hideout, you reach a bridge. You see two bandit lookouts tall-lanky Randal and short-stout Mormont."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button function": [attack, dodge, goTown],
    text: "You are fighting a bandit."
  },
  {
    name: "lose",
    "button text": ["Replay", "Replay", "Replay"],
    "button function": [replay, replay, replay],
    text: "You die."
  },
  {
    name: "banditDefeated",
    "button text": ["Loot the dead body", "Continue", "Go to Town Square"],
    "button function": [loot, goBanditHideout, goTown],
    text: `The bandit lies dead on the ground.`
  },
  {
    name: "water tank",
    "button text": ["Duel Niko", "Duel Jabba", "Go to Town Square"],
    "button function": [duelNiko, duelJabba, goTown],
    text: "While on your way to the bandit hideout, you reach a water tank. You see two bandit lookouts sharp-shooter Niko and big-guy Jabba."
  },
  {
    name: "Bandit Hideout",
    "button text": ["Duel Simon", "Duel Falcone", "Go to Town Square"],
    "button function": [duelSimon, duelFalcone, goTown],
    text: "Finally, you reach the bandit hideout. Having killed most of the bandits, you see the only two remaining bandits, hot-headed Simon and the bandit leader Falcone."
  },
  {
    name: "you win",
    "button text": ["Replay", "Replay", "Replay"],
    "button function": [replay, replay, replay],
    text: "You have killed all the bandits. The town is safe now, thanks to you   and your bravery."
  }


]

//initialize buttons
button1.onclick = goGunShop;
button2.onclick = goSaloon;
button3.onclick = goBanditHideout;

function update(locations) {
  banditStats.style.display = "none";
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];
  button1.onclick = locations["button function"][0];
  button2.onclick = locations["button function"][1];
  button3.onclick = locations["button function"][2];
  text.innerText = locations["text"]

}

function goTown() {
  update(locations[0]);
}

function goGunShop() {
  update(locations[1]);
}
function goSaloon() {
  update(locations[2]);
}
function goBanditHideout() {
  if ((bandits[0].alive == true) || (bandits[1].alive == true)) { update(locations[3]) }
  else if ((bandits[2].alive == true) || (bandits[3].alive == true)) { update(locations[7]) }
  else if ((bandits[4].alive == true) || (bandits[5].alive == true)) { update(locations[8]) }
  else { update(locations[9]) }



}
function goFight() {
  if (bandits[fighting].alive == true) {
    update(locations[4]);
    banditHealth = bandits[fighting].health;
    banditStats.style.display = "block";
    banditNameText.innerText = bandits[fighting].name;
    banditHealthText.innerText = bandits[fighting].health;
  }
  else { text.innerText = bandits[fighting].name + " is dead." }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      currentweaponText.innerText = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + "."
      inventory.push(newWeapon)
      text.innerText += " In your inventory you have: " + inventory
    }
    else { text.innerText = "You don't have enough gold." }
  }
  else {
    text.innerText = "You already have the strongest weapon!";
    button1.onclick = sellWeapon;
    button1.innerText = "Sell Weapon for 20 Gold"
  }
}


function sellWeapon() {
  if (inventory.length > 1) {
    let currentWeapon = inventory.shift();
    gold += 20;
    goldText.innerText = gold;
    text.innerText = "You sell " + currentWeapon + ".";
    currentweaponText.innerText = inventory[inventory.length - 1];


    text.innerText += " In your inventory, you have: " + inventory
  }
  else {
    text.innerText = "Don't sell your only weapon!";
    button1.innerText = "Buy Weapon (30 Gold)";
    button1.onclick = buyWeapon
  }
}
function buyArmour() {
  if (gold >= 80) {
    gold -= 80;
    health += 100;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You buy Armour"
  }
  else { text.innerText = "You don't have enough gold." }
}
function eatFood() {
  if (gold >= 10) {
    gold -= 10;
    health += 10
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You eat Food."
  }
  else { text.innerText = "You don't have enough gold." }
}
function drinkWhiskey() {
  if (gold >= 20) {
    gold -= 20;
    health += 30;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You drink Whiskey."
  }
  else { text.innerText = "You don't have enough gold." }
}
function duelRandal() {
  fighting = 0;
  goFight();
}
function duelMormont() {
  fighting = 1;
  goFight();
}
function duelNiko() {
  fighting = 2;
  goFight();
}
function duelJabba() {
  fighting = 3;
  goFight();
}
function duelSimon() {
  fighting = 4;
  goFight();
}
function duelFalcone() {
  fighting = 5;
  goFight();
}




function attack() {
  text.innerText = `${bandits[fighting].name} shoots.`;
  text.innerHTML += "<br />You shoot with your " + weapons[currentWeapon].name + ".";
  if (isBanditHit(weapons[currentWeapon].accuracy)) {
    text.innerHTML += `<br />${bandits[fighting].name} is hit.`;
    banditHealth -= yourAttackValue(weapons[currentWeapon].damage);
  }
  else { text.innerHTML += "<br />You miss." }
  if (areYouHit(bandits[fighting].accuracy)) {
    text.innerHTML += "<br />You are hit."
    health -= banditAttackValue(bandits[fighting].damage, bandits[fighting].level);
  }
  else { text.innerHTML += `<br />${bandits[fighting].name} misses.` }

  banditHealthText.innerText = banditHealth;
  healthText.innerText = health;
  xp++;
  xpText.innerText = xp;
  if (health <= 0) { lose() }
  else if (banditHealth <= 0) { banditDefeated() }
}
function isBanditHit(accuracy) {
  return Math.random() > ((10 - accuracy) / 10)
}
function yourAttackValue(damage) {
  let hit = damage + (Math.floor(Math.random() * xp))
  console.log("you", hit)
  return hit
}

function areYouHit(accuracy) {
  return Math.random() > ((10 - accuracy) / 10)

}
function banditAttackValue(damage, level) {
  let hit = damage + (Math.floor(Math.random() * level));
  console.log("bandit", hit)
  return hit
}

function dodgeAttack(){
  return Math.random()>0.2
}





function dodge() {
  if (dodgeAttack(bandits[fighting].accuracy)) {
    text.innerHTML += "<br />You dodge the attack by "+bandits[fighting].damage
    
  }
  else { health -= banditAttackValue(bandits[fighting].damage, bandits[fighting].level);
    text.innerHTML += "<br />You are hit." }
}

function lose() {
  update(locations[5])
}

function banditDefeated() {
  text.innerText = `${bandits[fighting].name} lies dead on the ground.`;
  xp += bandits[fighting].level;
  xpText.innerText = xp;

  hasLooted = false
  for (let j = 0; j < bandits.length; j++) {
    if (bandits[j].level == bandits[fighting].level) {
      bandits[j].alive = false;
    }
  }
  update(locations[6])

}
function loot() {
  if (!hasLooted) {
    gold += Math.floor(bandits[fighting].level * 20);
    goldText.innerText = gold;
    text.innerText = "You find " + Math.floor(bandits[fighting].level * 10) + " gold."
    hasLooted = true
  }
  else { text.innerText = "You find nothing." }
}

function replay() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  fighting;
  monsterHealth;
  inventory = ["Whip"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  currentweaponText.innerText = weapons[currentWeapon].name;
  update(locations[0]);
  for (let i = 0; i < bandits.length; i++) {
    bandits[i].alive = true;
  }

}
