function showPage(pageId) {
    document.querySelectorAll('.page-container').forEach(div => div.classList.add('hidden'));
    
    const activePage = document.getElementById(pageId);
    activePage.classList.remove('hidden');

    const video = activePage.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Video Play Blocked: ", e));
    }
}

document.getElementById('ratingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const insta = document.getElementById('instaLink').value;
    const stars = document.querySelector('input[name="stars"]:checked')?.value || 0;
    const fileInput = document.getElementById('selfie');

    const reader = new FileReader();
    reader.onload = function() {
        const userData = { name, insta, stars, photo: reader.result };
        localStorage.setItem('userReview', JSON.stringify(userData));
        
        // Show the Thank You Page instead of a simple alert
        showPage('thank-you-page');
    };
    reader.readAsDataURL(fileInput.files[0]);
});

function showReviewPage() {
    const data = JSON.parse(localStorage.getItem('userReview'));
    const container = document.getElementById('reviewContainer');

    if (!data) {
        container.innerHTML = "<h3>No Review Found!</h3><p>Please submit a rating first.</p>";
    } else {
        container.innerHTML = `
            <img src="${data.photo}" alt="User Photo">
            <h2 style="color:#f1c40f">${"★".repeat(data.stars)}</h2>
            <h3>${data.name}</h3>
            <p><a href="${data.insta}" target="_blank" style="color:#3498db; text-decoration:none;">Follow on Instagram</a></p>
        `;
    }
    showPage('review-page');
}