var _glimelab_endpoint = "http://127.0.0.1:8080";

var _glimelab_filter = "all";

function addNamespaceSelector() {
  const body = document.querySelector("body");
  console.log(body);

  const _default = "all";

  const options = [
    {
      title: "All (default)",
      value: "all",
    },
    {
      title: "Web only",
      value: "web-only",
    },
    {
      title: "Chat only",
      value: "chat-only",
    },
  ];

  const isDefault = (value) => (value == _default ? "selected" : "");

  const optionsHtml = options.map((opt) => {
    return `<option value="${opt.value}" ${isDefault(opt.value)}>${
      opt.title
    }</option>`;
  });

  const wrapper = document.createElement("div");
  wrapper.id = "options-selector-wrapper";
  wrapper.innerHTML = `<form><label>Filter</label><select id="options-selector"><option>Filter</option>${optionsHtml}</select>`;

  body.appendChild(wrapper);

  document
    .getElementById("options-selector")
    .addEventListener("change", (e) => {
      _glimelab_filter = e.target.value;
    });
}

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
      _messages[json.messageId] = {
        selected: json.versions.length - 1,
        versions: json.versions,
      };

      const answer =
        _messages[json.messageId][_messages[json.messageId].selected].answer;

      setGPTResponse(GPTChatBubble, `${answer}`, json.messageId);
    })
    .catch((_) => {
      // console.log(err);
    });
}

function setGPTResponse(GPTChatBubble, response, messageId) {
  const responseEl = (document.createElement("div").innerText = response);

  GPTChatBubble.style.display = "block";
  // update arrows

  let previous = GPTChatBubble.getElementById("btn1");
  if (previous) {
    if (
      _messages[messageId].versions.length == 1 ||
      _messages[messageId].selected == 0
    ) {
      previous.setAttribute("disabled", "true");
    } else {
      previous.setAttribute("disabled", "false");
    }
  }

  let next = GPTChatBubble.getElementById("btn2");
  if (
    _messages[messageId].versions.length == 1 &&
    _messages[messageId].selected == _messages[messageId].versions.length - 1
  ) {
    next.setAttribute("disabled", "true");
  } else {
    next.setAttribute("disabled", "false");
  }

  GPTChatBubble.appendChild(responseEl);
}

const _messages = {};

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

      let findGptChatBubble = chatBubble.querySelector(
        `div[id=gpt-response-${chatBubble.id}]`
      );

      if (!findGptChatBubble) {
        findGptChatBubble = document.createElement("div");
        findGptChatBubble.id = `gpt-response-${chatBubble.id}`;
      }

      findGptChatBubble.style.display = "none";

      // Create the arrows
      // <div><button>Prev</button><button>Next</button></div>

      const versionSelector = document.createElement("div");

      const prevButton = document.createElement("button");
      nextButton.id = "btn1";
      prevButton.innerText = "Previous";
      prevButton.onclick = () => {
        alert("Prev!");
      };

      const nextButton = document.createElement("button");
      nextButton.id = "btn2";
      nextButton.innerText = "Next";
      nextButton.onclick = () => {
        alert("Next!");
      };

      versionSelector.appendChild(prevButton);
      versionSelector.appendChild(nextButton);

      findGptChatBubble.appendChild(versionSelector);

      const findGptChatButton = document.createElement("button");
      findGptChatButton.id = `gpt-button-${chatBubble.id}`;
      findGptChatButton.innerHTML = `<img style="height: 16px; width: 16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAr5JREFUOI1tk11InnUYxn/X/3n8Wr6KgtDaigYFHXQQUQhRbESrBh1E0Fz6CiNIYoM62JhsoI/mmrYYRdJBDBakjjJoHTktomgnK6iDOvUotFWCH+/rnPk+z//qoAitXcf3fd3wu69LttmuXR+9uScN+TngENCMue6EoWp39i23kbYb/LN83eZKSJLxPIb1VLUum7eAGSCR9XXzLX+w2Jdt7DDQ+HhDqX35osz6Wjk7JqTmiaEuiTHBvKUJ4ZpNF/CAzRPV3uwP2aZ1arjb5j2gPcAjBFZjZAJok3RirWfwasel86Wll09VAUqTw+/K3FvpzZ5X6+TQ09FMy+oyvpzXpQ8leXE02A2VW7uHS4039hEYAw4YZos07W/YzKtFyu91oiNEc8aof613cG4bGTnoh+amG+cJfI/CBTVwH2IpzfOf81SvA7WotC0AD6chmf0fXnsoBH0hOILjaNzUS+t7OAFJZ5AfB5qC85UgsxqLeOffl6mluXdhyQ6vrfUMXl0rZ7OYM5LLpQW+coh3VeZ5BvisZgaCxSdWHNA3w6lNNxQXhQ+hqB3/hjkiryj6irMsFjGcMxxO68RIzayUFphDybHq3uLJ5kX6ZM62Tr4xCi4QY8DnecJGauoBnMQlmZYQa7QDW4JrUHzXvMiFUM/HwCnjqQjPYg38F1EaeQr4MeiOxhUgibX693PxoEy7/2QeOAlJ5/peTkp+NKJ/I1uaGNmPeDugsbD8Yv8aZkZ1W2c3erKFSjnrbWzgnko5e0EU+0oL/GQ4GPBUWoS7gUYpThuOr5YHv5RtSh+Odqhu65rhF8G0USJ8WOZ+pNOVcnbZ2C2Tw5cQqt7c3ee+vtrOLnz6TlPLZvVVyweAAngO6XSeJNNhK28LgePAwZjz2PrR7LfbtnG7ShMj+6U4BHQCy5iZoo6hm0eyX7fP/QWAi048PHhBHwAAAABJRU5ErkJggg==" /> Ask ChatGPT-4`;
      findGptChatButton.onclick = function (_) {
        const { serverId, channelId, messageId } = getMessageIds(chatBubble.id);

        fetch(`${_glimelab_endpoint}/messages`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question: content,
            serverId: serverId,
            channelId: channelId,
            messageId: messageId,
            filter: _glimelab_filter,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            _messages[json.messageId] = {
              selected: json.versions.length - 1,
              versions: json.versions,
            };

            const answer =
              _messages[json.messageId][_messages[json.messageId].selected]
                .answer;

            setGPTResponse(findGptChatBubble, `${answer}`, messageId);
          })
          .catch((_) => {
            setGPTResponse(
              findGptChatBubble,
              `Failure to fetch an answer.`,
              messageId
            );
          });
      };

      chatBubble.appendChild(findGptChatWraooer);

      chatBubble.appendChild(findGptChatBubble);

      findGptChatWraooer.appendChild(findGptChatButton);

      fetchGPTAnswer(findGptChatBubble, chatBubble.id);
    }
  }
}

setInterval(addGPTButton, 300);

addNamespaceSelector();
