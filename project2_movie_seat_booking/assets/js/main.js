console.log('primer 2');

const form = document.querySelector('#pick_movie_form');
const movie_select = document.querySelector('#movie');
let ticketPrice = parseInt(movie_select.value);
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const countSelectedSeats = document.querySelector('#count');
const total = document.querySelector('#total');

// select movie 
(function(){
    movie_select.addEventListener('change', () => {
        console.log(movie_select.value);
        ticketPrice = parseInt(movie_select.value);
        console.log(movie_select.selectedIndex);
        setMovieData(movie_select.selectedIndex, movie_select.value);
        let update = updateSelected();
            update();
        return ticketPrice;
    });
})();

// biranje sedista na klik
seats.forEach(seat => {
    seat.addEventListener('click', (e) => {
        e.preventDefault();
        if(seat.classList.contains('occupied')){
            console.log('greska');
        }
        else{
            seat.classList.toggle('selected');
            let update = updateSelected();
            update();
        }
       
    });
   
});

// sacuvaj selektovan film i njegovu cenu
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMoiveIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

// Update tatal and count
function updateSelected(){

    const selectedSeats = document.querySelectorAll('.row .selected');
    const selectedSeatsCount = selectedSeats.length;
    
    // niz indexa izabranih sedista
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })
    // local storage cuva string
    // posto ja zelim da sacuva niz koristim metodu JSON.stringify
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    function updateTotal(){
        
        countSelectedSeats.innerHTML = selectedSeatsCount;
        total.innerHTML = selectedSeatsCount * ticketPrice;
        
    }

    return updateTotal;
}

