const skins = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCnpXERZcLFF6YT_tQAeAu_SYOIohRGTggaCZdbNICQa2gXVomDK7CSlvxLzp5ixRaf0&usqp=CAU",
  "https://images.uzum.uz/csls3vb4nkdv7h9jnjf0/original.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWdE622Kn1zGDZRwf8siavHZeoxss3gJZlcQ&s"
];

function openCase() {
  const audio = document.getElementById("audio");
  audio.play();

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Ochilyapti...</p>";

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * skins.length);
    const img = `<img src="${skins[randomIndex]}" width="150" />`;
    resultDiv.innerHTML = `<p>Tabriklaymiz!</p>${img}`;
  }, 1500);
}
