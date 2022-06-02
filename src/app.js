import HeaderTemplate from './components/HeaderTemplate'
import Games from './components/Games'
import Messages from './components/Messages'

const app = async () => {

    //MATCHS
    document.getElementById('headerTemplate').innerHTML = HeaderTemplate();
    document.getElementById('games').innerHTML = await Games.Games();
    document.getElementById('gamesCount').innerHTML = await Games.GamesCount();
    document.getElementById('addGameTemplate').innerHTML = Games.AddGameTemplate();
    
    const addGame = document.getElementById('addGameSubmit');
    addGame.addEventListener('click', () => {
        document.getElementById('error').innerHTML = '';
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        if (player1 && player2) {
            if (player1.length > 30) {
                document.getElementById('error').innerHTML = '<p class="text-warning" style="margin-top:-35px;">Le prénom ' + player1 + ' doit faire moins de 30 caractères !</p>';
            }
            if (player2.length > 30) {
                document.getElementById('error').innerHTML = '<p class="text-warning">Le prénom ' + player2 + ' doit faire moins de 30 caractères !</p>';
            }
            if (player1.length < 31 && player2.length < 31) {
                Games.AddGame(player1, player2);
            }
        } else {
            document.getElementById('error').innerHTML = '<p class="text-warning" style="margin-top:-35px;">Veuillez remplir les 2 champs !</p>';
        }
    })

    const endGame = document.getElementsByClassName('endGame');
    //getElementsByClassName retourne un tableau
    for (let i = 0; i < endGame.length; i++) {
        endGame[i].addEventListener('click', () => {
            Games.EndGame(endGame[i].value);
        });
    }

    const deleteGame = document.getElementsByClassName('deleteGame');
    //getElementsByClassName retourne un tableau
    for (let i = 0; i < deleteGame.length; i++) {
        deleteGame[i].addEventListener('click', () => {
            Games.DeleteGame(deleteGame[i].value);
        });
    }

    //MESSAGES
    document.getElementById('messages').innerHTML = await Messages.Messages();
    document.getElementById('addMessageTemplate').innerHTML = Messages.AddMessageTemplate();
    
    const addMessage = document.getElementById('addMessageSubmit');
    addMessage.addEventListener('click', () => {
        document.getElementById('errorMessage').innerHTML = '';
        const author = document.getElementById('author').value;
        const message = document.getElementById('message').value;
        if (author && message) {
            if (author.length > 30) {
                document.getElementById('errorMessage').innerHTML = '<p class="text-warning" style="margin-top:-35px;">Le prénom ' + author + ' doit faire moins de 30 caractères !</p>';
            } else {
                Messages.AddMessage(author, message);
            }
        } else {
            document.getElementById('errorMessage').innerHTML = '<p class="text-warning" style="margin-top:-35px;">Veuillez remplir les 2 champs !</p>';
        }
    })
}

//Initialisation de l'app
app();