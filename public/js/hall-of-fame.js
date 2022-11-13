const ranking = document.querySelector('.ranking-ol');



(async() => {
    const res = await fetch('/hall-of-fame/top-mechs');
    const data = await res.json();
    console.log(data);
    createRanking(data)
})();


function createRanking(data) {
    data.forEach(el=> {
        const li = document.createElement('li');

        li.textContent = `${el.name} - ${el.wins}`;


        ranking.appendChild(li);





    })
}