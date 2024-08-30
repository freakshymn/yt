// Import necessary Firebase functions
import { database, ref, push, set } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
    } else {
        console.error("Form element not found!");
    }
});

// Function to handle the form submission
const handleContactSubmit = (event) => {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Get form elements by their IDs
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const messageElement = document.getElementById('message');

    // Check if the elements exist before accessing their values
    const name = nameElement ? nameElement.value : null;
    const email = emailElement ? emailElement.value : null;
    const message = messageElement ? messageElement.value : null;

    if (!name || !email || !message) {
        console.error("All fields are required!");
        return;
    }

    // Now proceed to send the data to Firebase
    sendMessageToFirebase(name, email, message);
};

// Function to send message data to Firebase
const sendMessageToFirebase = (name, email, message) => {
    try {
        // Generate a new reference for the new message in Firebase database
        const newMessageRef = push(ref(database, 'messages'));
        set(newMessageRef, {
            name: name,
            email: email,
            message: message
        }).then(() => {
            // Show a success message below the form
            displaySuccessMessage("Message sent successfully!");

            // Reset form after successful submission
            document.querySelector('.contact-form').reset();
        }).catch(error => {
            console.error("Error sending message: ", error);
        });
    } catch (error) {
        console.error("Error initializing Firebase: ", error);
    }
};

// Function to display success message
const displaySuccessMessage = (message) => {
    const successMessageDiv = document.createElement('div');
    successMessageDiv.className = 'success-message';
    successMessageDiv.textContent = message;
    
    // Append the success message after the form
    const formContainer = document.querySelector('.contact-container');
    formContainer.appendChild(successMessageDiv);

    // Remove the success message after 5 seconds
    setTimeout(() => {
        successMessageDiv.remove();
    }, 5000);
};
