import { alertMsgNegative } from './utils/alert.js.js';

const ranking = document.querySelector('.ranking_list');
const duelLink = document.querySelector('.link.duel');
console.log(duelLink);

(async () => {
  const res = await fetch('/hall-of-fame/top-mechs');
  const data = await res.json();

  createRanking(data);
})();

function createRanking(data) {
  data.forEach((el) => {
    const li = document.createElement('li');
    const mark = document.createElement('mark');
    const small = document.createElement('small');

    switch (el.mechName) {
      case 'Ronin':
        li.style.background = 'url("../img/ui/Ronin_ranking.png") ,linear-gradient(to right, #e1e1e1,#d3b7ff)';
        break;
      case 'Blackbeard':
        li.style.background = 'url("../img/ui/Blackbeard_ranking.png") ,linear-gradient(to right, #557d74,#2e2b35)';
        break;
      case 'Nelson':
        li.style.background = 'url("../img/ui/Nelson_ranking.png") ,linear-gradient(to left, #1a132a,#a760ff)';
        break;
      case 'Scourer':
        li.style.background = 'url("../img/ui/Scourer_ranking.png") ,linear-gradient(to right, #0065b8,#d4a21b)';
        break;
      case 'Tortuga':
        li.style.background = 'url("../img/ui/Tortuga_ranking.png") ,linear-gradient(to left, #12100e,#d4b000)';
        break;
      case 'Barbarossa':
        li.style.background = 'url("../img/ui/Barbarossa_ranking.png"), linear-gradient(to left, #143c57,#ff3230)';
        break;
      case 'Atlas':
        li.style.background = 'url("../img/ui/Atlas_ranking.png") ,linear-gradient(to left, #311e13,#f46f00)';
        break;
      case 'Zheng':
        li.style.background = 'url("../img/ui/Zheng_ranking.png") ,linear-gradient(to left, #557d74,#2e2b35)';
        break;
      case 'Raleigh':
        li.style.background = 'url("../img/ui/Raleigh_ranking.png") ,linear-gradient(to right, #b1b0ab,#0781d2)';
        break;
      default:
        li.style.background = 'Sorry we did not find your mech img';
    }

    mark.textContent = `${el.name}`;
    small.textContent = `${el.wins} wins`;
    li.appendChild(mark);
    li.appendChild(small);
    ranking.appendChild(li);
  });
}

duelLink.addEventListener('click', async () => {
  const res = await fetch('/duel');

  if (res.status === 400) {
    const data = await res.json();
    return alertMsgNegative(data);
  }
  window.location.href = '/duel';
});
