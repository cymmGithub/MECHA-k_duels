
export const showPoints = (statInputs)=> {
    const signContainer = document.querySelector('.sign_container');
    const signBtn = document.querySelector('.sign_btn');

    let availablePts = 10;


    [...statInputs].forEach(input=> {

        input.addEventListener('input', ()=> {
            let inputSum = 0;

            [...statInputs].forEach(input=> {

                inputSum += Number(input.value);
            })
           const pointsLeft = availablePts - inputSum;
           if(pointsLeft === 0) {
                signBtn.classList.add('animate__fadeIn');
                signBtn.classList.remove('hidden');
           }else {
            signBtn.classList.remove('animate__fadeIn');
            signBtn.classList.add('hidden');

           }

           pointsLeft < 0 ? signContainer.textContent = `Do not cheat, please substract ${-pointsLeft} points` : signContainer.textContent = `You have ${pointsLeft} points left to distribute`;

        })

    });
};