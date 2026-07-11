/*ローディング*/
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const logo = document.querySelector(".loading-logo");
  const text = document.querySelector(".loading-text");

  // ロゴをスラッと表示
  setTimeout(() => {
    logo.classList.add("is-active");
  }, 200);

  // テキスト表示
  setTimeout(() => {
    text.classList.add("is-active");
  }, 600);

  // ローディング終了
  setTimeout(() => {
    loading.style.opacity = "0";
    loading.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
      loading.style.display = "none";
    }, 600);
  }, 1800);
});


/*スライダー*/
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector('.dots');

    let current = 0;
    const interval = 3000;

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    function updateSlides(){
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[current].classList.add('active');
        dots[current].classList.add('active');

        const offset = (track.clientWidth / 2) - (slides[current].clientWidth / 2);
        const moveX = -(slides[current].offsetLeft - offset);
        track.style.transform = `translateX(${moveX}px)`;
    }

    function goToSlide(index){
        current = index;
        updateSlides();
        resetTimer();
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateSlides();
    }

    let timer = setInterval(nextSlide,interval);

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(nextSlide,interval);
    }
    updateSlides();
})

