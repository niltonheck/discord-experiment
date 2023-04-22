function addGPTButton() {
  const chatBubbles = document.querySelectorAll("li[id*=chat-messages]");

  for (let i = 0; i < chatBubbles.length; i++) {
    const chatBubble = chatBubbles[i];
    const content = chatBubble.querySelector(
      "div[id*=message-content]"
    ).textContent;

    let findGptChatButton = chatBubble.querySelector(
      `button[id=gpt-button-${chatBubble.id}]`
    );

    if (!findGptChatButton) {
      findGptChatButton = document.createElement("button");
      findGptChatButton.id = `gpt-button-${chatBubble.id}`;
      findGptChatButton.innerText = "Hei!";
      findGptChatButton.onclick = function (_) {
        console.log(`Message content: ${content}`);

        const gptResponse = `Blablabla at ${new Date()}`;

        let findGptChatBubble = chatBubble.querySelector(
          `div[id=gpt-response-${chatBubble.id}]`
        );

        if (!findGptChatBubble) {
          findGptChatBubble = document.createElement("div");
          findGptChatBubble.id = `gpt-response-${chatBubble.id}`;
        }

        findGptChatBubble.innerText = gptResponse;
        findGptChatBubble.style.border = "1px solid red";

        chatBubble.appendChild(findGptChatBubble);
      };

      chatBubble.appendChild(findGptChatButton);
    }
  }
}

function addCSS() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://github.com/niltonheck/discord-experiment/blob/draft/hardcore-grothendieck/src/styles.css";
  document.head.appendChild(link);
}

function bootstrap() {
  // load the css
  addCSS();

  // Check for new messages after every 200ms
  setInterval(addGPTButton, 200);
}

bootstrap();
