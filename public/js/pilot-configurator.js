
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


signBtn.addEventListener('click', ()=> {
    const activeMechData = [];
    mechs.forEach(el => {
        if(el.classList.contains('active')) {
            el.querySelectorAll('span').forEach(el => {
                activeMechData.push(el.textContent);
                
            })
        }
    })
    const [name,str,sta,def,agi] = activeMechData;
    console.log(Number(str[str.length-1]),sta,def,agi,name);
})

