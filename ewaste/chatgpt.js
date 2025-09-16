function initializeChatbot() {
    const chatAPI_KEY = "AIzaSyDHPRIxyJuqeBHXX-V5moX2gLJVOBOoqAY";
    const chatAPI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + chatAPI_KEY;
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const summaryButton = document.getElementById('summary-button');
    const chatIconButton = document.getElementById('chat-icon-button');
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    const closeChatButton = document.getElementById('close-chat-button');

    if (!chatIconButton || !chatWidgetContainer || !closeChatButton || !sendButton) {
        console.error("Chatbot elements not found. Make sure chatbot HTML is loaded correctly.");
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

   async function sendMessage(isSummaryRequest = false) {
    const ragContext = `
        explain the user short 1. Introduction
The Nazareth College of art and science E-Waste Website is a digital platform designed and developed by XYZ College of Engineering as part of its sustainability and digital innovation initiative. The website serves as a public access platform where both the general public (outsiders) and the college community (students, staff, and faculty) can:
•	Sell, donate, or request collection of electronic waste (e-waste).
•	Learn about safe e-waste disposal methods.
•	Support the college’s green campus project.
E-waste refers to discarded electrical and electronic devices such as old phones, computers, chargers, batteries, appliances, and other gadgets. Improper disposal of e-waste leads to toxic pollution, soil contamination, water pollution, and health risks. This website provides a structured, responsible, and user-friendly way to manage it.
________________________________________
2. Purpose and Objectives
Core Purpose
•	To provide a digital platform for safe e-waste disposal.
•	To connect people (public + college members) with authorized recycling facilities.
Specific Objectives
1.	Create awareness about e-waste hazards.
2.	Offer an easy, online system for posting e-waste.
3.	Ensure proper collection and recycling through verified partners.
4.	Encourage the reuse and donation of functional electronic items.
5.	Position the college as a leader in sustainability and eco-friendly initiatives.
6.	Align with UN Sustainable Development Goals (SDGs), particularly:
o	SDG 11: Sustainable Cities and Communities
o	SDG 12: Responsible Consumption and Production
o	SDG 13: Climate Action
________________________________________
3. Target Users
1. Outsiders/Public
•	Local residents, shopkeepers, small businesses, NGOs.
•	Can create accounts and post e-waste they want to sell or donate.
2. College Community
•	Students, faculty, and staff of XYZ College.
•	Can contribute old electronics from labs, classrooms, or personal use.
3. Admins (College Team)
•	Manage the website backend.
•	Approve or reject user posts.
•	Verify legitimacy of e-waste.
•	Assign authorized recyclers for collection.
4. Recyclers/Authorized Partners
•	Registered e-waste recycling companies or government-approved vendors.
•	Receive notifications about approved listings.
•	Arrange pickup or drop-off with users.
________________________________________
4. Key Features of the Website
User Account System
•	Secure login & registration for outsiders and college members.
•	User profiles include name, contact, email, and location.
Post E-Waste
•	Simple form to list items with:
o	Category (phone, laptop, TV, etc.)
o	Condition (working, non-working, scrap)
o	Quantity
o	Photos
o	Option: Sell or Donate
Categories of E-Waste Accepted
1.	Mobile phones & chargers
2.	Laptops, PCs, and accessories
3.	Batteries (lithium, lead-acid, etc.)
4.	Printers, scanners, and cables
5.	Small appliances (fans, mixers, etc.)
6.	Large appliances (refrigerators, washing machines, etc.)
7.	Miscellaneous electronics
Admin Dashboard
•	View all user submissions.
•	Verify authenticity of items.
•	Approve or reject posts.
•	Assign pickup requests to recyclers.
Pickup & Disposal System
•	Users can request doorstep pickup.
•	Pickup scheduled by recyclers or college team.
•	Drop-off option available at campus collection points.
Awareness & Education Section
•	Articles about e-waste hazards.
•	Guides on safe disposal and recycling.
•	Government e-waste rules and regulations.
________________________________________
5. Workflow (Step by Step)
1.	User visits website.
2.	Creates account (public/outsider OR college member).
3.	User lists e-waste item(s).
4.	Admin reviews and approves/rejects listing.
5.	If approved → recycler/college team is notified.
6.	Pickup or drop-off is arranged.
7.	Recycler collects item(s) and disposes/recycles them properly.
8.	User gets confirmation of successful disposal.
________________________________________
6. Benefits of the Website
For Users (Public + College Community)
•	Easy platform to dispose of e-waste.
•	Option to sell or donate items.
•	Contributes to cleaner environment.
For College
•	Enhances green campus reputation.
•	Supports government environmental policies.
•	Increases student and community engagement.
For Environment
•	Reduces toxic waste in landfills.
•	Prevents harmful chemicals from polluting soil and water.
•	Encourages recycling and reuse.
________________________________________
7. Security & Privacy
•	Secure login and encrypted data storage.
•	Only authorized recyclers and admins can view detailed user data.
•	Personal information (phone, address) not shared publicly.
________________________________________
8. Example Scenarios / Use Cases
1.	Student Disposal – A student wants to dispose of a broken laptop. He logs in, posts details, and requests pickup. Recycler collects it safely.
2.	Shopkeeper Sale – A local shopkeeper has old mobile batteries. He lists them for sale, and recycler purchases them.
3.	Public Donation – A family donates an old refrigerator to the college collection drive via the website.
4.	College Lab Waste – Outdated projectors and lab equipment are listed by faculty and handed over to recyclers.
________________________________________
9. Frequently Asked Questions (FAQ)
Q1: Who can use the website?
👉 Anyone – college students, faculty, and the general public.
Q2: What types of e-waste are accepted?
👉 Mobiles, laptops, computers, batteries, chargers, appliances, and more.
Q3: Is posting e-waste free?
👉 Yes, it’s completely free of cost.
Q4: Can I donate items instead of selling?
👉 Yes, donation is encouraged, especially for usable items.
Q5: Who collects the e-waste?
👉 Authorized recyclers and the college team arrange collection.
Q6: Is my personal data safe?
👉 Yes, data is stored securely and only shared with verified collectors.
Q7: Why should I use this website instead of throwing items away?
👉 E-waste contains hazardous chemicals that can pollute soil and water. Recycling ensures safe disposal and resource recovery.
________________________________________
10. Keywords for Retrieval (Embedding)
•	e-waste disposal
•	sell electronics online
•	donate gadgets
•	college green initiative
•	recycling e-waste
•	eco-friendly waste management
•	safe disposal of electronics
•	public access recycling platform
________________________________________
11. Future Enhancements (Optional Vision)
•	Mobile App version for Android/iOS.
•	AI chatbot integration for user queries.
•	Reward points system for users who donate frequently.
•	Partnership with government recycling drives.
    `;
    const userMessage = userInput.value.trim();
    if (userMessage === '' && !isSummaryRequest) return;
    if (!isSummaryRequest) { appendMessage('user', userMessage); userInput.value = ''; }
    
    const loadingBubble = document.createElement('div');
    loadingBubble.id = 'loading-indicator';
    loadingBubble.classList.add('flex', 'items-start');
    loadingBubble.innerHTML = `<div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">AI</div><div class="ml-3 bg-white p-3 rounded-xl max-w-[80%] animate-pulse shadow-sm"><p class="text-sm">...</p></div>`;
    chatMessages.appendChild(loadingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    const chatHistory = getChatHistory();
    // ⬇️ THIS IS THE MODIFIED LINE ⬇️
    let systemInstructionText = `You are a specialized AI assistant for the Nazareth College E-Waste Website. Your knowledge is strictly limited to the following context. You MUST NOT answer any questions that cannot be answered using this text. If a user asks a question that is off-topic or cannot be answered with the provided information, you must politely state that you can only answer questions related to the E-Waste Website. Do not try to answer the question anyway. Context: ${ragContext}`;
    let finalUserMessage = userMessage;
    
    if (isSummaryRequest) {
        systemInstructionText = `You are a conversation summarizer. Provide a concise, single-paragraph summary of the following chat history.`;
        finalUserMessage = chatHistory.map(m => m.role === 'user' ? `User: ${m.parts[0].text}` : `AI: ${m.parts[0].text}`).join('\n');
    }
    
    const payload = { contents: [{ role: 'user', parts: [{ text: finalUserMessage }] }], systemInstruction: { parts: [{ text: systemInstructionText }] } };
    
    try {
        const response = await fetch(chatAPI_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) { throw new Error(`API error: ${response.statusText}`); }
        const result = await response.json();
        if (!result.candidates || !result.candidates[0].content) { throw new Error('Invalid API response'); }
        const aiResponse = result.candidates[0].content.parts[0].text;
        loadingBubble.remove();
        appendMessage('ai', aiResponse);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        loadingBubble.remove();
        appendMessage('ai', "Sorry, I'm having trouble connecting. Please check your API key and ensure it's correct.");
    }
}

    function getChatHistory() {
        const messages = [];
        const messageElements = chatMessages.querySelectorAll('.flex.items-start');
        for (let i = 1; i < messageElements.length; i++) { // Start from 1 to skip the initial greeting
            const element = messageElements[i];
            const sender = element.querySelector('.order-2') ? 'user' : 'model';
            const text = element.querySelector('p').textContent;
            if (text !== '...') {
                messages.push({ role: sender === 'user' ? 'user' : 'model', parts: [{ text: text }] });
            }
        }
        return messages;
    }

    sendButton.addEventListener('click', () => sendMessage(false));
    summaryButton.addEventListener('click', () => sendMessage(true));
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(false); } });
}