let shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021 ",
    venue: "Pier 3 East ",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge ",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021 ",
    venue: "Hyatt Agency ",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021 ",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];
// initialize an array to hold each labels for each show detail
let labels = ["DATE", "VENUE", "LOCATION"];

// initialize an array to hold the classes for each show detail
let classes = ["show__date", "show__venue", "show__location"];

//Get the container on the page that a show will be appended to
let showsList = document.querySelector(".shows__list");

// create the tablet labels that show on devices >= tablet size
let showsTabletLabels = document.createElement("ul");
showsTabletLabels.classList.add("shows__labels-tablet");

labels.forEach((label) => {
  let tabletLabel = document.createElement("li");
  tabletLabel.classList.add("shows__label");
  if (label == "DATE") {
    tabletLabel.innerText = label;
  } else {
    tabletLabel.innerText = label;
  }
  showsTabletLabels.appendChild(tabletLabel);
});

// add the tablet labels to the shows list container
showsList.appendChild(showsTabletLabels);

//Function displayShow==> Takes in a show object, builds the html structure and displays it
function markActive(e) {
  var container = document.querySelector(".shows__list");
  var shows = container.querySelectorAll("div");
  shows.forEach(function (el) {
    el.classList.remove("show__selected");
  });
  if (e.target.localName === "li") {
    e.target.parentElement.parentElement.classList.add("show__selected");
  } else if (e.target.localName === "ul") {
    e.target.parentElement.classList.add("show__selected");
  } else {
    e.target.classList.add("show__selected");
  }
}

const displayShow = (show) => {
  // create a container for the show
  let showContainer = document.createElement("div");
  showContainer.classList.add("show");
  showContainer.setAttribute("onclick", "markActive(event)");

  // create a list for the show details

  let showDetails = document.createElement("ul");
  showDetails.classList.add("show__details");

  // create the list elements for the show details
  let key = "";
  labelCounter = 0;
  keyCounter = 0;
  // loop through each object key*2 for labels
  for (let i = 0; i < Object.keys(show).length * 2; i++) {
    //create a list element
    showElement = document.createElement("li");
    // if it is an even number element make it a label
    if (i % 2 == 0) {
      showElement.classList.add("show__label--mobile");
      showElement.innerText = labels[labelCounter];
      labelCounter++;
      // if it is an odd number element make it the value of the key associated with that label
    } else {
      key = Object.keys(show)[keyCounter];
      showElement.classList.add(classes[keyCounter]);
      showElement.innerText = show[key];
      keyCounter++;
    }
    // append the new element to the details list
    showDetails.appendChild(showElement);
  }

  // append the details element to the show container
  showContainer.appendChild(showDetails);

  // create a button for the
  let showButton = document.createElement("button");
  showButton.classList.add("show__cta");
  showButton.innerText = "BUY TICKETS";

  // append the button to the show container
  showContainer.appendChild(showButton);

  // append the show to the show list
  showsList.appendChild(showContainer);
};

// Display the entire shows array
shows.forEach((show) => {
  displayShow(show);
});
