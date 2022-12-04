


export function showPlayers(playerData) {
const mechsWrapper = document.querySelector('.mechs');

    const player = document.createElement('div');
    player.setAttribute('id', `${playerData.id}`);
    
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