function startGame() {
  const skin = document.getElementById('skin');
  const status = document.getElementById('status');
  const sound = document.getElementById('catch-sound');

  skin.style.display = 'block';
  skin.style.top = '0px';

  let pos = 0;
  const interval = setInterval(() => {
    if (pos >= window.innerHeight - 120) {
      clearInterval(interval);
      status.innerText = '🎯 Siz coin tutdingiz!';
      sound.play();
    } else {
      pos += 10;
      skin.style.top = pos + 'px';
    }
  }, 50);
}
