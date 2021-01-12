console.log('primer 2');

const form = document.querySelector('#pick_movie_form');
const movie_select = document.querySelector('#movie');
let ticketPrice = parseInt(movie_select.value);
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const countSelectedSeats = document.querySelector('#count');
const total = document.querySelector('#total');

populateUI();

// select movie 
(function(){
    movie_select.addEventListener('change', () => {
        // console.log(movie_select.value);
        ticketPrice = parseInt(movie_select.value);
        // console.log(movie_select.selectedIndex);
        setMovieData(movie_select.selectedIndex, movie_select.value);

        // pozivam funkciju updateSelected da bi se ukupna cena promenila promenom filma
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

// sacuvaj selektovan film i njegovu cenu u local storage
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

// dohvati vrednosti iz local storage
function populateUI(){
    // zato sto sam niz prebacio u string metodom JSON.stringify
    // sada moram vratiti u prvobitno stanje metodom JSON.parse
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) != -1){
                seat.classList.add('selected');
            }
        }); 
    }

    const selectedMovieIndex = localStorage.getItem('selectedMoiveIndex');
    // console.log(selectedMovieIndex);
    if(selectedMovieIndex !== null){
        movie_select.selectedIndex = selectedMovieIndex;
    }

    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMovieIndex !== null){
        ticketPrice = selectedMoviePrice;
    }


}

// initial count and total set
const updateSelectedCount = updateSelected();
updateSelectedCount();