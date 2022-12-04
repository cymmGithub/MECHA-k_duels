


export function showWinner(playerData) {
const winnerContainer = document.querySelector('.winner-container');
const fightBtn = document.querySelector('.fight_btn');
const randomBtn = document.querySelector('.random_btn');



   winnerContainer.setAttribute('id', `${playerData.id}`);
    
    const pilotName = document.createElement('p');

    pilotName.textContent = `${playerData.pilotName} has won!`;
    const playerImg = new Image();
    
    playerImg.src = `../img/mechs/${playerData.mechName}.png`;

    winnerContainer.classList.remove('hidden');
    fightBtn.classList.add('hidden');
    randomBtn.classList.add('hidden');
    winnerContainer.appendChild(pilotName);
    winnerContainer.appendChild(playerImg);

}