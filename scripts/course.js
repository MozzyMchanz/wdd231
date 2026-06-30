// Dynamic academic tracking array module
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const container = document.getElementById("course-container");
const creditsDisplay = document.getElementById("total-credits");

function displayCourses(filteredCourses) {
    if (!container) return;
    container.innerHTML = "";

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.className = `course-card ${course.completed ? 'completed' : ''}`;
        div.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        container.appendChild(div);
    });

    // Use Array.reduce to compute credits dynamically
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    if (creditsDisplay) {
        creditsDisplay.textContent = totalCredits;
    }
}

// Interactive filter registration configuration
const allBtn = document.getElementById("all-btn");
const cseBtn = document.getElementById("cse-btn");
const wddBtn = document.getElementById("wdd-btn");

function updateActiveButton(activeBtn) {
    [allBtn, cseBtn, wddBtn].forEach(btn => btn?.classList.remove("active"));
    activeBtn?.classList.add("active");
}

if (allBtn && cseBtn && wddBtn) {
    allBtn.addEventListener("click", () => {
        displayCourses(courses);
        updateActiveButton(allBtn);
    });

    cseBtn.addEventListener("click", () => {
        const cseCourses = courses.filter(c => c.subject === "CSE");
        displayCourses(cseCourses);
        updateActiveButton(cseBtn);
    });

    wddBtn.addEventListener("click", () => {
        const wddCourses = courses.filter(c => c.subject === "WDD");
        displayCourses(wddCourses);
        updateActiveButton(wddBtn);
    });
}

// Initial execution load configuration
displayCourses(courses);