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

let showDetailsClasses = ["show__date", "show__venue", "show__location"];
let showContainer = document.querySelector(".shows__list");

const displayShowHeaders = () => {
  let showHeaderTexts = ["DATE", "VENUE", "LOCATION"];
  let showHeaderList = document.createElement("ul");
  showHeaderList.classList.add("shows__labels-tablet");

  showHeaderTexts.forEach((labels) => {
    let showLabel = document.createElement("li");
    showLabel.classList.add("shows__label");
    showLabel.innerText = labels;
    showHeaderList.appendChild(showLabel);
  });

  showContainer.appendChild(showHeaderList);
};
const displayShowDetails = (show) => {
  let showClassCounter = 0;
  let showDiv = document.createElement("div");
  showDiv.classList.add("show");
  showDiv.setAttribute("onclick", "markActive(event)");

  let showLabels = document.createElement("ul");
  showLabels.classList.add("show__details");

  Object.keys(show).forEach((key) => {
    let showLabel = document.createElement("li");
    showLabel.classList.add("show__label--mobile");
    showLabel.innerText = key;

    let showLabelValue = document.createElement("li");
    showLabelValue.classList.add(showDetailsClasses[showClassCounter++]);
    showLabelValue.innerText = show[key];

    showLabels.appendChild(showLabel);
    showLabels.appendChild(showLabelValue);
    showClassCounter = showClassCounter % 3;
  });
  showDiv.appendChild(showLabels);

  let showButton = document.createElement("button");
  showButton.classList.add("show__cta");
  showButton.innerText = "BUY TICKETS";
  showDiv.appendChild(showButton);
  showContainer.appendChild(showDiv);
};

const markActive = (event) => {
  let showDivs = showContainer.querySelectorAll("div");
  let currentDiv = event.target;
  let showParent = currentDiv;
  showDivs.forEach(function (show) {
    show.classList.remove("show__selected");
  });
  if (currentDiv.localName === "li") {
    showParent = currentDiv.parentElement.parentElement;
  } else if (currentDiv.localName === "ul") {
    showParent = currentDiv.parentElement;
  }
  showParent.classList.add("show__selected");
};

displayShowHeaders();

// Display the entire shows array
shows.forEach((show) => {
  displayShowDetails(show);
});
/*
// initialize an array to hold each labels for each show detail
let labels = ["DATE", "VENUE", "LOCATION"];

// initialize an array to hold the classes for each show detail
let classes = ["show__date", "show__venue", "show__location"];

//Get the container on the page that a show will be appended to
let showsList = document.querySelector(".shows__list");

// create the tablet labels that show on medium devices
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

//function markActive changes the color of the rows in active state onclick event
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
//Function displayShow==> Takes in a show object, builds the html structure and displays it
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
*/
