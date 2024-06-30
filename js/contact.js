document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = '';

    if (name && email && message) {
        responseDiv.innerHTML = `<p>Thank you for your message, ${name}. We will get back to you at ${email}.</p>`;
    } else {
        responseDiv.innerHTML = '<p>Please fill in all fields.</p>';
    }
});
