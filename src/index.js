function addGPTButton() {
  const chatBubbles = document.querySelectorAll("li[id*=chat-messages]");

  for (let i = 0; i < chatBubbles.length; i++) {
    const chatBubble = chatBubbles[i];
    const content = chatBubble.querySelector(
      "div[id*=message-content]"
    ).textContent;

    const el = document.createElement("button");
    el.innerText = "Hei!";
    el.addEventListener("click", function (e) {
      // e.target.parentElement;
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
    });

    chatBubble.appendChild(el);
  }
}

// setTimeout(addGPTButton, 500);

// addGPTButton();
