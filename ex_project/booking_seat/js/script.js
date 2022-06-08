const seatContainer = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

getLocalStorageData();

function updateSelected() {
    const selectedSeat = document.querySelector('.row .seat.selected');

    const seatIndex = [...seats].indexOf(selectedSeat);
    localStorage.setItem('selectedSeat', JSON.stringify(seatIndex));
}

// LocalStorage에 저장된 값을 가져와서 UI에 반영하기
function getLocalStorageData() {
    // 예약된 정보
    // TODO: localStorage가 아닌 Database와 연결 필요
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeat'));
    if (occupiedSeats !== null && occupiedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (occupiedSeats.indexOf(index) > -1) {
                seat.classList.add('occupied');
            }
        })
    }

    // 내가 예약했던 정보
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
    if (selectedSeat !== null && selectedSeat >= 0) {
        seats[selectedSeat].classList.add('selected');
    }
}

seatContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        const selectedSeat = document.querySelector('.row .seat.selected');

        const seatIndex = [...seats].indexOf(selectedSeat);
        if (seatIndex === -1) {
            e.target.classList.add('selected');
        } else {
            e.target.classList.remove('selected');
        }

        updateSelected();
    }
})

// Seat Book
function seatBookFunc() {
    // TODO: Database와 연동해서 처리해야함
    const selectedSeat = document.querySelector('.row .seat.selected');
    
    const seatIndex = [...seats].indexOf(selectedSeat);
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeat')) || [];

    if (!occupiedSeats.includes(seatIndex) && seatIndex > -1) {
        occupiedSeats.push(seatIndex)
        selectedSeat.classList.replace('selected', 'occupied');
    }

    localStorage.setItem('occupiedSeat', JSON.stringify(occupiedSeats));
    localStorage.removeItem('selectedSeat');
}