document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const image = document.getElementById('image').files[0];

    if (!image) {
        alert("사진을 선택해 주세요.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const reviewsDiv = document.getElementById('reviews');
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<strong>${name}</strong><p>${review}</p><img src="${e.target.result}" alt="후기 이미지">`;
        reviewsDiv.appendChild(newReview);
    };
    reader.readAsDataURL(image);

    document.getElementById('reviewForm').reset();
});

// 관리자 비밀번호 삭제 기능 추가
const ADMIN_PASSWORD = "k8h6m4k7h5j3"; // 관리자 비밀번호 설정

document.getElementById('adminDeleteButton').addEventListener('click', function() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        const reviewsDiv = document.getElementById('reviews');
        reviewsDiv.innerHTML = ''; // 모든 후기를 삭제
        alert("모든 후기가 삭제되었습니다.");
    } else {
        alert("잘못된 비밀번호입니다.");
    }
});
