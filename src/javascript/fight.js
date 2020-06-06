import { createElement } from './helpers/domHelper';
import { showModal } from './modals/modal';

let hp1 = 0;
let hp2 = 0;
let healthElement2 = null;
let healthElement = null;

export function fight(firstFighter, secondFighter) {
  var winner = new Map();
  const elements = document.querySelectorAll('#root');
  let frst =   firstFighter['health'];
  let scnd =   secondFighter['health'];
  let fighter = new Map();
  var i=0;
  while(true) {
    frst = frst -  getDamage(firstFighter, secondFighter);
    setTimeout(function(){console.log('check 3000')}, 3000);
    scnd = scnd -getDamage(secondFighter, firstFighter);
    setTimeout(function(){console.log('check 3000')},3000);
    if (frst<=0 || scnd<=0) {
      if (frst <= 0) {
          winner.set('winner', secondFighter);
        console.log("frst" + winner.get('winner'));
       break;
      }
      if (scnd <= 0) {
        console.log("scnd" + scnd);
        winner.set('winner', firstFighter);
        console.log("scnd" + winner.get('winner'));
        break;
      }
    }
    i++;
    console.log(i);
  }
  console.log("figt");
  console.log("WINNER" + winner.get('winner'));
  console.log("fight");
  let result = winner.get('winner')
  return  result;
}
  ///==========================================
function TimeOutPromise(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  })
}


export function getDamage(attacker, enemy) {
  let damage = getHitPower(attacker) - getBlockPower(enemy);
  if (damage < 0) {
    damage = 0;
  }
  return damage;
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.random() + 1
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() + 1
  return fighter.defense * dodgeChance;
}


export function showFighterFightModal(firstFighter, secondFighter) {
  const title = 'Fighter Arena';
  const bodyElement = createFighterForFight(firstFighter, secondFighter);
  showModal({ title, bodyElement });
}

function createFighterForFight(firstFighter, secondFighter) {

  //first fighter
  let name1 = firstFighter.name;
  let health1 = firstFighter.health;
  let attack1 = firstFighter.attack;
  let source1 = firstFighter.source;
  hp1 = health1;
  let attributes = { align: "left" };
  let firstfighterDetails = createElement({ tagName: 'td', className: 'modal-first-body', attributes });
  let nameElement = createElement({ tagName: 'p', className: 'first-fighter-name' });
  healthElement = createElement({ tagName: 'p', className: 'first-fighter-health' });
  let attackElement = createElement({ tagName: 'p', className: 'first-fighter-attack' });
  attributes = { src: source1 };
  let imageElement = createElement({ tagName: 'img', className: 'first-fighter-image', attributes });
    // show fighter name, attack, defense, health, image
  nameElement.innerText = 'Name - ' + name1;
  healthElement.innerText = 'Total Health - ' + health1;
  attackElement.innerText = 'Attack - ' + attack1;
  firstfighterDetails.append(nameElement, healthElement, attackElement, imageElement);
    //second fighter
  let name2 = secondFighter.name;
  let health2 = secondFighter.health;
  let attack2 = secondFighter.attack;
  let source2 = secondFighter.source;
  hp2 = health2;

  attributes = { align: "right" }
  let secondfighterDetails = createElement({ tagName: 'td', className: 'modal-second-body', attributes });
  let nameElement2 = createElement({ tagName: 'p', className: 'second-fighter-name' });
  healthElement2 = createElement({ tagName: 'p', className: 'second-fighter-health' });
  let attackElement2 = createElement({ tagName: 'p', className: 'second-fighter-attack' });
  attributes = { src: source2 };
  let imageElement2 = createElement({ tagName: 'img', className: 'second-fighter-image', attributes });

  nameElement2.innerText = 'Name - ' + name2;
  healthElement2.innerText = 'Total health - ' + health2;
  attackElement2.innerText = 'Attack - ' + attack2;


  secondfighterDetails.append(nameElement2, healthElement2, attackElement2, imageElement2);

  attributes = { width: "100%", cellspacing: "0", cellpadding: "5" };
  const arena = createElement({ tagName: 'table', className: 'modal-body', attributes });
  const cells = createElement({ tagName: 'tr', className: 'modal-body', attributes });
  cells.append(firstfighterDetails, secondfighterDetails);
  arena.append(cells);
  return arena;
}