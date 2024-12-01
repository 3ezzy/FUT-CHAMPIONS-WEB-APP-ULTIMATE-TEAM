const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const playerContainer = document.getElementById('playerContainer');
const sort = document.getElementById('sort');
const filter = document.getElementById('posFilter');

let data = [];

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
});

// Fetch data
fetch('data/players.json')
    .then((response) => response.json())
    .then((jsonData) => {
        data = jsonData.players; 
        displayPlayers(data); 
    })
    .catch((error) => {
        console.error('Error loading players:', error);
    });

function displayPlayers(players) {
    playerContainer.innerHTML = ''; 

    players.forEach((player) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'card flex flex-col items-center justify-between p-2';

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
}


function updatePlayers() {
    const sortBy = sort.value;
    const selectedPosition = filter.value;

    let filteredPlayers = [...data];

    if (sortBy === 'desc') {
        filteredPlayers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'asc') {
        filteredPlayers.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'az') {
        filteredPlayers.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else if (sortBy === 'za') {
        filteredPlayers.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    } else {
        filteredPlayers.sort((a, b) => a.id - b.id);
    }

    if (selectedPosition === 'FW') {
        filteredPlayers = filteredPlayers.filter(player => ['LW', 'RW', 'ST'].includes(player.position));
    } else if (selectedPosition === 'MD') {
        filteredPlayers = filteredPlayers.filter(player => player.position === 'CM');
    } else if (selectedPosition === 'DF') {
        filteredPlayers = filteredPlayers.filter(player => ['RB', 'LB', 'CB'].includes(player.position));
    } else if (selectedPosition === 'GK') {
        filteredPlayers = filteredPlayers.filter(player => player.position === 'GK');
    }

    displayPlayers(filteredPlayers);
}

sort.addEventListener('change', updatePlayers);
filter.addEventListener('change', updatePlayers);
