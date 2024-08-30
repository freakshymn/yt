// login.js
import { database, ref, get, child } from './firebase.js';
import { hashPassword } from './hash.js'; // Assuming you create a separate utility file for hashing passwords

// Function to handle user login
export async function handleLogin() {
    const username = document.getElementById('uname').value;
    const password = document.getElementById('upswd').value;
    const errorBox = document.getElementById('errorBox');

    if (!username || !password) {
        errorBox.innerText = "Both fields are required!";
        errorBox.style.display = "block";
        return;
    }

    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${username}`));
        
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const hashedPassword = await hashPassword(password);

            if (hashedPassword === userData.password) {
                window.location.href = 'index.html'; // Redirect to index page after login
            } else {
                errorBox.innerText = "Incorrect password!";
                errorBox.style.display = "block";
            }
        } else {
            errorBox.innerText = "User does not exist!";
            errorBox.style.display = "block";
        }
    } catch (error) {
        console.error("Error logging in: ", error);
        errorBox.innerText = "Error logging in!";
        errorBox.style.display = "block";
    }
}
