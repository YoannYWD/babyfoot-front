import 'regenerator-runtime/runtime';
import axios from 'axios';
const io = require('socket.io-client');

//Tous les matchs
const Games = async () => {
    try {
        const socket = io.connect('http://localhost:8000', {path: '/api/games'});
        socket.on('data', () => {
            console.log('1');
        })
        const res = await axios.get('http://localhost:8000/api/games');
        const games = res.data;
        const template = `
            ${games.map((game) => {
                if (game.in_progress === true) {
                    return "<div class=\"row\"><div class=\"col-3\">Partie " + game.id + "</div><div class=\"col-3 text-center\">" + game.player1 + " vs " + game.player2 + "</div><div class=\"col-3 text-center\">En cours</div><div class=\"col-3 text-end\"><button class=\"btn btn-success endGame\" value="+game.id+"><i class=\"fa-solid fa-flag-checkered\"></i></button></div></div>"
                } else {
                    return "<div class=\"row\"><div class=\"col-3 text-secondary\">Partie " + game.id + "</div><div class=\"col-3 text-secondary text-center\">" + game.player1 + " vs " + game.player2 + "</div><div class=\"col-3 text-secondary text-center\">Terminée</div><div class=\"col-3 text-end\"><button class=\"btn btn-danger deleteGame\" value="+game.id+"><i class=\"fa-solid fa-trash-can\"></i></button></div></div>"
                }
            })}
        `;
        return template;
    } catch (errors) {
        console.log(errors);
    }
}

//Compteur de matchs en cours
const GamesCount = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/games');
        const games = res.data;
        let gamesInProgress = [];
        games.forEach(game => {
            if (game.in_progress === true) {
                gamesInProgress.push(game);
            }
        });
        const template = `
            <div class="btn btn-primary disabled rounded">${gamesInProgress.length}</div>
        `;
        return template;
    } catch (errors) {
        console.log(errors);
    }
}

//Ajouter un match
const AddGameTemplate = () => {
    const template = `
        <div class="row mb-5">
            <div class="col-5">
                <input type="text" class="form-control" placeholder="Nom du joueur 1" id="player1">
            </div>
            <div class="col-5">
                <input type="text" class="form-control" placeholder="Nom du joueur 2" id="player2">
            </div>
            <div class="col-2">
                <button class="btn btn-primary" id="addGameSubmit"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>

    `;
    return template;
}
const AddGame = async (player1, player2) => {
    const header = {
        'Content-Type': 'application/json'
    }
    const in_progress = true;
    const res = await axios.post('http://localhost:8000/api/games', {player1, player2, in_progress}, header);
    if (res.statusText === 'Created') {
        const socket = io.connect('http://localhost:8000', {path: '/'});
    }
}

const EndGame = async (id) => {
    const header = {
        'Content-Type': 'application/json'
      }
    const in_progress = false;
    const res = await axios.put('http://localhost:8000/api/games/'+id, {in_progress}, header);
    if (res.statusText === 'OK') {
        Games();
    }
}

const DeleteGame = async (id) => {
    const header = {
        'Content-Type': 'application/json'
      }
    const res = await axios.delete('http://localhost:8000/api/games/'+id, header);
    if (res.statusText === 'OK') {
        Games();
    }
}



export default {
    Games,
    GamesCount,
    AddGameTemplate,
    AddGame,
    EndGame,
    DeleteGame
};