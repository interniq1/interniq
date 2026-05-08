const internships = [

  {
    company: "Google",
    role: "Career Opportunities",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Remote",
    link: "https://careers.google.com/",
    logo: "images/google.png"
  },

  {
    company: "Amazon",
    role: "Internships & Jobs",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Hybrid",
    link: "https://www.amazon.jobs/",
    logo: "images/amazon.png"
  },

  {
    company: "Deloitte",
    role: "Graduate Opportunities",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Multiple Roles",
    link: "https://www2.deloitte.com/",
    logo: "images/deloitte.png"
  },

  {
    company: "Microsoft",
    role: "Student Programs",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Remote",
    link: "https://careers.microsoft.com/",
    logo: "images/microsoft.png"
  },

  {
    company: "Infosys",
    role: "Internships & Careers",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Hybrid",
    link: "https://www.infosys.com/careers/",
    logo: "images/infosys.png"
  },

  {
    company: "TCS",
    role: "Career Opportunities",
    location: "India",
    stipend: "Visit Career Portal",
    mode: "Multiple Roles",
    link: "https://www.tcs.com/careers",
    logo: "images/tcs.png"
  }

];

const savedInternships = [];

const container = document.querySelector(".cards-container");

const searchInput = document.querySelector("#searchInput");

/* DISPLAY INTERNSHIPS */

function displayInternships(data){

  container.innerHTML = "";

  if(data.length === 0){

    container.innerHTML = `
      <h2 class="empty-message">
        No opportunities found
      </h2>
    `;

    return;
  }

  data.forEach((item) => {

    container.innerHTML += `

      <div class="card">

        <img src="${item.logo}" class="company-logo">

        <h3>${item.company}</h3>

        <p>${item.role}</p>

        <p>${item.location}</p>

        <p>${item.stipend}</p>

        <span class="mode">${item.mode}</span>

        <div class="card-buttons">

          <button onclick="window.open('${item.link}')">
            Apply Now
          </button>

          <button
            class="save-btn"
            onclick="saveInternship(
              this,
              '${item.company}',
              '${item.role}',
              '${item.location}'
            )"
          >
            Save
          </button>

        </div>

      </div>

    `;

  });

}

/* INITIAL DISPLAY */

displayInternships(internships);

/* SEARCH FUNCTION */

function searchInternships(){

  const value = searchInput.value.toLowerCase();

  if(value === ""){

    displayInternships(internships);

    return;

  }

  const filteredData = internships.filter((item) => {

    return item.company.toLowerCase().includes(value);

  });

  displayInternships(filteredData);

}

/* LIVE RESET */

searchInput.addEventListener("keyup", () => {

  if(searchInput.value === ""){

    displayInternships(internships);

  }

});

/* FILTER FUNCTION */

function filterInternships(mode){

  if(mode === "All"){

    displayInternships(internships);

  }

  else{

    const filtered = internships.filter((item) => {

      return item.mode === mode;

    });

    displayInternships(filtered);

  }

}

/* SAVE FUNCTION */

function saveInternship(button, company, role, location){

  const savedContainer = document.querySelector(".saved-container");

  const existingIndex = savedInternships.findIndex((item) => {

    return item.company === company;

  });

  /* REMOVE */

  if(existingIndex !== -1){

    savedInternships.splice(existingIndex, 1);

    button.innerText = "Save";

    button.style.background = "#1e293b";

    showNotification("Opportunity Removed");

  }

  /* SAVE */

  else{

    savedInternships.push({
      company,
      role,
      location
    });

    button.innerText = "Saved";

    button.style.background = "#22c55e";

    showNotification("Opportunity Saved");

  }

  /* DISPLAY SAVED */

  savedContainer.innerHTML = "";

  savedInternships.forEach((item) => {

    savedContainer.innerHTML += `

      <div class="card">

        <h3>${item.company}</h3>

        <p>${item.role}</p>

        <p>${item.location}</p>

      </div>

    `;

  });

}

/* NOTIFICATION */

function showNotification(message){

  const notification = document.getElementById("notification");

  notification.innerText = message;

  notification.style.display = "block";

  setTimeout(() => {

    notification.style.display = "none";

  }, 2000);

}

/* THEME TOGGLE */

function toggleTheme(){

  document.body.classList.toggle("light-mode");

}

/* TYPING EFFECT */

const texts = [

  "Find Internships",

  "Find Placements",

  "Build Your Career",

  "Grow With Interniq"

];

let count = 0;

let index = 0;

let currentText = "";

let letter = "";

function type(){

  if(count === texts.length){

    count = 0;

  }

  currentText = texts[count];

  letter = currentText.slice(0, ++index);

  document.getElementById("typing-text").textContent = letter;

  if(letter.length === currentText.length){

    count++;

    index = 0;

  }

  setTimeout(type, 120);

}

type();

/* SCROLL REVEAL */

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

});

hiddenElements.forEach((el) => observer.observe(el));

/* BACK TO TOP */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if(window.scrollY > 300){

    topBtn.style.display = "block";

  }

  else{

    topBtn.style.display = "none";

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

});