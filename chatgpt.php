<?php
// --- CONFIGURE SESSION BEFORE START ---
ini_set('session.cookie_lifetime', 0); // cookie expires when browser closes
ini_set('session.gc_maxlifetime', 1440); // default 24 mins

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Reset chat if "New Chat" button clicked
if (isset($_GET["newchat"])) {
    $_SESSION["chat"] = [];
}

// Initialize chat if not set
if (!isset($_SESSION["chat"])) {
    $_SESSION["chat"] = [];
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["prompt"])) {
    $prompt = trim($_POST["prompt"]);

    // Add user message
    $_SESSION["chat"][] = ["role" => "user", "content" => $prompt];

    // Gemini API Key
    $apiKey = "AIzaSyDbZ49WeCSeITTlvMAGHLL5a52K8R6vDWw";
    $model = "gemini-1.5-flash";

    $url = "https://generativelanguage.googleapis.com/v1/models/$model:generateContent?key=$apiKey";

    $data = [
        "contents" => [
            [
                "parts" => [
                    ["text" => $prompt]
                ]
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    curl_close($ch);

    $responseData = json_decode($response, true);

    if (isset($responseData["candidates"][0]["content"]["parts"][0]["text"])) {
        $aiResponse = $responseData["candidates"][0]["content"]["parts"][0]["text"];
    } elseif (isset($responseData["error"])) {
        $aiResponse = "❌ API Error: " . $responseData["error"]["message"];
    } else {
        $aiResponse = "❌ Unexpected error. Please check your API key.";
    }

    // Add AI response
    $_SESSION["chat"][] = ["role" => "ai", "content" => $aiResponse];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gemini Chatbot</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: "Segoe UI", Arial, sans-serif;
            background: #343541;
            color: #ececec;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .chat-container {
            width: 100%;
            max-width: 900px;
            height: 95vh;
            background: #343541;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            overflow: hidden;
        }

        .header {
            padding: 10px;
            background: #202123;
            text-align: right;
        }
        .header a {
            color: white;
            text-decoration: none;
            background: #19c37d;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 14px;
        }
        .header a:hover {
            background: #15a56d;
        }

        .chat-box {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }

        .message {
            display: flex;
            margin: 12px 0;
        }

        .user {
            justify-content: flex-end;
        }

        .ai {
            justify-content: flex-start;
        }

        .bubble {
            padding: 14px 18px;
            border-radius: 10px;
            max-width: 70%;
            line-height: 1.5;
            white-space: pre-wrap;
            word-wrap: break-word;
            animation: fadeIn 0.3s ease-in;
        }

        .user .bubble {
            background: #0078ff;
            color: white;
            border-bottom-right-radius: 0;
        }

        .ai .bubble {
            background: #444654;
            color: #ececec;
            border-bottom-left-radius: 0;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .input-area {
            display: flex;
            padding: 12px;
            background: #40414f;
            border-top: 1px solid #555;
        }

        textarea {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #fff;
            font-size: 15px;
            resize: none;
            height: 50px;
            padding: 12px;
            border-radius: 6px;
        }

        button {
            background: #19c37d;
            border: none;
            padding: 0 20px;
            margin-left: 10px;
            border-radius: 6px;
            color: white;
            font-size: 15px;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background: #15a56d;
        }

        /* Scrollbar */
        .chat-box::-webkit-scrollbar {
            width: 8px;
        }
        .chat-box::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">
            <a href="?newchat=1">🆕 New Chat</a>
        </div>
        <div class="chat-box" id="chatBox">
            <?php foreach ($_SESSION["chat"] as $msg): ?>
                <div class="message <?= $msg["role"] ?>">
                    <div class="bubble"><?= nl2br(htmlspecialchars($msg["content"])) ?></div>
                </div>
            <?php endforeach; ?>
        </div>
        <form method="post" class="input-area">
            <textarea name="prompt" placeholder="Type your message..." required></textarea>
            <button type="submit">➤</button>
        </form>
    </div>

    <script>
        // Auto scroll to bottom
        var chatBox = document.getElementById("chatBox");
        chatBox.scrollTop = chatBox.scrollHeight;
    </script>
</body>
</html>
