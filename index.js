
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
});


const displayButton = document.getElementById("displayButton");
const nameInput = document.getElementById("name");
const displayDiv = document.getElementById("teamNameDisplay");



displayButton.addEventListener("click", () => {
    const teamName = nameInput.value.trim();

    displayDiv.textContent = teamName
        ? `Team : ${teamName}`
        : "Please enter a team name.";
});







// Fetch players from JSON and display them
function fetchPlayers(callback) {
    fetch('data/players.json')
        .then((response) => response.json())
        .then((data) => {
            callback(data.players);
        })
        .catch((error) => {
            console.error('Error loading players:', error);
        });
}




// Display filtered players in the modal
function displayPlayers(players, container) {
    container.innerHTML = '';

    players.forEach((player) => {
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
                ${stats}
            </div>
        </div>
        `;

        playerCard.addEventListener('click', () => {

            let name = selectedP.querySelector('.player-name')
            if(name != null){
                name = name.innerHTML.trim();
                if (selectedplayers.includes(name)) {
                    const playerIndex = selectedplayers.indexOf(name);
                    selectedplayers.splice(playerIndex, 1);
                }
            }
            selectedplayers.push(player.name)
            selectPlayer(player);
            console.log('this is click')
            closeModal();
            selectedP = null;
        });

        container.appendChild(playerCard);
    });
}



function openModal() {
    document.getElementById('playerModal').classList.remove('hidden');
}


function closeModal() {
    document.getElementById('playerModal').classList.add('hidden');
}



// Handle player selection
function selectPlayer(player) {
    const selectedField = document.querySelector('.field .selected');
    if (selectedField) {
        selectedField.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="text-center">
                    <div>${player.rating}</div>
                    <div>${player.position}</div>
                    <div class="player-name"> ${player.name}</div>
                    <img src="${player.flag}" alt="Flag of ${player.name}" class="w-6 h-6">
                </div>
                <img  class="w-20"src="${player.photo}" alt="${player.name}" class="w-12 h-12 rounded-full">
                <div class="text-center mt-2 flex">
                    <div>${player.position === 'GK' ? 'HAN' : 'SHO'} ${player.position === 'GK' ? player.handling : player.shooting}</div>
                        <div>${player.position === 'GK' ? 'KIC' : 'PAS'} ${player.position === 'GK' ? player.kicking : player.passing}</div>
                        <div>${player.position === 'GK' ? 'REF' : 'DRI'} ${player.position === 'GK' ? player.reflexes : player.dribbling}</div>
                        <div>${player.position === 'GK' ? 'SPE' : 'DEF'} ${player.position === 'GK' ? player.speed : player.defending}</div>
                        <div>${player.position === 'GK' ? 'POS' : 'PHY'} ${player.position === 'GK' ? player.positioning : player.physical}</div>
                </div>
            </div>
        `;
        selectedField.classList.remove('selected');
    }
}

let selectedplayers = [] 

// Filter players by position 
function filterPlayersByPosition(position) {
    fetchPlayers((players) => {
        const filteredPlayers = players.filter((player) => player.position === position && !selectedplayers.includes(player.name));
        const playerContainer = document.getElementById('playersContainer');
        displayPlayers(filteredPlayers, playerContainer);
        openModal();
    });
}






document.querySelectorAll('button[data-position]').forEach(button => {
    button.addEventListener('click', () => {
        const position = button.dataset.position;
        fetchPlayers(players => {
            const filteredPlayers = players.filter(player => player.position === position );
            displayPlayers(filteredPlayers, document.getElementById('playersContainer'));
            openModal();
        });
    });
});

let selectedP = null;

// Add event listeners to field buttons
document.querySelectorAll('.field button').forEach((button) => {
    button.parentElement.addEventListener('click', function () {
        const position = button.getAttribute('data-position');
        this.classList.add('selected');
        
        filterPlayersByPosition(position);

        selectedP = this;
         
    });
});

