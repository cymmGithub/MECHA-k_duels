const signContainer = document.querySelector('.sign_container');



export const showPoints = (statInputs)=> {
    let availablePts = 10;


    [...statInputs].forEach(input=> {

        input.addEventListener('change', ()=> {
            let inputSum = 0;

            [...statInputs].forEach(input=> {

                inputSum += Number(input.value);
            })
           const pointsLeft = availablePts - inputSum;
           
           pointsLeft < 0 ? signContainer.textContent = `Do not cheat, please substract ${-pointsLeft} points` : signContainer.textContent = `You have ${pointsLeft} points left to distribute`;

        })

    });
};