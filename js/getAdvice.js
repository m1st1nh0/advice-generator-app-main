const title = document.getElementById("title_advice");
const advice = document.getElementById("advice");
const btn = document.getElementById("btn");

async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";
  try {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();
    return data.slip;
  } catch (erro) {
    advice.textContent = "Erro ao carregar conselho, tente novamente.";
    console.error("Erro ao buscar dados", erro);
  }
}

function renderAdvice(slip) {
  title.textContent = `ADVICE #${slip.id}`;
  advice.textContent = `"${slip.advice}"`;
}

btn.addEventListener("click", async () => {
  btn.disabled = true;
  const slip = await getAdvice();
  renderAdvice(slip);
  btn.disabled = false;
});

async function init() {
  const slip = await getAdvice();
  if (slip) {
    renderAdvice(slip);
  }
}

init();
