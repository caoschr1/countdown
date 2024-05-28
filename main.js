const span = document.querySelector('span');

localStorage.setItem('token', "f01119c50272cd6bca4296e3715f94833f7764c085ec5a6a50344857f6ef3ee9d2f774db3c1a11ebdc382d31900d931f3b169fbb9776374c54d5d6cf96d426a6");

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

async function display() {
    const response = await getRequest("getCountdown");
    console.log(response);

    //add an element at the start of the array
    response.unshift({
        "titolo": "Giovedi",
        "datac": getNextThursday()
    });

    for (let i = 0; i < response.length; i++) {
        span.innerHTML += card;
    }

    const days = document.querySelectorAll('p#days');
    const hours = document.querySelectorAll('p#hours');
    const minutes = document.querySelectorAll('p#minutes');
    const seconds = document.querySelectorAll('p#seconds');
    const h2 = document.querySelectorAll('h2');

    setInterval(function() {
            
            for (let i = 0; i < response.length; i++) {
                const hey = calcDate(response[i].datac);   
                h2[i].innerHTML = response[i].titolo;
                days[i].innerHTML =  hey.nGiorni;
                hours[i].innerHTML = hey.nOre;
                minutes[i].innerHTML = hey.nMinuti;
                seconds[i].innerHTML = hey.nSecondi;
            }
    
        }, 1000);
    
}

display();

// fetch("https://countdown.pockethost.io/api/collections/countdowns/records?sort=date")
// .then((response) => response.json())
// .then((json) => {

//     json.items.push(json.items[0])
//     json.items[0] = {
//         "title": "Giovedi",
//         "date": getNextThursday()
//     }
//     const countdowns = json.items;

//     for (let i = 0; i < countdowns.length; i++) {
//         span.innerHTML += card;
//     }
    
//     const days = document.querySelectorAll('p#days');
//     const hours = document.querySelectorAll('p#hours');
//     const minutes = document.querySelectorAll('p#minutes');
//     const seconds = document.querySelectorAll('p#seconds');
//     const h2 = document.querySelectorAll('h2');
    
//     setInterval(function() {
    
//         for (let i = 0; i < countdowns.length; i++) {
//             const hey = calcDate(countdowns[i].date);   
//             h2[i].innerHTML = countdowns[i].title;
//             days[i].innerHTML =  hey.nGiorni;
//             hours[i].innerHTML = hey.nOre;
//             minutes[i].innerHTML = hey.nMinuti;
//             seconds[i].innerHTML = hey.nSecondi;
//         }
    
//     }, 1000);
// });



    

