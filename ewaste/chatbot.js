/**
 * Fetches all submission data from Firebase and formats it as a JSON string.
 * This gives the AI the complete context of the database.
 * @returns {Promise<string>} A JSON string of all data.
 */
async function getAllDataAsJSON() {
    const submissionsRef = realtimeDB.ref('ewasteSubmissions');
    const snapshot = await submissionsRef.get();

    if (!snapshot.exists()) {
        return "[]"; // Return an empty JSON array if there's no data
    }

    // Convert the Firebase object into a clean array
    const allDataArray = Object.values(snapshot.val());

    // Convert the array into a JSON string
    return JSON.stringify(allDataArray, null, 2); // The '2' formats it for readability
}

/**
 * Initializes the entire chatbot functionality.
 */
function initializeChatbot() {
    // IMPORTANT: Replace with your actual Gemini API key
    const chatAPI_KEY = "AIzaSyDHPRIxyJuqeBHXX-V5moX2gLJVOBOoqAY"; 
    const chatAPI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + chatAPI_KEY;
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const summaryButton = document.getElementById('summary-button');
    const chatIconButton = document.getElementById('chat-icon-button');
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    const closeChatButton = document.getElementById('close-chat-button');

    if (!chatMessages || !userInput || !sendButton || !chatIconButton || !chatWidgetContainer || !closeChatButton) {
        console.error("One or more chatbot HTML elements are missing. Please check your IDs.");
        return;
    }

    chatIconButton.addEventListener('click', () => {
        chatWidgetContainer.classList.remove('hidden');
        chatIconButton.classList.add('hidden');
    });

    closeChatButton.addEventListener('click', () => {
        chatWidgetContainer.classList.add('hidden');
        chatIconButton.classList.remove('hidden');
    });

    function appendMessage(sender, text) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'items-start', 'py-2');
        const avatar = document.createElement('div');
        avatar.classList.add('flex-shrink-0', 'w-8', 'h-8', 'rounded-full', 'flex', 'items-center', 'justify-center', 'font-bold', 'text-sm');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('p-3', 'rounded-xl', 'max-w-[80%]', 'shadow-sm');
        if (sender === 'user') {
            messageContainer.classList.add('justify-end');
            avatar.classList.add('order-2', 'ml-3', 'bg-gray-400', 'text-white');
            avatar.innerText = 'You';
            messageBubble.classList.add('order-1', 'bg-blue-500', 'text-white');
        } else {
            avatar.classList.add('bg-blue-500', 'text-white');
            avatar.innerText = 'AI';
            messageBubble.classList.add('ml-3', 'bg-white', 'text-gray-800');
        }
        messageBubble.innerHTML = `<p class="text-sm">${text.replace(/\n/g, '<br>')}</p>`;
        messageContainer.appendChild(messageBubble);
        messageContainer.appendChild(avatar);
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;
        
        appendMessage('user', userMessage);
        userInput.value = '';

        const loadingBubble = document.createElement('div');
        loadingBubble.id = 'loading-indicator';
        loadingBubble.classList.add('flex', 'items-start', 'py-2');
        loadingBubble.innerHTML = `<div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div><div class="ml-3 bg-white p-3 rounded-xl max-w-[80%] animate-pulse shadow-sm"><p class="text-sm">...</p></div>`;
        chatMessages.appendChild(loadingBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // STEP 1: Fetch the ENTIRE database as a JSON string
            const allDataContext = await getAllDataAsJSON();

            // STEP 2: Create a powerful new instruction for the AI
            const systemInstructionText = `You are an expert data analyst AI for an e-waste program. Your task is to answer questions based *only* on the provided JSON data which contains all submissions. The 'createdAt' field is in 'DD/MM/YYYY' format. Analyze the entire dataset to answer questions about specific dates, date ranges, totals, averages, or comparisons. If the user's question cannot be answered from the data, say so politely. Do not make up information. Here is the complete dataset in JSON format: \n${allDataContext}`;
            
            // STEP 3: Send the user's question and the full data context to the AI
            const payload = {
                contents: [{ role: 'user', parts: [{ text: userMessage }] }],
                systemInstruction: { parts: [{ text: systemInstructionText }] }
            };
            
            const response = await fetch(chatAPI_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            
            if (!response.ok) { throw new Error(`API error: ${response.statusText}`); }
            const result = await response.json();
            if (!result.candidates || !result.candidates[0].content) { throw new Error('Invalid API response'); }
            
            const aiResponse = result.candidates[0].content.parts[0].text;
            
            loadingBubble.remove();
            appendMessage('ai', aiResponse);

        } catch (error) {
            console.error("Error during message processing:", error);
            loadingBubble.remove();
            appendMessage('ai', "Sorry, I encountered an error. Please check the API key and ensure the browser console shows no errors.");
        }
    }

    // This function is no longer used by the main logic but kept for the summary button
    function getChatHistory() {
        const messages = [];
        const messageElements = chatMessages.querySelectorAll('.flex.items-start');
        for (let i = 1; i < messageElements.length; i++) {
            const element = messageElements[i];
            const sender = element.querySelector('.order-2') ? 'user' : 'model';
            const text = element.querySelector('p').textContent;
            if (text !== '...') {
                messages.push({ role: sender === 'user' ? 'user' : 'model', parts: [{ text: text }] });
            }
        }
        return messages;
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
    
    summaryButton.addEventListener('click', () => {
       userInput.value = "Give me a high-level summary of all the data";
       sendMessage();
    });
}