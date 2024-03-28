// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const numberCat = 6;
const numberQuest = 5;
const base_API_URL = "https://rithm-jeopardy.herokuapp.com/api/";
const table = document.getElementById("jeopardy");
let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const res = await axios.get(`${base_API_URL}categories`, {
    params: { count: 100 },
  });
  console.log(res);
  const shuffledCat = shuffle(res.data);

  // Select the first 6 categories from the shuffled array
  const selectedCategories = shuffledCat.slice(0, 6);

  console.log(selectedCategories);
  return selectedCategories;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const res = await axios.get(`${base_API_URL}categories`, {
    params: { id: catId },
  });
  console.log(res.data);
  return {
    title: res.data.title, // Or however the title is returned
    clues: res.data.clues.map((clue) => ({
      question: clue.question, // Adjust these keys based on the actual response
      answer: clue.answer,
      showing: null,
    })),
  };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(categories) {
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  // Clear existing content
  thead.innerHTML = "";
  tbody.innerHTML = "";

  const header = document.createElement("tr");
  categories.forEach((category) => {
    const th = document.createElement("th");
    th.textContent = category.title;
    header.appendChild(th);
  });
  thead.appendChild(header);

  for (let i = 0; i < numberQuest; i++) {
    const questions = document.createElement("tr");
    categories.forEach((category) => {
      const td = document.createElement("td");
      td.textContent = "?"; //add spaan
      questions.appendChild(td);
    });
    tbody.appendChild(questions);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  const spinner = document.getElementById("spinner");
  table.style.displaym = "none";
  spinner.style.display = "block";
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
const startGame = document.getElementById("start");
const restartGame = document.getElementById("restart");

document.addEventListener("DOMContentLoaded", (event) => {
  if (startGame) {
    startGame.addEventListener("click", function () {
      console.log("Game started!");
      if (table) {
        table.style.display = "table"; //show the table
      }
    });
  }

  if (restartGame) {
    restartGame.addEventListener("click", function () {
      console.log("Game restarted!");
      const tbody = table.querySelector("tbody");
      if (tbody) {
        tbody.innerHTML = ""; // Clear all rows in <tbody>
      }
    });
  }
});
