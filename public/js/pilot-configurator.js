import { alertMsgNegative, alertMsgPositive } from "./utils/error.js";

const signBtn = document.querySelector('.sign_btn');
const mechs = document.querySelectorAll('.radio-container')
const mechImg = [...document.querySelectorAll('.radio-image')];
const heroName = [...document.querySelectorAll('.hero-name')];
const strength = document.querySelector('.strength');

mechs.forEach((mech, i ) => {
    mech.addEventListener('click', (e)=> {
        mechs.forEach((el, index)=> {
            if(index === i ) {
                    mechs[index].classList.add('active');
                    
            } else {
                mechs[index].classList.remove('active');
            }
        })
    })

})


signBtn.addEventListener('click', async ()=> {
    const pilotName = document.querySelector('input[name="name"]');
    const strength = document.querySelector('input[name="strength"]');
    const stamina = document.querySelector('input[name="stamina"]');
    const defense = document.querySelector('input[name="defense"]');
    const agility = document.querySelector('input[name="agility"]');
    console.log(pilotName.value.length);

    const activeMechData = [];
    mechs.forEach(el => {
        if(el.classList.contains('active')) {
            el.querySelectorAll('span').forEach(el => {
                activeMechData.push(el.textContent);
                
            });
        }
    });
    const [mechName,str,sta,def,agi] = activeMechData;

    const res = await fetch('/pilot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pilotName: pilotName.value,
            mechName,
            strength: Number(strength.value) + Number(str[str.length-1]),
            stamina: Number(stamina.value) + Number(sta[sta.length-1]),
            defense: Number(defense.value) + Number(def[def.length-1]),
            agility: Number(agility.value) + Number(agi[agi.length-1]),



        })
    })
    const responseTxt = await res.json();

    if(res.status === 200) {
        alertMsgPositive(responseTxt);
        setTimeout(()=> {
            window.location.href = '/';
        }, 3000);
        return;
    }
    
    alertMsgNegative(responseTxt)


})

