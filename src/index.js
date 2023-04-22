function addGPTButton() {
  const chatBubbles = document.querySelectorAll("li[id*=chat-messages]");

  for (let i = 0; i < chatBubbles.length; i++) {
    const chatBubble = chatBubbles[i];
    const content = chatBubble.querySelector(
      "div[id*=message-content]"
    ).textContent;

    let findGptChatWraooer = chatBubble.querySelector(
      `div[id=gpt-button-wrapper-${chatBubble.id}]`
    );

    if (!findGptChatWraooer) {
      findGptChatWraooer = document.createElement("div");
      findGptChatWraooer.id = `gpt-button-wrapper-${chatBubble.id}`;

      const findGptChatButton = document.createElement("button");
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

      chatBubble.appendChild(findGptChatWraooer);

      findGptChatWraooer.appendChild(findGptChatButton);
    }
  }
}

setInterval(addGPTButton, 200);
