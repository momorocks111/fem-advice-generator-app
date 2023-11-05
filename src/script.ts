const adviceNum: HTMLElement | null = document.getElementById("advice-num");
const adviceText: HTMLElement | null = document.querySelector(".advice-text");
const diceBtn: HTMLElement | null = document.querySelector(".advice-btn");

diceBtn?.addEventListener("click", () => {
  getAdvice();
});

function getAdvice(): void {
  const loadingLines = setInterval(() => {
    if (adviceText !== null) {
      adviceText.innerHTML =
        adviceText.innerHTML === "Loading..."
          ? "Loading"
          : `${adviceText.innerHTML}`;
    }
  }, 2000);

  if (adviceText !== null) {
    adviceText.innerHTML = "Loading...";
  }
  if (adviceNum !== null) {
    adviceNum.innerHTML = "";
  }

  fetch("https://api.adviceslip.com/advice")
    .then((res: Response) => {
      clearInterval(loadingLines);
      return res.json();
    })
    .then((data: { slip: { id: number; advice: string } }) => {
      const { id, advice } = data.slip;
      if (adviceNum !== null) {
        adviceNum.innerHTML = `Advice #${id}`;
      }
      if (adviceText !== null) {
        adviceText.innerHTML = `"${advice}"`;
      }
    })
    .catch((error: Error) => console.log(error));
}
