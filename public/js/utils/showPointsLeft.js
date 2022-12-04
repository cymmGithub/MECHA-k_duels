
export const showPoints = (statInputs)=> {
    const signContainer = document.querySelector('.sign_container');
    const signBtn = document.querySelector('.sign_btn');
    const pointsLeftNumber = document.querySelector('span');

    let availablePts = 10;


    [...statInputs].forEach(input=> {

        input.addEventListener('input', ()=> {
            let inputSum = 0;

            [...statInputs].forEach(input=> {

                inputSum += Number(input.value);
            })
           const pointsLeft = availablePts - inputSum;
           const p = document.createElement('p');


           if(pointsLeft === 0) {
                signBtn.classList.add('animate__fadeIn');
                signBtn.classList.remove('hidden');
           }else {
            signBtn.classList.remove('animate__fadeIn');
            signBtn.classList.add('hidden');

           }
           const pointsLeftNumberCheat = `<span class='points_left_color'>${-pointsLeft}</span>`;
           const pointsLeftNumber = `<span class='points_left_color'>${pointsLeft}</span>`;


           signContainer.textContent = '';


           pointsLeft < 0 ? p.innerHTML = `Do not cheat, please substract ${pointsLeftNumberCheat} points` : p.innerHTML = `REGISTER NEW PILOT You have ${pointsLeftNumber} points left to distribute`;
           


           signContainer.appendChild(p);
        })

    });
};