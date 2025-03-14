// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Featured Posts Carousel
const featuredPosts = [
    {
        title: "The Philosophy of Technology",
        excerpt: "Examining how technology shapes human experience...",
        url: "/posts/sample-post.html",
        image: "/assets/images/featured-1.jpg"
    },
    // Add more featured posts
];

function createCarousel() {
    const carousel = document.querySelector('.featured-carousel');
    let currentIndex = 0;

    function updateCarousel() {
        const post = featuredPosts[currentIndex];
        carousel.innerHTML = `
            <a href="${post.url}" class="carousel-item">
                <img src="${post.image}" alt="${post.title}" class="carousel-image">
                <div class="carousel-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                </div>
            </a>
        `;
        currentIndex = (currentIndex + 1) % featuredPosts.length;
    }

    updateCarousel();
    setInterval(updateCarousel, 5000);
}

// Content Grid Population
const samplePosts = Array.from({ length: 9 }, (_, i) => ({
    title: `Post ${i + 1}`,
    excerpt: "This is a sample post excerpt that demonstrates...",
    category: ["Philosophy", "Tech", "Politics"][i % 3],
    date: new Date().toISOString().split('T')[0],
    url: `/posts/post-${i + 1}.html`,
    image: `/assets/images/post-${(i % 3) + 1}.jpg`
}));

function populateGrid(posts) {
    const grid = document.querySelector('.content-grid');
    grid.innerHTML = posts.map(post => `
        <article class="post-card" data-category="${post.category}">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3><a href="${post.url}">${post.title}</a></h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
            </div>
        </article>
    `).join('');
}

// Load More Button
let currentPage = 1;
document.addEventListener('click', (e) => {
    if (e.target.matches('#load-more')) {
        currentPage++;
        // Simulate API call
        const morePosts = samplePosts.slice((currentPage - 1) * 3, currentPage * 3);
        if (morePosts.length) {
            const grid = document.querySelector('.content-grid');
            grid.innerHTML += morePosts.map(/* same as populateGrid */).join('');
        }
    }
});

// Search Functionality
document.getElementById('search-input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = samplePosts.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term)
    );
    populateGrid(filtered);
});

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    // Add your newsletter service integration here
    alert(`Thanks for subscribing!`);
    e.target.reset();
});

// Intersection Observer for Lazy Loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCarousel();
    populateGrid(samplePosts);
    
    // Initialize Analytics
    window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments)
    }
});
