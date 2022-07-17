const imgSlidePrev = document.getElementById("img-slide-prev");
const imgSlideNext = document.getElementById("img-slide-next");
const imgDots = document.getElementsByClassName('dot');

if (imgSlidePrev) {
  imgSlidePrev.addEventListener("click", () => {
    plusSlides(-1);
  });
}

if (imgSlideNext) {
  imgSlideNext.addEventListener("click", () => {
    plusSlides(1);
  });
}

if (imgDots) {
  for (let idx = 0; idx < imgDots.length; idx++) {
    imgDots[idx].addEventListener("click", () => {
      moveSlides(idx);
    })
  }
}

let slideIndex = 1;
showImgSlides(slideIndex);

function plusSlides(num) {
  showImgSlides(slideIndex += num);
}

function moveSlides(num) {
  showImgSlides(slideIndex = num+1)
}

function showImgSlides(num) {
  let imgSlides = document.getElementsByClassName("product-img-slides");
  if (num > imgSlides.length) {
    slideIndex = 1;
  } else if (num < 1) {
    slideIndex = imgSlides.length;
  }

  for (let idx = 0; idx < imgSlides.length; idx++) {
    imgSlides[idx].classList.remove("d-block");
    imgSlides[idx].classList.add("d-none");
    imgDots[idx].classList.remove('active');
  }
  imgSlides[slideIndex - 1].classList.remove("d-none");
  imgSlides[slideIndex - 1].classList.add("d-block");
  imgDots[slideIndex - 1].classList.add('active');
}
