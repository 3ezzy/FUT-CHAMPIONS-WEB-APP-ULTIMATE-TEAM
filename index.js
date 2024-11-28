

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
        playerCard.className = 'card flex flex-col items-center p-2 bg-black rounded-lg text-white shadow-md';
        playerCard.innerHTML = `
            <div class="firt_part text-center">
                <div class="font-bold">${player.rating}</div>
                <div class="text-sm">${player.position}</div>
                <div class="name">${player.name}</div>
                <div><img src="${player.flag}" alt="Flag" class="w-6 h-6 inline-block"></div>
            </div>
            <div class="player_img mt-2">
                <img src="${player.photo}" alt="${player.name}" class="w-16 h-16">
            </div>
            <div class="second_part mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-center text-xs">
                <div>SHO: ${player.shooting}</div>
                <div>PAS: ${player.passing}</div>
                <div>DRI: ${player.dribbling}</div>
                <div>DEF: ${player.defending}</div>
                <div>PHY: ${player.physical}</div>
            </div>
        `;

        // Add click event to handle selection logic
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
