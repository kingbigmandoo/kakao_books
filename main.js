const REST_API_KEY = '5c75d452648fccc3e301fdf69d91b175'; 

async function searchBooks(targetId, queryKeyword) {
    const container = document.getElementById(targetId);
    
    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(queryKeyword)}&size=7`, {
            method: 'GET',
            headers: { 'Authorization': `KakaoAK ${REST_API_KEY}` }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const books = data.documents;

        if (!books || books.length === 0) {
            container.innerHTML = '<p>검색 결과가 없습니다.</p>';
            return;
        }

        container.innerHTML = ''; 
        
        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <img src="${book.thumbnail || 'https://via.placeholder.com/120x174'}" class="book-thumbnail">
                <div class="book-title">${book.title}</div>
                <div class="book-price">${book.sale_price ? book.sale_price.toLocaleString() + '원' : '가격미정'}</div>
            `;
            
            // [수정 완료] 클릭 시 데이터 저장 및 상세 페이지로 이동
            card.onclick = () => {
                localStorage.setItem('selectedBook', JSON.stringify(book));
                window.location.href = 'detail.html';
            };
            
            container.appendChild(card);
        });

    } catch (error) {
        console.error('에러 상세:', error);
        container.innerHTML = '<p>데이터 로드 실패</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM 완전히 로드됨");

    searchBooks('bookList', '베스트셀러'); 
    searchBooks('mdList', '자기계발');
    searchBooks('itList', 'IT');     
    
    // 2. 검색창 아이콘 클릭 시 검색 실행
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchKeyword');

    if (!searchBtn || !searchInput) {
        console.error("검색 버튼이나 입력창을 찾을 수 없습니다!");
        return;
    }

    const executeSearch = () => {
        const keyword = searchInput.value;
        if (keyword.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }
        // 검색 결과를 화면 최상단 또는 특정 영역(예: bookList)에 뿌려줍니다.
        window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
    };

    // 아이콘 클릭 시
    searchBtn.addEventListener('click', executeSearch);

    // [추가] 엔터키 입력 시에도 검색되게 설정
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });
});
