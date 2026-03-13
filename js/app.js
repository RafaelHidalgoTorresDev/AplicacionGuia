// Constants and Variables
const homeScreen = document.getElementById('home-screen');
const tutorialScreen = document.getElementById('tutorial-screen');
const successScreen = document.getElementById('success-screen');

const tutorialListContainer = document.getElementById('tutorial-list-container');
const btnBack = document.getElementById('btn-back');
const btnHome = document.getElementById('btn-home');

const stepTitle = document.getElementById('step-title');
const stepImage = document.getElementById('step-image');
const stepDescription = document.getElementById('step-description');

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnFinish = document.getElementById('btn-finish');

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

let currentTutorial = null;
let currentStepIndex = 0;

// Initialize Application
function init() {
    renderTutorialList();
    attachEventListeners();
}

// Render the list of available tutorials on the home screen
function renderTutorialList() {
    tutorialListContainer.innerHTML = '';

    tutorialsData.forEach(tutorial => {
        const card = document.createElement('div');
        card.className = 'tutorial-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
            <span class="material-icons card-icon">${tutorial.icon}</span>
            <div class="card-content">
                <h3>${tutorial.title}</h3>
                <p>${tutorial.description}</p>
            </div>
            <span class="material-icons card-arrow">chevron_right</span>
        `;

        // Start tutorial on click
        card.addEventListener('click', () => startTutorial(tutorial));

        // Accessibility: Allow activating with Keyboard Enter/Space
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startTutorial(tutorial);
            }
        });

        tutorialListContainer.appendChild(card);
    });
}

// Start a specific tutorial
function startTutorial(tutorial) {
    currentTutorial = tutorial;
    currentStepIndex = 0;

    showScreen('tutorial-screen');
    renderStep();
}

// Render the current step
function renderStep() {
    const step = currentTutorial.steps[currentStepIndex];
    const totalSteps = currentTutorial.steps.length;

    // Update content
    stepTitle.textContent = step.title;
    stepDescription.textContent = step.description;

    // Update image
    stepImage.src = step.image;
    stepImage.alt = step.title;

    // Update progress
    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `Paso ${currentStepIndex + 1} de ${totalSteps}`;

    // Update buttons visibility
    btnPrev.disabled = currentStepIndex === 0;

    if (currentStepIndex === totalSteps - 1) {
        // Last step
        btnNext.classList.add('btn-hidden');
        btnFinish.classList.remove('btn-hidden');
    } else {
        // Not last step
        btnNext.classList.remove('btn-hidden');
        btnFinish.classList.add('btn-hidden');
    }
}

// Navigation Handlers
function handleNext() {
    if (currentStepIndex < currentTutorial.steps.length - 1) {
        currentStepIndex++;
        renderStep();
    }
}

function handlePrev() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep();
    }
}

function finishTutorial() {
    showScreen('success-screen');
}

function returnHome() {
    currentTutorial = null;
    currentStepIndex = 0;
    showScreen('home-screen');
}

// Utility to switch screens
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        s.classList.remove('view-active');
        s.classList.add('view-hidden');
    });

    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('view-hidden');
        target.classList.add('view-active');
    }
}

// Attach all static event listeners
function attachEventListeners() {
    btnBack.addEventListener('click', returnHome);
    btnHome.addEventListener('click', returnHome);

    btnNext.addEventListener('click', handleNext);
    btnPrev.addEventListener('click', handlePrev);
    btnFinish.addEventListener('click', finishTutorial);
}

// Start app on DOM load
document.addEventListener('DOMContentLoaded', init);
