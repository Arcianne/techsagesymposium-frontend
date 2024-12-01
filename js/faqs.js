const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

const searchInput = document.querySelector('.search-container input'); 

searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase(); 

    if (searchQuery === "") {
        faqItems.forEach(item => item.style.display = 'block'); 
        return;
    }

    faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question p').textContent.toLowerCase(); 
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase(); 
        if (questionText.includes(searchQuery) || answerText.includes(searchQuery)) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
});