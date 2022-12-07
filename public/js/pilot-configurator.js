import { alertMsgNegative, alertMsgPositive } from './utils/alert.js';
import { showPoints } from './utils/showPointsLeft.js';

const signBtn = document.querySelector('.sign_btn');
const mechs = document.querySelectorAll('.radio-container');
const duelLink = document.querySelector('.link.duel');

const statInputs = document.querySelectorAll('input[type="number"]');
const pilotName = document.querySelector('input[name="name"]');
const pilotStr = document.querySelector('input[name="strength"]');
const pilotSta = document.querySelector('input[name="stamina"]');
const pilotDef = document.querySelector('input[name="defense"]');
const pilotAgi = document.querySelector('input[name="agility"]');

showPoints(statInputs);

mechs.forEach((mech, i) => {
  mech.addEventListener('click', (e) => {
    mechs.forEach((el, index) => {
      if (index === i) {
        mechs[index].classList.add('active');
      } else {
        mechs[index].classList.remove('active');
      }
    });
  });
});

signBtn.addEventListener('click', async () => {
  const activeMechData = [];
  mechs.forEach((el) => {
    if (el.classList.contains('active')) {
      el.querySelectorAll('span').forEach((el) => {
        activeMechData.push(el.textContent);
      });
    }
  });
  const [mechName, str, sta, def, agi] = activeMechData;

  const mechStats =  {
    str: str ? Number(str[str.length - 1]) : 0,
    sta: sta ? Number(sta[sta.length - 1]) : 0,
    def: def ? Number(def[def.length - 1]) : 0,
    agi: agi ? Number(agi[agi.length - 1]) : 0,
    
  }


  console.log(mechStats);
  const res = await fetch('/pilot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pilotName: pilotName.value,
      mechName,
      strength: Number(pilotStr.value) + mechStats.str,
      stamina: Number(pilotSta.value) + mechStats.sta,
      defense: Number(pilotDef.value) + mechStats.def,
      agility: Number(pilotAgi.value) + mechStats.agi,

    }),
  });
  const responseTxt = await res.json();

  if (res.status === 200) {
    alertMsgPositive(responseTxt);
    setTimeout(() => {
      window.location.href = '/duel';
    }, 2000);

    return;
  }

  alertMsgNegative(responseTxt);
});

duelLink.addEventListener('click', async () => {
  const res = await fetch('/duel');

  if (res.status === 400) {
    const data = await res.json();
    alertMsgNegative(data);
    return;
  }
  window.location.href = '/duel';
});
