import { alertMsgNegative } from "./utils/alert.js";
import { showPlayers } from "./utils/showPlayers.js";
import { showWinner } from "./utils/showWinner.js";

const randomBtn = document.querySelector('.random_btn');
const fightBtn = document.querySelector('.fight_btn');
const logContainer = document.querySelector('.log_container');
const arenaImg = document.querySelector('.arena');
const mechsWrapper = document.querySelector('.mechs');
const againBtn = document.querySelector('.again_btn');




//======================Duel page init====================//
(async() => {
    const backgroundNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    arenaImg.style.background = `url('../img/background/${backgroundNumber}.jpg')`;
    arenaImg.style.backgroundSize = 'cover'; 
    arenaImg.style.backgroundRepeat = 'no-repeat'; 
    arenaImg.style.backgroundPosition = 'center'; 


    const res = await fetch('/duel/player');
    const data = await res.json();

    if(res.status === 400) {
        alertMsgNegative(data.message);
        return showWinner(data.winner);
    }

    showPlayers(data);
    againBtn.classList.remove("again_btn");
    againBtn.classList.add('disabled_btn');

    
    
})();

//======================Get random opponent====================//
randomBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    const enemy = document.querySelector('.enemy');

    if(enemy){
    enemy.remove();
    }

    const res = await fetch('/pilot/random-opponent');

    if(res.status === 400) {
        const data = await res.json();
        alertMsgNegative(data);
    }

    const data = await res.json();
    showPlayers(data)


})

//======================Fight====================//
fightBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    logContainer.textContent = '' ;
    const playerId = document.querySelector('.player');
    const enemyId = document.querySelector('.enemy');
    

    if(!enemyId){
        alertMsgNegative('Find your opponent first');
        return;
    }

    const res = await fetch('/duel/start', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            playerId: playerId.getAttribute('id'),
            enemyId:  enemyId.getAttribute('id'),
        })

    })
  
    const {log, winner}  = await res.json();



    log.forEach(element => {
        const li = document.createElement('li');

        if(element.split(' ').indexOf('successfully') > - 1) {
            li.style.color = '#cd324a';
        }
        li.textContent = element;
        logContainer.appendChild(li);
    });

    mechsWrapper.classList.add('hidden');

    againBtn.classList.remove('disabled_btn');
    againBtn.classList.add('again_btn');
    againBtn.disabled = false;
    logContainer.classList.remove('hidden');


    showWinner(winner)

    
})

//======================Fight again====================//
 againBtn.addEventListener('click', async (e)=> {
        const res = await fetch('/duel/player');
        const data = await res.json();
        
        
        if(res.status === 400) {
            return alertMsgNegative(data.message);
        }


        window.location.href = '/duel';




    });