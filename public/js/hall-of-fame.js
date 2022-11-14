const ranking = document.querySelector('.ranking_list');

console.log(ranking);

(async() => {
    const res = await fetch('/hall-of-fame/top-mechs');
    const data = await res.json();

    
    createRanking(data)
})();


function createRanking(data) {
    data.forEach(el=> {
        const li = document.createElement('li');

        li.textContent = `${el.name} - ${el.wins}`;

        console.log(el);
        ranking.appendChild(li);





    })
}