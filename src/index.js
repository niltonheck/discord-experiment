var _glimelab_endpoint = "http://127.0.0.1:8080";

function getMessageIds(chatBubbleId) {
  const URI = window.location.pathname.split("/");
  const serverId = URI[2];
  const channelId = URI[3];

  const idSplit = chatBubbleId.split("-");
  const messageId = idSplit[idSplit.length - 1];

  return { serverId, channelId, messageId };
}

function fetchGPTAnswer(GPTChatBubble, chatBubbleId) {
  const { serverId, channelId, messageId } = getMessageIds(chatBubbleId);

  fetch(
    `${_glimelab_endpoint}/messages/?serverId=${serverId}&channelId=${channelId}&messageId=${messageId}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("Found!");
      console.log(json);

      setGPTResponse(GPTChatBubble, `${json.answer}`);
    })
    .catch((_) => {
      // console.log(err);
    });
}

function setGPTResponse(GPTChatBubble, response) {
  GPTChatBubble.style.display = "block";
  GPTChatBubble.innerText = response;
}

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

      // console.log(`Message content: ${content}`);

      let findGptChatBubble = chatBubble.querySelector(
        `div[id=gpt-response-${chatBubble.id}]`
      );

      if (!findGptChatBubble) {
        findGptChatBubble = document.createElement("div");
        findGptChatBubble.id = `gpt-response-${chatBubble.id}`;
      }

      findGptChatBubble.style.border = "1px solid red";

      findGptChatBubble.style.display = "none";

      const findGptChatButton = document.createElement("button");
      findGptChatButton.id = `gpt-button-${chatBubble.id}`;
      findGptChatButton.innerHTML = `<img style="height: 16px; width: 16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAr5JREFUOI1tk11InnUYxn/X/3n8Wr6KgtDaigYFHXQQUQhRbESrBh1E0Fz6CiNIYoM62JhsoI/mmrYYRdJBDBakjjJoHTktomgnK6iDOvUotFWCH+/rnPk+z//qoAitXcf3fd3wu69LttmuXR+9uScN+TngENCMue6EoWp39i23kbYb/LN83eZKSJLxPIb1VLUum7eAGSCR9XXzLX+w2Jdt7DDQ+HhDqX35osz6Wjk7JqTmiaEuiTHBvKUJ4ZpNF/CAzRPV3uwP2aZ1arjb5j2gPcAjBFZjZAJok3RirWfwasel86Wll09VAUqTw+/K3FvpzZ5X6+TQ09FMy+oyvpzXpQ8leXE02A2VW7uHS4039hEYAw4YZos07W/YzKtFyu91oiNEc8aof613cG4bGTnoh+amG+cJfI/CBTVwH2IpzfOf81SvA7WotC0AD6chmf0fXnsoBH0hOILjaNzUS+t7OAFJZ5AfB5qC85UgsxqLeOffl6mluXdhyQ6vrfUMXl0rZ7OYM5LLpQW+coh3VeZ5BvisZgaCxSdWHNA3w6lNNxQXhQ+hqB3/hjkiryj6irMsFjGcMxxO68RIzayUFphDybHq3uLJ5kX6ZM62Tr4xCi4QY8DnecJGauoBnMQlmZYQa7QDW4JrUHzXvMiFUM/HwCnjqQjPYg38F1EaeQr4MeiOxhUgibX693PxoEy7/2QeOAlJ5/peTkp+NKJ/I1uaGNmPeDugsbD8Yv8aZkZ1W2c3erKFSjnrbWzgnko5e0EU+0oL/GQ4GPBUWoS7gUYpThuOr5YHv5RtSh+Odqhu65rhF8G0USJ8WOZ+pNOVcnbZ2C2Tw5cQqt7c3ee+vtrOLnz6TlPLZvVVyweAAngO6XSeJNNhK28LgePAwZjz2PrR7LfbtnG7ShMj+6U4BHQCy5iZoo6hm0eyX7fP/QWAi048PHhBHwAAAABJRU5ErkJggg==" /> Ask ChatGPT-4`;
      findGptChatButton.onclick = function (_) {
        const gptResponse = `Blablabla at ${new Date()}`;
        setGPTResponse(findGptChatBubble, gptResponse);
      };

      chatBubble.appendChild(findGptChatWraooer);

      chatBubble.appendChild(findGptChatBubble);

      findGptChatWraooer.appendChild(findGptChatButton);

      fetchGPTAnswer(findGptChatBubble, chatBubble.id);
    }
  }
}

setInterval(addGPTButton, 300);
