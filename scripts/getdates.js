// dynamic Year

document.getElementById('year').textContent = new Date().getFullYear();

// Last Modified

document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Course List

const courses = [
    {code: 'CSE 110', name: 'Introduction to Programming', completed: true, credits: 2},
    {code: 'WDD 130', name: 'Web Fundamentals', completed: true, credits: 3},
    {code: 'WDD 231', name: 'Web Frontend Development I', completed: false, credits: 3},
    {code: 'WDD 131', name: 'Web Frontend Development II', completed: true, credits: 3},
    {code: 'CSE 111', name: 'Programming with Functions', completed: true, credits: 4},
    {code: 'CSE 210', name: 'Programming with classes', completed: true, credits: 3},
];

const coursesContainer = document.getElementById('courses');

function displayCourses(filter = 'all') {
    coursesContainer.innerHTML = '';
    const filteredCourses = courses.filter(course =>
        filter === 'all' || course.code.startsWith(filter)
    );
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
        courseDiv.style.backgroundColor = course.completed ? '#4CAF50' : '#f44336';
        courseDiv.style.color = '#fff';
        courseDiv.style.marginBottom = '10px';
        courseDiv.style.borderRadius = '5px'
        coursesContainer.appendChild(courseDiv);
    });
}

// Initial Display of the function
displayCourses();

// FIltering courses

function filterCourses(filter) {
    displayCourses(filter);
}