const days = document.querySelector('p#days');
const hours = document.querySelector('p#hours');
const minutes = document.querySelector('p#minutes');
const seconds = document.querySelector('p#seconds');


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

function calcDates() {
    const dataOggi = Date.now();
    const prossimoGiovedi = getNextThursday();
    const deltaS = prossimoGiovedi - dataOggi;
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




setInterval(function() {
    const { nGiorni, nOre, nMinuti, nSecondi } = calcDates();
    console.log('Giorni: ' + nGiorni + ' Ore: ' + nOre + ' Minuti: ' + nMinuti + ' Secondi: ' + nSecondi);
    days.innerHTML =  nGiorni;
    hours.innerHTML = nOre;
    minutes.innerHTML = nMinuti;
    seconds.innerHTML = nSecondi;
}, 1000);
    

