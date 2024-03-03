const span = document.querySelector('span');

const card = 
`<div class="container1">
    <h2></h2>
    <div class="container2">
        <div class = "card">
            <h3>GIORNI</h3>
            <p id = "days">0</p>
        </div>
        <div class = "card">
            <h3>ORE</h3>
            <p id = "hours">0</p>
        </div>
        <div class = "card">
            <h3>MINUTI</h3>
            <p id = "minutes">0</p>
        </div>
        <div class = "card">
            <h3>SECONDI</h3>
            <p id = "seconds">0</p>
        </div>
    </div>
</div>`;


function getNextThursday() {
    var today = new Date();
    var nextThursday = new Date(today.getTime());

    nextThursday.setDate(today.getDate() + (4 + 7 - today.getDay()) % 7);
    nextThursday.setHours(16);
    nextThursday.setMinutes(30);
    nextThursday.setSeconds(0);
    nextThursday.setMilliseconds(0);

    return nextThursday;
}

function calcDate(date) {
    const dataOggi = Date.now();
    const data = new Date(date);
    const deltaS = data - dataOggi;
    const nGiorni = Math.floor(deltaS / 86400 / 1000);
    const nOre = Math.floor((deltaS / 3600 / 1000) - (nGiorni * 24));
    const nMinuti = Math.floor((deltaS / 60 / 1000) - (nGiorni * 24 * 60) - (nOre * 60));
    const nSecondi = Math.floor((deltaS / 1000) - (nGiorni * 24 * 60 * 60) - (nOre * 60 * 60) - (nMinuti * 60));
    
    return {
        nGiorni,
        nOre,
        nMinuti,
        nSecondi
    };

}

fetch("https://countdown.pockethost.io/api/collections/countdowns/records")
.then((response) => response.json())
.then((json) => {

    json.items.push(json.items[0])
    json.items[0] = {
        "title": "Giovedi",
        "date": getNextThursday()
    }
    const countdowns = json.items;

    for (let i = 0; i < countdowns.length; i++) {
        span.innerHTML += card;
    }
    
    const days = document.querySelectorAll('p#days');
    const hours = document.querySelectorAll('p#hours');
    const minutes = document.querySelectorAll('p#minutes');
    const seconds = document.querySelectorAll('p#seconds');
    const h2 = document.querySelectorAll('h2');
    
    setInterval(function() {
    
        for (let i = 0; i < countdowns.length; i++) {
            const hey = calcDate(countdowns[i].date);   
            h2[i].innerHTML = countdowns[i].title;
            days[i].innerHTML =  hey.nGiorni;
            hours[i].innerHTML = hey.nOre;
            minutes[i].innerHTML = hey.nMinuti;
            seconds[i].innerHTML = hey.nSecondi;
        }
    
    }, 1000);
});



    

