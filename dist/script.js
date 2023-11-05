"use strict";
const adviceNum = document.getElementById("advice-num");
const adviceText = document.querySelector(".advice-text");
const diceBtn = document.querySelector(".advice-btn");
diceBtn === null || diceBtn === void 0 ? void 0 : diceBtn.addEventListener("click", () => {
    getAdvice();
});
function getAdvice() {
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
        .then((res) => {
        clearInterval(loadingLines);
        return res.json();
    })
        .then((data) => {
        const { id, advice } = data.slip;
        if (adviceNum !== null) {
            adviceNum.innerHTML = `Advice #${id}`;
        }
        if (adviceText !== null) {
            adviceText.innerHTML = `"${advice}"`;
        }
    })
        .catch((error) => console.log(error));
}
