import { alertMsgNegative } from "./utils/alert.js";
import { showPlayers } from "./utils/showPlayers.js";

const randomBtn = document.querySelector('.random_btn');
const fightBtn = document.querySelector('.fight_btn');

//Load player
(async() => {
    const res = await fetch('/duel/player');
    const data = await res.json();
    showPlayers(data)
    
    
})();

// Get random opponent
randomBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    console.log('ok');
    const res = await fetch('/pilot/random-opponent');
    const data = await res.json();
    showPlayers(data)


})

//Fight
fightBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    const logger = document.querySelector('.log_container');
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
    
    logger.textContent = `${log} ${winner.pilotName} has WON`
    
})
