
const bannerContainer = document.getElementById('bannerContainer');

// Swiper 초기화
const swiper = new Swiper('.mySwiper', {
  loop: true, 
  autoplay: false,
  pagination: {
    el: '.custom-pagination',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      return `<span class="current">${current}</span> - <span class="total">${total}</span>`;
    }
  },
  
  // 슬라이드 변경 이벤트 감지 및 배경색 변경 로직 추가
  on: {
    slideChange: function () {
      // 주석: loop 모드일 때는 실시간으로 복사된 슬라이드가 섞이므로 
      // 현재 화면에 보이는 활성화된 슬라이드(slides[activeIndex])를 정확히 타겟팅해야 합니다.
      const currentSlide = this.slides[this.activeIndex];
      
      if (currentSlide) {
        // 슬라이드에 지정된 data-bg-color 속성 가져오기
        const newBgColor = currentSlide.getAttribute('data-bg-color');
        
        // 값이 존재하면 컨테이너 배경색 변경
        if (newBgColor) {
          bannerContainer.style.backgroundColor = newBgColor;
        }
      }
    }
  }
});

// 재생 / 일시정지 토글 로직
const togglePlayBtn = document.querySelector('.btn-toggle-play');
const icon = togglePlayBtn.querySelector('.icon');

togglePlayBtn.addEventListener('click', function() {
  if (swiper.autoplay.running) {
    swiper.autoplay.stop();
    icon.textContent = '▶';
    togglePlayBtn.setAttribute('aria-label', '재생');
  } else {
    swiper.autoplay.start();
    icon.textContent = '||';
    togglePlayBtn.setAttribute('aria-label', '일시정지');
  }
});