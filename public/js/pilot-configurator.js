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

  const res = await fetch('https://mecha-k-duels.herokuapp.com/pilot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pilotName: pilotName.value,
      mechName,
      strength: Number(pilotStr.value) + Number(str[str.length - 1]),
      stamina: Number(pilotSta.value) + Number(sta[sta.length - 1]),
      defense: Number(pilotDef.value) + Number(def[def.length - 1]),
      agility: Number(pilotAgi.value) + Number(agi[agi.length - 1]),

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
  const res = await fetch('https://mecha-k-duels.herokuapp.com/duel');

  if (res.status === 400) {
    const data = await res.json();
    alertMsgNegative(data);
    return;
  }
  window.location.href = '/duel';
});
