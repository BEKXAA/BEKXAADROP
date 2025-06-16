function spinRoulette() {
  const skins = document.getElementById("skins");
  const randomIndex = Math.floor(Math.random() * 3);
  const offset = -300 * randomIndex;
  skins.style.transform = `translateX(${offset}px)`;

  const result = ["AK-47 | Fire Serpent", "AWP | Asiimov", "M4A4 | Howl"];
  document.getElementById("result").innerText = "Siz yutdingiz: " + result[randomIndex];
}
