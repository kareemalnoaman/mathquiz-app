
const btn = document.getElementById('btn-help');



const responseDiv = document.getElementById('response');
responseDiv.innerHTML = '';

btn.onclick = function (e) {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    e.preventDefault();

    if (username && email && message) {
        responseDiv.innerHTML = `<p>We received your message, ${username}. 
        We will respond to : ${email}.</p>`;
    } else {
        responseDiv.innerHTML = '<p>Please fill in all fields.</p>';
    }
};

