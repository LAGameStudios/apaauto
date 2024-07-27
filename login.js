document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Construct JSON object to match login.json structure
    var user = {
        "name": "User", // Hardcoded for simplicity
        "username": username,
        "email": email,
        "password": password
    };

    // Read login.json and check for authentication
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            // Check if any user in the JSON matches the entered credentials
            var loggedIn = false;
            data.forEach(userData => {
                if (userData.username === user.username && userData.email === user.email && userData.password === user.password) {
                    loggedIn = true;
                }
            });

            if (loggedIn) {
                alert('Login successful!');
                window.location.href = 'apamenu.html'; // Redirect to menu page
            } else {
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});

function goToGuestMode() {
    window.location.href = 'guestmenu.html'; // Redirect to guest mode page
}

function goToSignUp() {
    window.location.href = 'signup.html'; // Redirect to sign up page
}
