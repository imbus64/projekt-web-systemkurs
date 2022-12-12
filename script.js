/*
 * "data" is the json object that is loaded by the HTML. It contains values from the pages.json
*/

let score = 0;
const answer_states = {};

// Used to randomize order of answers and questions
function shuffle_array(arr) {
    return arr.sort(() => Math.random() < 0.5);
}

// Inserts a quiz containing the set of questions defined in the json
function insert_quiz() {
    const m = document.getElementById("main");
    let text_area = document.createElement("div");
    text_area.classList.add("text-section");

    shuffle_array(data.quiz.questions).forEach((question, idx) => {
        const question_block = document.createElement("div");
        question_block.className = "question_block";
        const q_elem = document.createElement("p");
        q_elem.innerText = question.question;
        question_block.appendChild(q_elem);

        const form = document.createElement("form");
        shuffle_array(question.answers).forEach(answer => {
            const a_container = document.createElement("label");
            a_container.classList.add("no-select");
            const radio_btn = document.createElement("input")
            radio_btn.type = "radio";
            radio_btn.name = "quiz-answer";
            radio_btn.addEventListener("click", () => {
                if (!answer_states[idx]) {
                    answer_states[idx] = "checked";
                    if (answer.correct) {
                        score++;
                        a_container.style.backgroundColor = "#00FF0030";
                    }
                    else {
                        a_container.style.backgroundColor = "#FF000030";
                    }
                    redraw_scores();
                }
            });
            a_container.appendChild(radio_btn);

            const answerText = document.createElement("span");
            answerText.innerText = answer.text;
            a_container.appendChild(answerText);
            form.appendChild(a_container);
        })
        question_block.appendChild(form);
        text_area.appendChild(question_block);
    });
    m.appendChild(text_area);
}

// Scores are drawn in an element inside the only ".text-section" present in the quiz state
// This element has position: absolute, so it doesent interfere with other siblings
function redraw_scores() {
    let score_elem = document.getElementById("score");
    if (!score_elem) {
        const quiz_section = document.querySelector(".text-section");
        score_elem = document.createElement("div");
        score_elem.id = "score";
        quiz_section.appendChild(score_elem);
    }
    score_elem.innerText = "Poäng: " + score;
}

// Adds a link to the navigation bar
// Keep names short due to overflow
function add_link(name, destination) {
    let navbar = document.getElementById("link-list");
    let link = document.createElement("li");
    link.innerText = name;

    let a = document.createElement("a");
    a.href = destination;

    a.appendChild(link);
    a.addEventListener("click", () => {
        // Hack to make internal link actually update before we read it in link_handler
        window.location.hash = destination;
        link_handler();
    })
    navbar.appendChild(a);
}

// Displays a set of names and som other info in the footer
function display_contanct_info() {
    let footer = document.querySelector("#footer");
    let footer_content = document.createElement("div")
    footer_content.id = "footer_content";
    footer_content.innerText = `Projekt Lunds Universitet Q3-Q4 2022
    Namn Namnsson
    Test Testsson
    Mårten Oscarsson`
    footer.appendChild(footer_content);
}

// Function to add a section to the main content area
function insert_text_area(title, text) {
    let main_area = document.getElementById("main");
    let link = document.createElement("div");
    link.classList.add("text-section");

    header = document.createElement("h2");
    header.innerText = title;
    link.appendChild(header);
    link.innerHTML += text;
    main_area.appendChild(link);
}

// This method removes the "loading cover"
function rem_cov() {
    let cover = document.getElementById("page-cover");
    cover.style.transition = "visibility 0s linear 300ms, opacity 300ms"
    cover.style.opacity = 0;
    cover.style.visibility = "hidden";
}

// Displays links
for (link of data["links"]) {
    add_link(link.name, link.href);
}

// Clears the page "canvas" called main and then retrieves the internal link "hash" of the url.
// The "hash" then determines which render function is called.
function link_handler() {
    // If the page already has a hash it means that we are changing pages -> it is not our initial visit.
    // This means that we should clear it before rendering another.
    if (window.location.hash) document.getElementById("main").innerHTML = "";

    switch (window.location.hash) {
        case "#1": render_main(); break;
        case "#2": render_second(); break;
        case "#3": render_third(); break; // Uninmplemented
        case "#4": render_fourth(); break; // Uninmplemented
        case "#5": insert_quiz(); break;
        case "": render_main(); break;
        default: render_error(); break;
    }
}

// Responsible for inserting all elements associated with the main page
function render_main() {
    insert_text_area(data.mainpage.title, data.mainpage.text);
    // Insert all posts.
    // for (post of data["posts"]) {
    //     insert_text_area(post["title"], post["content"]);
    // }
}

// These function names refers to the internal link (#1, #2, #3 e.t.c.)
// They correspond to different page names defined in the json.
function render_second() {
    insert_text_area(data.page1.title, data.page1.text);
}

function render_third() {
    insert_text_area(data.page2.title, data.page2.text);
}

function render_fourth() {
    insert_text_area(data.page3.title, data.page3.text);
}

// Default "404" page, should never trigger unless manual url-rewrite
function render_error() {
    console.log("Invalid page");
    let main_area = document.getElementById("main");
    main_area.innerText = "Invalid page: 404";
}

// Call initial link_handler to render main page on first visit
link_handler();

// Make javascript remove the "loading cover" when site is fully loaded
document.addEventListener("DOMContentLoaded", rem_cov);

// Draw this only once, since the footer isnt used as a "dynamic" region
display_contanct_info();
