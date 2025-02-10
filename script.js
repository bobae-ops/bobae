const adminPassword = "k8h6m4k7h5j3"; // 관리자 비밀번호 (예시)
let isAdminLoggedIn = false; // 관리자 로그인 상태

// 페이지 로드 시 저장된 후기를 불러오기
window.onload = function() {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.forEach(review => {
        addReviewToDOM(review.text, review.image);
    });
};

document.getElementById('reviewForm').onsubmit = function(event) {
    event.preventDefault();

    const reviewText = document.getElementById('reviewInput').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        const review = { text: reviewText, image: imgSrc };

        // 로컬 스토리지에 후기 저장
        saveReviewToLocalStorage(review);

        // DOM에 후기 추가
        addReviewToDOM(reviewText, imgSrc);

        // 초기화
        document.getElementById('reviewInput').value = '';
        document.getElementById('imageUpload').value = '';
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
};

function saveReviewToLocalStorage(review) {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(savedReviews));
}

function addReviewToDOM(text, imgSrc) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const reviewContent = document.createElement('p');
    reviewContent.textContent = text;

    reviewDiv.appendChild(reviewContent);

    if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        reviewDiv.appendChild(img);
    }

    reviewsContainer.prepend(reviewDiv);
}

document.getElementById('adminLoginBtn').onclick = function() {
    const passwordInput = document.getElementById('adminPassword').value;

    if (passwordInput === adminPassword) {
        isAdminLoggedIn = true;
        document.getElementById('adminDeleteBtn').style.display = 'block'; // 후기 삭제 버튼 표시
        alert('관리자 로그인 성공');
    } else {
        alert('잘못된 비밀번호입니다.');
    }

    // 비밀번호 입력창 초기화
    document.getElementById('adminPassword').value = '';
};

document.getElementById('adminDeleteBtn').onclick = function() {
    if (!isAdminLoggedIn) {
        alert('관리자 로그인이 필요합니다.');
        return;
    }

    const reviews = document.querySelectorAll('.review');
    if (reviews.length > 0) {
        reviews[0].remove(); // 가장 최근 후기를 삭제
        removeReviewFromLocalStorage(0); // 로컬 스토리지에서도 삭제
        alert('가장 최근 후기가 삭제되었습니다.');
    } else {
        alert('삭제할 후기가 없습니다.');
    }
};

function removeReviewFromLocalStorage(index) {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.splice(index, 1); // 후기 삭제
    localStorage.setItem('reviews', JSON.stringify(savedReviews));
}
