
const winnerContainer = document.querySelector('.winner-container');


export function showWinner(playerData) {
   winnerContainer.setAttribute('id', `${playerData.id}`);
    
    const pilotName = document.createElement('p');

    pilotName.textContent = `${playerData.pilotName} has won!`;
    const playerImg = new Image();
    
    playerImg.src = `../img/mechs/${playerData.mechName}.png`;

    winnerContainer.classList.remove('hidden');
    winnerContainer.appendChild(pilotName);
    winnerContainer.appendChild(playerImg);

}