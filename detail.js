document.addEventListener('DOMContentLoaded', () => {
    // 1. 저장된 책 데이터 가져오기
    const bookData = JSON.parse(localStorage.getItem('selectedBook'));

    // 2. 데이터가 있을 경우 화면 업데이트
    if (bookData) {
        document.getElementById('detail-title').innerText = bookData.title;
        document.getElementById('detail-authors').innerText = bookData.authors.join(', ');
        document.getElementById('detail-price').innerText = bookData.sale_price.toLocaleString(); // 숫자 천 단위 콤마
        document.getElementById('detail-desc').innerText = bookData.contents || '상세 내용이 없습니다.';
        document.getElementById('detail-thumb').src = bookData.thumbnail;
    } else {
        alert('도서 정보를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});