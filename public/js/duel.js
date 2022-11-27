const arena = document.querySelector('.arena');
const mechsWrapper = document.querySelector('.mechs');
const randomBtn = document.querySelector('.random_btn');


(async() => {
    const res = await fetch('/duel/player');
    const data = await res.json();
    showPlayer(data)
    
    
})();


randomBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    console.log('ok');
    const res = await fetch('/pilot/random-opponent');
    const data = await res.json();
    showPlayer(data)


})


function showPlayer(playerData) {
    const player = document.createElement('div');
    const pilotName = document.createElement('p');

    pilotName.textContent = playerData.pilotName;
    const playerImg = new Image();
    
    playerImg.src = `../img/mechs/${playerData.mechName}.png`;

    if(playerData.enemy) {
        player.classList.add('enemy');
    }else {
        player.classList.add('player');

    }

    player.appendChild(pilotName);
    player.appendChild(playerImg);
    mechsWrapper.appendChild(player)




}