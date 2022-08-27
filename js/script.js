// credit to Edis for help me cleaning this javascript file, you can still see my garbage code at the bottom
//Thanks Edis,   https://www.frontendmentor.io/profile/edo979 

let data = [];

selectedTimeFrame = 'daily'

const buttons = Array.from(document.querySelectorAll("[data-show]"));
const currentElements = Array.from(document.querySelectorAll(".current-data"));
const previousElements = Array.from(
  document.querySelectorAll(".previous-data")
);


fetch('../data.json')
  .then((res) => res.json())
  .then((result) => {
    data = result

    updateView()
  })

  // Event listeners
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    selectedTimeFrame = e.target.dataset.show

    updateView()
  })
})

function updateView() {
  data.forEach((activity, i) => {
    const currentValue = activity.timeframes[selectedTimeFrame].current

    currentElements[i].textContent = currentValue + getTimeUnits(currentValue)

    previousElements[i].textContent = formatTextPrevEl(
      activity.timeframes[selectedTimeFrame].previous
    )
  })
}


// Utility
function getTimeUnits(value) {
  return value > 1 ? 'hrs' : 'hr'
}

function formatTextPrevEl(number) {
  const timeUnit = getTimeUnits(number)

  switch (selectedTimeFrame) {
    case 'daily':
      return `${number}${timeUnit} - yesterday`

    case 'weekly':
      return `last week - ${number}${timeUnit}`

    case 'monthly':
      return `last month - ${number}${timeUnit}`

    default:
      return
  }
}


// fetch("../data.json")
//   .then((res) => res.json())
//   .then((result) => {
//     data = result;
//     buttons.forEach((button) => {
//       button.addEventListener("click", () => {
//         const timeFrames = button.getAttribute("data-show");

//         data.map((n, i) => {
//           if (timeFrames === "daily") {
//             currentElements[i].textContent = updateDisplayCurrent(
//               n.timeframes.daily.current
//             );

//             previousElements[i].textContent = updateDisplayYesterday(n.timeframes.daily.previous) 
//           }

//           if (timeFrames === "weekly") {
//             currentElements[i].textContent = updateDisplayCurrent(
//               n.timeframes.weekly.current
//             );
//             previousElements[i].textContent = updateDisplayPrevious(n.timeframes.weekly.previous, "week")
//           }

//           if (timeFrames === "monthly") {
//             currentElements[i].textContent = updateDisplayCurrent(
//               n.timeframes.monthly.current
//             );
//             previousElements[i].textContent = updateDisplayPrevious(n.timeframes.monthly.previous, "month")
//           }
//         });
//       });
//     });
//   });

// function updateDisplayCurrent(n) {
//   return n <= 1 && n < 2 ? `${n}hr` : `${n}hrs`;
// }

// function updateDisplayPrevious (n , s) {
// return n <= 1 && n < 2 ? `last ${s} - ${n}hr` : `last ${s} - ${n}hrs`;
// }

// function updateDisplayYesterday(n) {
//   return n <= 1 && n < 2 ? `${n}hr - yesterday` : `${n}hrs - yesterday`;
// }