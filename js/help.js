
const btn = document.getElementById('btn-help');

// clear the response div
const responseDiv = document.getElementById('response');
responseDiv.innerHTML = '';

// submit the form data then go back to the home page 
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
    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('message').value = "";
};

