const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
});
        const playerContainer = document.getElementById('playerContainer');

        // Fetch data
        fetch('data/players.json')
            .then((response) => response.json())
            .then((data) => {
                const players = data.players;

                players.forEach((player) => {
                    const playerCard = document.createElement('div');
                    playerCard.className = 'card flex flex-col items-center justify-between p-2';

                    // Condition for position
                    const stats = player.position === 'GK'
                        ? `
            
            <div>HAN ${player.handling}</div>
            <div>KIC ${player.kicking}</div>
            <div>REF ${player.reflexes}</div>
            <div>SPE ${player.speed}</div>
            <div>POS ${player.positioning}</div>
        `
                        : `
            
            <div>SHO ${player.shooting}</div>
            <div>PAS ${player.passing}</div>
            <div>DRI ${player.dribbling}</div>
            <div>DEF ${player.defending}</div>
            <div>PHY ${player.physical}</div>
        `;

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
                ${stats}
            </div>
        </div>
    `;
                    playerContainer.appendChild(playerCard);
                });
            })
            .catch((error) => {
                console.error('Error loading players:', error);
            });
