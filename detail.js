document.addEventListener('DOMContentLoaded', () => {
    // 1. 저장된 책 데이터 가져오기
    const bookData = JSON.parse(localStorage.getItem('selectedBook'));

    if (bookData) {
        // 2. 화면 초기 데이터 업데이트
        document.getElementById('detail-title').innerText = bookData.title;
        document.getElementById('detail-authors').innerText = bookData.authors.join(', ');
        document.getElementById('detail-price').innerText = bookData.sale_price.toLocaleString();
        document.getElementById('detail-desc').innerText = bookData.contents || '상세 내용이 없습니다.';
        document.getElementById('detail-thumb').src = bookData.thumbnail;

        // 초기 합계 금액 설정
        updateTotalPrice();
    } else {
        alert('도서 정보를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});

// [기능] 수량 변경 함수
window.changeQuantity = (delta) => {
    const quantityInput = document.getElementById('quantity');
    let val = parseInt(quantityInput.value) + delta;
    
    if (val < 1) val = 1; // 1 미만 방지
    quantityInput.value = val;
    
    updateTotalPrice(); // 수량 변경 시 합계 업데이트
};

// [기능] 합계 금액 계산 함수
function updateTotalPrice() {
    const bookData = JSON.parse(localStorage.getItem('selectedBook'));
    const qty = document.getElementById('quantity').value;
    const total = bookData.sale_price * parseInt(qty);
    
    document.getElementById('total-price').innerText = total.toLocaleString();
}

// [기능] 장바구니 담기 함수
window.addToCart = () => {
    const bookData = JSON.parse(localStorage.getItem('selectedBook'));
    const qty = document.getElementById('quantity').value;
    
    // 기존 장바구니 불러오기 (없으면 빈 배열)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 현재 상품 추가
    const cartItem = { ...bookData, count: parseInt(qty) };
    cart.push(cartItem);
    
    // 저장
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${bookData.title}이(가) 장바구니에 담겼습니다.`);
};
