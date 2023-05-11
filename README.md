# discord-experiment
Created with CodeSandbox

var r = parseInt(Math.random() * 1000);
fetch('https://raw.githubusercontent.com/niltonheck/discord-experiment/draft/hardcore-grothendieck/src/index.js?v=' + r).then(r => r.text()).then(d => {const s = document.createElement('script'); s.textContent = d; document.head.appendChild(s);}).catch(e => console.log(e));
fetch('https://raw.githubusercontent.com/niltonheck/discord-experiment/draft/hardcore-grothendieck/src/styles.css?v=' + r).then(r => r.text()).then(d => {const s = document.createElement('style'); s.textContent = d; document.head.appendChild(s);}).catch(e => console.log(e));