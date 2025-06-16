let balance = 10000;
let skins = [
    "MERS G65| Brabus", "BMW F 90 | BEKXAA", "BMW M4 COMPITETION | BEKXAA", "VAZ 01 | GOLD"
];
let chatBox = document.getElementById("chat-box");

function roll() {
    if (balance < 100) {
        alert("Coin yetarli emas!");
        return;
    }
    balance -= 100;
    document.getElementById("balance").innerText = balance;

    let randomIndex = Math.floor(Math.random() * skins.length);
    let wonSkin = skins[randomIndex];
    document.getElementById("roulette").innerText = "Aylanmoqda...";
    setTimeout(() => {
        document.getElementById("roulette").innerText = "🎉 " + wonSkin;
        document.getElementById("won-skin").innerText = wonSkin;
    }, 1500);
}

function sendMessage() {
    let input = document.getElementById("chat-input");
    if (input.value.trim() === "") return;
    let msg = document.createElement("div");
    msg.innerText = "👤 Guest: " + input.value;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
}
