// const messagesContainer = document.getElementById('messages');
// const userInput = document.getElementById('userInput');

// // Function to send a message to the backend
// function sendMessage() {
//     const userText = userInput.value.trim();
//     if (!userText) return;

//     // Add user message to the chat window
//     const userMessage = document.createElement('div');
//     userMessage.classList.add('message', 'user');
//     userMessage.innerText = userText;
//     messagesContainer.appendChild(userMessage);

//     // Send the message to the backend
//     fetch('http://localhost:3000/api/content', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ question: userText })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Display the bot's response
//         const botMessage = document.createElement('div');
//         botMessage.classList.add('message', 'bot');
//         botMessage.innerText = data.result;
//         messagesContainer.appendChild(botMessage);

//         // Scroll to the bottom of the chat window
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         const errorMessage = document.createElement('div');
//         errorMessage.classList.add('message', 'bot');
//         errorMessage.innerText = 'Sorry, something went wrong. Please try again.';
//         messagesContainer.appendChild(errorMessage);
//     });

//     // Clear input field
//     userInput.value = '';
// }
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');

// Function to send a message to the backend
function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    // Add user message to the chat window
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.innerText = userText;
    messagesContainer.appendChild(userMessage);

    // Send the message to the backend
    fetch('http://localhost:3000/api/content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userText })
    })
    .then(response => response.json())
    .then(data => {
        // Display the bot's response
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.innerText = data.result;
        messagesContainer.appendChild(botMessage);

        // Scroll to the bottom of the chat window
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Convert the bot response to speech
        speakText(data.result);
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message', 'bot');
        errorMessage.innerText = 'Sorry, something went wrong. Please try again.';
        messagesContainer.appendChild(errorMessage);
    });

    // Clear input field
    userInput.value = '';
}

// Function to convert text to speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language, you can change this
        utterance.pitch = 1; // Set pitch (1 is normal, lower is deeper, higher is lighter)
        utterance.rate = 1;  // Set speed (1 is normal, 0.5 is slower, 1.5 is faster)
        
        // Speak the text
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Speech Synthesis not supported');
    }
}
