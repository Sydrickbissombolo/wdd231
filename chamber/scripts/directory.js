document.addEventListener('DOMContentLoaded', () => {
    const membersList = document.getElementById('members-list');
    const toggleButton = document.getElementById('toggle-view');
    const yearElement = document.getElementById('copyright-year');
    const lastModifiedElement = document.getElementById('last-modified');

    // Display current year
    yearElement.textContent = new Date().getFullYear();

    // Display last modified date
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;

    // Fetch members data
    async function loadMembers() {
        try {
            const response = await fetch('chamber/data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Display members as cards
    function displayMembers(members) {
        membersList.innerHTML = ''; // Clear existing content
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersList.appendChild(memberCard);
        });
    }

    // Toggle between grid and list view
    toggleButton.addEventListener('click', () => {
        membersList.classList.toggle('grid-view');
        membersList.classList.toggle('list-view');
    });

    loadMembers();
});
