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
        const mark = document.createElement('mark');
        const small = document.createElement('small');

        switch(el.mechName) {
                case 'Ronin':
                    li.style.background = 'linear-gradient(to right, #e1e1e1,#d3b7ff)'
                    break;
                case 'Blackbeard':
                    li.style.background = 'linear-gradient(to right, #557d74,#2e2b35)'
                    break;
                case 'Nelson':
                    li.style.background = 'linear-gradient(to right, #1a132a,#a760ff)'
                    break;   
                case 'Scourer':
                    li.style.background = 'linear-gradient(to right, #0065b8,#d4a21b)'
                    break;
                case 'Tortuga':
                    li.style.background = 'linear-gradient(to right, #12100e,#d4b000)'
                    break; 
                case 'Barbarossa':
                    li.style.background = 'linear-gradient(to right, #143c57,#ff3230)'
                    break;
                case 'Atlas':
                    li.style.background = 'linear-gradient(to right, #311e13,#f46f00)'
                    break;
                case 'Zheng':
                    li.style.background = 'linear-gradient(to right, #557d74,#2e2b35)'
                    break; 
                case 'Raleigh':
                    li.style.background = 'linear-gradient(to right, #b1b0ab,#0781d2)';
                    break;                           
        }

        mark.textContent = `${el.name} - ${el.mechName}`;
        small.textContent = `${el.wins} wins`
        li.appendChild(mark);
        li.appendChild(small);
        ranking.appendChild(li);





    })
}