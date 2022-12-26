const colors = document.querySelectorAll(".cols");
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  event.code === "Space" ? setRandomColors() : "";
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyColor(event.target.textContent);
  }
});

function copyColor(value) {
  return navigator.clipboard.writeText(value);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function setRandomColors() {
  colors.forEach((cols) => {
    const isLocked = cols.querySelector("i").classList.contains("fa-lock");
    const text = cols.querySelector("h2");
    const button = cols.querySelector("button");
    const color = chroma.random();
    if (isLocked) {
      return;
    }

    text.textContent = color;
    cols.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

setRandomColors();
