let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
});

// colab slide
const main = document.querySelector("main");
const slideWrapper = document.querySelector(".slide-wrapper");
const slides = document.querySelectorAll(".slide");
const btns = document.querySelectorAll(".btn");

let currentIndex = 0;

function initializeSlide() {
    slides[0].style.opacity = "1";
    slides[0].classList.add("active");
}

function updateSlide() {
    const mainWidth = main.offsetWidth;
    const translateValue = currentIndex * -mainWidth;
    slideWrapper.style.transform = `translateX(${translateValue}px)`;

    btns.forEach((btn, index) => {
        btn.classList.toggle("active", index === currentIndex);
    });

    slides.forEach((slide, index) => {
        slide.style.opacity = index === currentIndex ? "1" : "0";
        slide.classList.toggle("active", index === currentIndex);
    })
}

btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentIndex = index;
        updateSlide();
    });
});

window.addEventListener("resize", () => {
    updateSlide();
});

initializeSlide()