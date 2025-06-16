let coin = 100;
let steps = 5;
let currentStep = 0;

function startGame() {
    const ladder = document.getElementById("ladder");
    ladder.innerHTML = "";
    currentStep = 0;

    for (let i = 0; i < steps; i++) {
        const step = document.createElement("div");
        step.className = "step";
        step.textContent = `Bosqich ${i + 1}`;
        step.onclick = () => nextStep(step, i);
        ladder.appendChild(step);
    }
}

function nextStep(step, index) {
    if (index !== currentStep) return;

    let success = Math.random() < 0.7; // 70% yutish ehtimoli
    if (success) {
        step.style.background = "green";
        currentStep++;
        if (currentStep === steps) {
            coin += 50;
            alert("🎉 Yutdingiz!");
        }
    } else {
        step.style.background = "red";
        coin -= 10;
        alert("😢 Yutqazdingiz!");
        currentStep = steps;
    }
    document.getElementById("coin").textContent = coin;
}
