import 'regenerator-runtime/runtime';
import axios from 'axios';

//Tous les messages
const Messages = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/messages');
        const messages = res.data;
        const template = `
            ${messages.map((message) => {
                return "<div class=\"row\"><div class=\"col\"><div class=\"card bg-light\"><h5 class=\"card-title ps-1\">" + message.author + "</h5><p class=\"card-text ps-1\">" + message.message + "</div></div></div>"
            })}
        `;
        return template;
    } catch (errors) {
        console.log(errors);
    }
}

//Ajouter un message
const AddMessageTemplate = () => {
    const template = `
        <input type="text" class="form-control mb-1" placeholder="Prénom" id="author">
        <textarea class="form-control mb-1" placeholder="Message" id="message"></textarea>
        <div class="p-2" id="errorMessage"></div>
        <button class="btn btn-primary" id="addMessageSubmit">Ajouter</button>
    `;
    return template;
}
const AddMessage = async (author, message) => {
    const header = {
        'Content-Type': 'application/json'
      }
    const res = await axios.post('http://localhost:8000/api/messages', {author, message}, header);
    if (res.statusText === 'Created') {
        Messages();
    }
}


export default {
    Messages,
    AddMessageTemplate,
    AddMessage
};