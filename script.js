// Quiz data
const quizData = [
    {
        question: " Do you enjoy solving puzzles or riddles that require logical thinking?",
        options: ["Yes", "No"],
    },
    {
        question: "Are you comfortable working with numbers and mathematical concepts?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy experimenting or understanding how things work (e.g., machines, computers, gadgets)?",
        options: ["Yes", "No"],
    },
    {
        question: "Are you curious about natural phenomena, scientific laws, and conducting experiments?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy drawing, painting, or creating art in any form?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you like designing things (e.g., clothes, buildings, interiors, etc.)?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy writing stories, essays, or creating content?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you find it easy to express yourself through words, whether verbally or in writing?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy solving real-life problems or making decisions in complex situations?",
        options: ["Yes", "No"],
    },
    {
        question: "Are you comfortable analyzing and interpreting data or research to solve problems?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you have an interest in understanding business operations, trade, and economics?",
        options: ["Yes", "No"],
    },
    {
        question: "Are you comfortable managing finances, understanding investments, or running a small business?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy interacting with people and working in teams?",
        options: ["Yes", "No"],
    },
    {
        question: " Do you find it easy to communicate with people and build relationships?",
        options: ["Yes", "No"],
    },
    {
        question: " Do you enjoy working on technical projects or learning to use new tools and technologies?",
        options: ["Yes", "No"],
    },
    {
        question: " Are you comfortable with practical work such as repairing, assembling, or working with your hands?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you feel confident taking on leadership roles or managing people and projects?",
        options: ["Yes", "No"],
    },
    {
        question: " Do you enjoy planning, organizing, and ensuring tasks are completed on time?",
        options: ["Yes", "No"],
    },
    {
        question: "Do you enjoy helping others, and are you interested in professions like teaching, healthcare, or social work?",
        options: ["Yes", "No"],
    },
    {
        question: " Are you interested in studying human behavior, culture, or society (e.g., psychology, sociology)?",
        options: ["Yes", "No"],
    },
];

const careerSuggestions = [
    "Technology or Engineering: Your analytical skills and problem-solving abilities make you well-suited for careers in software development, data science, or engineering.",
    "Healthcare or Education: Your passion for helping others and preference for interactive environments suggest careers in nursing, teaching, or counseling.",
    "Arts or Design: Your creative talents and preference for expressive work environments indicate potential success in graphic design, interior design, or multimedia arts.",
    "Business or Management: Your organizational skills and leadership potential point towards careers in project management, human resources, or business administration.",
    "Science or Research: Your analytical mindset and curiosity make you an excellent candidate for careers in scientific research, laboratory work, or academic pursuits."
];

// DOM elements
const quizIntro = document.getElementById("quiz-intro");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const startQuizBtn = document.getElementById("start-quiz");
const progressBar = document.getElementById("progress-bar");
const modeToggle = document.getElementById("mode-toggle");
const searchForm = document.querySelector(".search-form");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const main = document.querySelector("main");

// Quiz variables
let currentQuestion = 0;
let userAnswers = [];

// Event listeners
if (startQuizBtn) startQuizBtn.addEventListener("click", startQuiz);
if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
modeToggle.addEventListener("change", toggleDarkMode);
if (searchForm) searchForm.addEventListener("submit", handleSearch);
if (sidebarToggle) sidebarToggle.addEventListener("click", toggleSidebar);

// Initialize the page
document.addEventListener("DOMContentLoaded", initializePage);

// Quiz functions
function startQuiz() {
    quizIntro.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    updateProgressBar();
}

function displayQuestion() {
    const question = quizData[currentQuestion];
    const optionsHtml = question.options
        .map((option, index) => `
            <label class="option">
                <input type="radio" name="answer" value="${index}">
                <span>${option}</span>
            </label>
        `)
        .join("");

    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <form id="quiz-form">
            ${optionsHtml}
        </form>
    `;
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers.push(parseInt(selectedAnswer.value));
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            displayQuestion();
            updateProgressBar();
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.innerHTML = `<div id="progress-bar-fill" style="width: ${progress}%"></div>`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResult() {
    quizContainer.style.display = "none";
    const mostFrequent = userAnswers.sort((a, b) =>
        userAnswers.filter(v => v === a).length - userAnswers.filter(v => v === b).length
    ).pop();

    resultContainer.innerHTML = `
        <h3>Your Career Suggestion:</h3>
        <p>${careerSuggestions[mostFrequent]}</p>
        <button onclick="resetQuiz()" class="cta-button">Retake Quiz</button>
    `;
}

function resetQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizIntro.style.display = "block";
    quizContainer.style.display = "none";
    resultContainer.innerHTML = "";
}

// Dark mode functions
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
        document.body.classList.add("dark-mode");
        modeToggle.checked = true;
    }
}

// Sidebar functions
function toggleSidebar() {
    sidebar.classList.toggle("open");
    main.classList.toggle("sidebar-open");
    localStorage.setItem("sidebarOpen", sidebar.classList.contains("open"));
}

function initializeSidebar() {
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState === "true") {
        toggleSidebar();
    }
}

// Search function
function handleSearch(e) {
    e.preventDefault();
    const searchTerm = e.target.querySelector("input").value;
    alert(`Searching for: ${searchTerm}`);
    // Implement actual search functionality here
}

// Form handling
function initializeForms() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactForm);
    }

    const authForms = document.querySelectorAll(".auth-form form");
    authForms.forEach(form => {
        form.addEventListener("submit", handleAuthForm);
    });
}

function handleContactForm(e) {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    e.target.reset();
}

function handleAuthForm(e) {
    e.preventDefault();
    const formType = e.target.closest(".auth-form").id === "signin-form" ? "Sign In" : "Sign Up";
    alert(`${formType} successful! Welcome to Career Compass.`);
    e.target.reset();
}

// Page initialization
function initializePage() {
    initializeDarkMode();
    initializeSidebar();
    initializeForms();

    // Set active navigation link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");
    sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Initialize quiz if on quiz page
    if (questionContainer) {
        displayQuestion();
    }
}

// Event listener for closing sidebar when clicking outside
document.addEventListener("click", (e) => {
    if (sidebar && sidebar.classList.contains("open") && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        toggleSidebar();
    }
});

// Save sidebar state before unloading the page
window.addEventListener("beforeunload", () => {
    localStorage.setItem("sidebarOpen", sidebar.classList.contains("open"));
});