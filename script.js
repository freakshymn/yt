import { database, ref, get, child } from './firebase.js';
import { handleRegister } from './register.js';
import { handleLogin } from './login.js';

// Function to load navigation
const loadNav = () => {
    fetch('head.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const navContainer = document.getElementById('nav-container');
            if (navContainer && !navContainer.innerHTML.trim()) {
                navContainer.innerHTML = data;

                const signupButton = document.getElementById('submitsignup');
                const loginButton = document.getElementById('submitlogin');

                if (signupButton) {
                    signupButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleRegister();
                    });
                }

                if (loginButton) {
                    loginButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleLogin();
                    });
                }
            }
        })
        .catch(error => console.error('Error loading head.html:', error));
};

// Function to retrieve YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
};

// Function to retrieve YouTube links and display them
const youtube = async () => {
    try {
        const dbRef = ref(database);
        const youtubeSnapshot = await get(child(dbRef, 'youtubeLinks'));

        if (youtubeSnapshot.exists()) {
            const youtubeLinks = youtubeSnapshot.val();

            for (let linkKey in youtubeLinks) {
                if (youtubeLinks.hasOwnProperty(linkKey)) {
                    const link = youtubeLinks[linkKey];
                    const embedUrl = getYouTubeEmbedUrl(link);

                    if (embedUrl) {
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.width = "560";
                        iframe.height = "315";
                        iframe.frameBorder = "0";
                        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                        iframe.allowFullscreen = true;

                        document.querySelector('.yt').appendChild(iframe);
                    } else {
                        console.error(`Invalid YouTube link: ${link}`);
                    }
                }
            }
        } else {
            console.log("No YouTube links found.");
        }
    } catch (error) {
        console.log("Error retrieving YouTube links:", error);
    }
};

// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn');
    console.log("loggedIn:", isLoggedIn);

    // Retrieve elements by class name
    const profileIconElements = document.getElementsByClassName('profile-icon');
    const loginLinkElements = document.getElementsByClassName('login-link');
    const profileMenuElements = document.getElementsByClassName('profile-menu');
    const logoutLinkElements = document.getElementsByClassName('logout-link');

    // Ensure we have the correct elements from the collections
    const profileIcon = profileIconElements[0]; // Assuming there is only one profile icon
    const loginLink = loginLinkElements[0];     // Assuming there is only one login link
    const profileMenu = profileMenuElements[0]; // Assuming there is only one profile menu
    const logoutLink = logoutLinkElements[0];   // Assuming there is only one logout link

    if (isLoggedIn) {
        // User is logged in, show profile icon and hide login link
        if (profileIcon) profileIcon.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
    } else {
        // User is not logged in, hide profile icon and show login link
        if (profileIcon) profileIcon.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
    }

    // Event listener for profile icon click to show/hide the dropdown menu
    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            if (profileMenu) {
                profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Event listener for logout link click
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html'; // Redirect to login.html after logout
    };
});


document.addEventListener("DOMContentLoaded", () => {
    loadNav();
    youtube();

});