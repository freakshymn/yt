// register.js
import { database, ref, set } from './firebase.js';
import { hashPassword } from './hash.js'; // Assuming you create a separate utility file for hashing passwords

// Function to handle user registration
export async function handleRegister() {
    const username = document.getElementById('uname1').value;
    const email = document.getElementById('email1').value;
    const password = document.getElementById('upswd1').value;
    const confirmPassword = document.getElementById('upswd2').value;
    const errorBox = document.getElementById('errorBox');

    if (!username || !email || !password || !confirmPassword) {
        errorBox.innerText = "All fields are required!";
        errorBox.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        errorBox.innerText = "Passwords do not match!";
        errorBox.style.display = "block";
        return;
    }

    try {
        const hashedPassword = await hashPassword(password);
        await set(ref(database, 'users/' + username), {
            email: email,
            password: hashedPassword,
            username: username
        });
        window.location.href = 'index.html'; // Redirect to index page after registration
    } catch (error) {
        console.error("Error registering user: ", error);
        errorBox.innerText = "Error registering user!";
        errorBox.style.display = "block";
    }
}
