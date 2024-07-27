document.addEventListener('DOMContentLoaded', function () {
    const chatboxForm = document.getElementById('chatbox-form');
    const userInput = document.getElementById('user-input');
    const chatboxMessages = document.getElementById('chatbox-messages');

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const questions = [
        "Who made the website or who wrote the article?",
        "When was it made or when was it written?",
        "What was the title, heading or header?",
        "What is the page name?",
        "What is the website name?",
        "What was the URL?"
    ];

    let responses = [];
    let currentQuestion = 0;

    async function botReply(message, isHTML = false) {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `
            <img src="https://static.vecteezy.com/system/resources/previews/006/662/139/large_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-free-vector.jpg" alt="APA Auto">
            <div>
                <div class="name">APA Auto</div>
                <div class="text">...</div>
            </div>
        `;
        chatboxMessages.appendChild(botMessage);
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

        await delay(1000);

        if (isHTML) {
            botMessage.querySelector('.text').innerHTML = message;
        } else {
            botMessage.querySelector('.text').textContent = message;
        }
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }

    async function handleUserInput(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <img src="photo.png" alt="You">
            <div>
                <div class="name">You</div>
                <div class="text">${message}</div>
            </div>
        `;
        chatboxMessages.appendChild(userMessage);
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

        responses.push(message);
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            await botReply(questions[currentQuestion]);
        } else {
            await generateCitation();
        }
    }

    async function generateCitation() {
        const [author, date, title, pageName, websiteName, url] = responses;
        const citation = `${author}. (${date}). ${title}. ${pageName}. ${websiteName}. ${url}`;
        await botReply(`Here is your APA citation: <strong>${citation}</strong>`, true);
    }

    chatboxForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            userInput.value = '';
            await handleUserInput(message);
        }
    });

    // Start the conversation
    botReply(questions[currentQuestion]);
});
