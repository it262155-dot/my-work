document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const container = document.querySelector('.carousel-container');

  if (!track || !prevBtn || !nextBtn || !container) return;

  /* ===== カードデータ ===== */
  const items = [
    {
      title: '石炭発電',
      image: 'image/sekitan.png',
      description: '火力発電の一種で、燃料として石炭を使用します。※ゲーム内では、石油よりも火力が高い設定です。'
    },
    {
      title: '水力発電',
      image: 'image/mizu.png',
      description: '高所からの水の位置エネルギーを活用して発電します。※ゲーム内では、ただの水鉄砲として描かれています。'
    },
    {
      title: '風力発電',
      image: 'image/kaze.png',
      description: '電磁誘導の仕組みを利用して発電する再生可能エネルギーです。※ゲーム内では、太陽光発電よりもバッテリーの自動回復速度が遅い設定です。'
    },
    {
      title: '太陽発電',
      image: 'image/taiyou.png',
      description: '太陽の光エネルギーをシリコン半導体によって電気エネルギーに変換しています。※ゲーム内では、太陽光を浴びることでバッテリーが自動回復します。'
    },
    {
      title: '石油発電',
      image: 'image/sekiyu.png',
      description: '火力発電の一種で、石油を燃料としています。※ゲーム内では、石炭よりも火力が低い設定です。'
    }
  ];

  /* ===== 無限ループ用配列 ===== */
  const extendedItems = [
    items[items.length - 1],
    ...items,
    items[0]
  ];

  const itemWidth = 340 + 40;
  let currentIndex = 1;
  let isAnimating = false;

  /* ===== 初期化 ===== */
  function initCarousel() {
    track.innerHTML = '';

    extendedItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'carousel-item';

      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>

        <button class="vote-button" data-title="${item.title}">
          投票する！
        </button>
      `;

      track.appendChild(div);
    });

    track.style.width = `${extendedItems.length * itemWidth}px`;
    moveToIndex(currentIndex, false);
  }

  /* ===== 中央揃え処理 ===== */
  function moveToIndex(index, animate = true) {
    isAnimating = true;

    track.style.transition = animate
      ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none';

    const containerWidth = container.offsetWidth;
    const trackContainerWidth = containerWidth - 160;
    const centerOffset = (trackContainerWidth - itemWidth) / 2;

    track.style.transform =
      `translateX(${centerOffset - index * itemWidth}px)`;

    updateActiveState();

    setTimeout(() => {
      isAnimating = false;
    }, animate ? 600 : 0);
  }

  /* ===== active制御 ===== */
  function updateActiveState() {
    const cards = document.querySelectorAll('.carousel-item');

    cards.forEach((card, index) => {
      card.classList.remove('active');

      const realIndex =
        (index - 1 + items.length) % items.length;

      const activeIndex =
        (currentIndex - 1 + items.length) % items.length;

      if (realIndex === activeIndex) {
        card.classList.add('active');
      }
    });
  }

  /* ===== 次へ ===== */
  function nextSlide() {
    if (isAnimating) return;

    currentIndex++;
    moveToIndex(currentIndex);

    if (currentIndex === extendedItems.length - 1) {
      setTimeout(() => {
        currentIndex = 1;
        moveToIndex(currentIndex, false);
      }, 600);
    }
  }

  /* ===== 前へ ===== */
  function prevSlide() {
    if (isAnimating) return;

    currentIndex--;
    moveToIndex(currentIndex);

    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = extendedItems.length - 2;
        moveToIndex(currentIndex, false);
      }, 600);
    }
  }


  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  window.addEventListener('resize', () => {
    moveToIndex(currentIndex, false);
  });

  initCarousel();
});
