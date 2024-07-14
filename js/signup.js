'use strict';

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if any field is empty
    if (!userName || !password || !confirmPassword) {
        alert('All fields are required');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Proceed with fetch request
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            password // Consider security implications
        })
    }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('User registered successfully');
                window.location.href = '/login.html';
            }
        });
});