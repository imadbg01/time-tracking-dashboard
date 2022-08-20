let data = [];

const buttons = Array.from(document.querySelectorAll("[data-show]"));
const currentElements = Array.from(document.querySelectorAll(".current-data"));
const previousElements = Array.from(
  document.querySelectorAll(".previous-data")
);

fetch("../data.json")
  .then((res) => res.json())
  .then((result) => {
    data = result;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const timeFrames = button.getAttribute("data-show");

        data.map((n, i) => {
          if (timeFrames === "daily") {
            currentElements[i].textContent = updateDisplayCurrent(
              n.timeframes.daily.current
            );

            previousElements[i].textContent = updateDisplayPrevious(n.timeframes.daily.previous, "day")  
          }

          if (timeFrames === "weekly") {
            currentElements[i].textContent = updateDisplayCurrent(
              n.timeframes.weekly.current
            );
            previousElements[i].textContent = updateDisplayPrevious(n.timeframes.weekly.previous, "week")
          }

          if (timeFrames === "monthly") {
            currentElements[i].textContent = updateDisplayCurrent(
              n.timeframes.monthly.current
            );
            previousElements[i].textContent = updateDisplayPrevious(n.timeframes.monthly.previous, "month")
          }
        });
      });
    });
  });

function updateDisplayCurrent(n) {
  return n <= 1 && n < 2 ? `${n}hr` : `${n}hrs`;
}

function updateDisplayPrevious (n , s) {
return n <= 1 && n < 2 ? `last ${s} - ${n}hr` : `last ${s} - ${n}hrs`;
}