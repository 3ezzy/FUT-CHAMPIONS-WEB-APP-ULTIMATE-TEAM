

// Fetch players from JSON
fetch('data/players.json')
    .then((response) => response.json())
    .then((data) => {
        const players = data.players;
        displayPlayersInModal(players);
    })
    .catch((error) => console.error('Error loading JSON:', error));

// Display players in modal
function displayPlayersInModal(players) {
    const container = document.getElementById('playersContainer');
    container.innerHTML = ''; // Clear previous content

    players.forEach((player) => {
        const playerCard = document.createElement('div');
        playerCard.className =
            'flex items-center p-2 border rounded cursor-pointer hover:bg-gray-100';
        playerCard.innerHTML = `
      <img src="${player.photo}" alt="${player.name}" class="w-12 h-12 rounded-full mr-2">
      <div>
        <p class="font-bold">${player.name}</p>
        <p class="text-sm text-gray-500">${player.position}</p>
        <p class="text-sm text-gray-500">${player.nationality}</p>
      </div>
    `;
        playerCard.addEventListener('click', () => selectPlayer(player));
        container.appendChild(playerCard);
    });
}

// Open modal
function openModal() {
    document.getElementById('playerModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('playerModal').classList.add('hidden');
}

// Select player (handle selection logic)
function selectPlayer(player) {
    console.log('Selected player:', player); // Replace with your logic
    closeModal(); // Close modal after selection
}

// Add event listeners to all "+" buttons
document.querySelectorAll('.field button').forEach((button) => {
    button.addEventListener('click', openModal);
});
