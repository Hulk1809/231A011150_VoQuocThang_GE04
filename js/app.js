// Mock Data
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genres: ["Sci-Fi", "Action"],
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genres: ["Action", "Crime", "Drama"],
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    {
        id: 4,
        title: "Avengers: Endgame",
        year: 2019,
        genres: ["Action", "Adventure", "Sci-Fi"],
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
        director: "Anthony Russo, Joe Russo",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
    },
    {
        id: 5,
        title: "The Matrix",
        year: 1999,
        genres: ["Action", "Sci-Fi"],
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        director: "Lana Wachowski, Lilly Wachowski",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    },
    {
        id: 6,
        title: "Spider-Man: No Way Home",
        year: 2021,
        genres: ["Action", "Adventure", "Fantasy"],
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vFAe4sEtx5.jpg",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
        director: "Jon Watts",
        cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"]
    },
    {
        id: 7,
        title: "The Godfather",
        year: 1972,
        genres: ["Crime", "Drama"],
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"]
    },
    {
        id: 8,
        title: "Parasite",
        year: 2019,
        genres: ["Comedy", "Drama", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        director: "Bong Joon Ho",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
    }
];

// App State
let currentMovies = [...movies];
let selectedGenres = new Set();
let searchQuery = "";

// DOM Elements
const movieGrid = document.getElementById('movieGrid');
const genreFilters = document.getElementById('genreFilters');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const themeToggle = document.getElementById('checkbox');
const modal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Initialize App
function init() {
    initTheme();
    renderGenres();
    renderMovies(currentMovies);
    setupEventListeners();
}

// Render Movies
function renderMovies(moviesToRender) {
    movieGrid.innerHTML = '';
    resultCount.textContent = `${moviesToRender.length} kết quả`;

    if (moviesToRender.length === 0) {
        movieGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem;">Không tìm thấy phim phù hợp.</p>';
        return;
    }

    moviesToRender.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-genres">${movie.genres.join(', ')}</div>
                <div class="movie-year">${movie.year}</div>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(movie));
        movieGrid.appendChild(card);
    });
}

// Render Geners Checkboxes dynamically
function renderGenres() {
    const allGenres = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => allGenres.add(genre));
    });

    const sortedGenres = Array.from(allGenres).sort();
    
    genreFilters.innerHTML = '';
    sortedGenres.forEach(genre => {
        const label = document.createElement('label');
        label.className = 'genre-item';
        label.innerHTML = `
            <input type="checkbox" value="${genre}">
            ${genre}
        `;
        genreFilters.appendChild(label);
    });
}

// Filter Logic combine genre and search
function applyFilters() {
    currentMovies = movies.filter(movie => {
        // Check genres
        const matchesGenre = selectedGenres.size === 0 || 
                             movie.genres.some(g => selectedGenres.has(g));
        
        // Check search query (case insensitive)
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesGenre && matchesSearch;
    });
    
    renderMovies(currentMovies);
}

// Debounce Function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Event Listeners
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Genre Filter Change
    genreFilters.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const genre = e.target.value;
            if (e.target.checked) {
                selectedGenres.add(genre);
            } else {
                selectedGenres.delete(genre);
            }
            applyFilters();
        }
    });

    // Search Input with Debounce (400ms)
    const handleSearch = debounce((e) => {
        searchQuery = e.target.value;
        applyFilters();
    }, 400);

    searchInput.addEventListener('input', handleSearch);

    // Modal Close
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Modal Functions
function openModal(movie) {
    modalBody.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
        <div class="modal-details">
            <h2 class="modal-title">${movie.title}</h2>
            <div class="modal-meta">
                <span><i class="far fa-calendar-alt"></i> ${movie.year}</span>
                <span><i class="fas fa-tags"></i> ${movie.genres.join(', ')}</span>
            </div>
            <p class="modal-description">${movie.description}</p>
            <div class="modal-cast">
                <h4>Đạo diễn</h4>
                <p>${movie.director}</p>
            </div>
            <div class="modal-cast">
                <h4>Diễn viên</h4>
                <p>${movie.cast.join(', ')}</p>
            </div>
        </div>
    `;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Theme Initialization
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no preference, or respect user preference
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeToggle.checked = false;
    } else {
        // Custom default (let's make it dark mode for neon vibe)
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
