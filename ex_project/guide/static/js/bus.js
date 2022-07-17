const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");

getLocalStorageData();

function updateSelected() {
  const selectedSeat = document.querySelector(".row .seat.selected");

  const seatIndex = [...seats].indexOf(selectedSeat);
  localStorage.setItem("selectedSeat", JSON.stringify(seatIndex));
}

// LocalStorage에 저장된 값을 가져와서 UI에 반영하기
function getLocalStorageData() {
  // 예약된 정보
  axios
    .post("/get_bus_status/A-1/17:30:00")
    .then(({ data }) => {
      for (let idx of data) {
        seats[idx - 1].classList.add("occupied");
      }
    })
    .catch((e) => {
      console.error(e);
    });

  // const occupiedSeats = JSON.parse(localStorage.getItem("occupiedSeat"));
  // if (occupiedSeats !== null && occupiedSeats.length > 0) {
  //   );
  // }

  // 내가 예약했던 정보
  const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));
  if (selectedSeat !== null && selectedSeat >= 0) {
    seats[selectedSeat].classList.add("selected");
  }
}

seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    const selectedSeat = document.querySelector(".row .seat.selected");

    const seatIndex = [...seats].indexOf(selectedSeat);
    if (seatIndex > -1) {
      selectedSeat.classList.remove("selected");
    }
    e.target.classList.add("selected");
    // if (seatIndex === -1) {
    //   e.target.classList.add("selected");
    //   beforeSelectedSeat = e.target;
    // } else {
    //   e.target.classList.remove("selected");
    // }
    updateSelected();
  }
});

// Seat Book
const seatBookBtn = document.getElementById("seat-book");
if (seatBookBtn) {
  seatBookBtn.addEventListener("click", () => {
    // TODO: Database와 연동해서 처리해야함
    const selectedSeat = document.querySelector(".row .seat.selected");

    const seatIndex = [...seats].indexOf(selectedSeat);
    const occupiedSeats =
      JSON.parse(localStorage.getItem("occupiedSeat")) || [];

    if (!occupiedSeats.includes(seatIndex) && seatIndex > -1) {
      occupiedSeats.push(seatIndex);
      selectedSeat.classList.replace("selected", "occupied");
    }

    let data = {
      seat: seatIndex,
    };

    axios
      .post("/bus", (data = data))
      .then((e) => {
        window.location.href = "/bus";
      })
      .catch((e) => {
        console.error(e);
      });
  });
}

const seatCancelBtn = document.getElementById("seat-cancel");
if (seatCancelBtn) {
  seatCancelBtn.addEventListener("click", () => {
    axios
      .delete("/bus")
      .then(({ data }) => {
        window.location.href = "/bus";
      })
      .catch((e) => {
        console.error(e);
      });
  });
}
