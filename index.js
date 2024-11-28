
// Fetch players from JSON
fetch('data/players.json')
    .then((response) => response.json())
    .then((data) => {
        const players = data.players;

        const playerContainer = document.getElementById('playersContainer');

        players.forEach((player) => {
            const playerCard = document.createElement('div');
            playerCard.className = 'card flex flex-col items-center justify-between p-2';

            playerCard.innerHTML = `
                <div class="firt_part text-center">
                    <div>${player.rating}</div>
                    <div>${player.position}</div>
                    <div class="name">${player.name}</div>
                    <img src="${player.flag}" alt="Club logo" class="w-6 h-6">
                </div>
                <div class="player_img">
                    <img src="${player.photo}" alt="${player.name}" class="w-16 h-16 rounded-full">
                </div>
                <div class="second_part">
                    <div>
                        <div>${player.position === 'GK' ? 'HAN' : 'SHO'} ${player.position === 'GK' ? player.handling : player.shooting}</div>
                        <div>${player.position === 'GK' ? 'KIC' : 'PAS'} ${player.position === 'GK' ? player.kicking : player.passing}</div>
                        <div>${player.position === 'GK' ? 'REF' : 'DRI'} ${player.position === 'GK' ? player.reflexes : player.dribbling}</div>
                        <div>${player.position === 'GK' ? 'SPE' : 'DEF'} ${player.position === 'GK' ? player.speed : player.defending}</div>
                        <div>${player.position === 'GK' ? 'POS' : 'PHY'} ${player.position === 'GK' ? player.positioning : player.physical}</div>
                    </div>
                </div>
            `;
            playerCard.addEventListener('click', () => {
                selectPlayer(player); // Handle player selection
                closeModal(); // Close modal
            });
            
            playerContainer.appendChild(playerCard);
        });
    })
    .catch((error) => {
        console.error('Error loading players:', error);
    });


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
