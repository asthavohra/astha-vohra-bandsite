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

// initialize an array to hold the classes for each show detail
let showDetailsClasses = ["show__date", "show__venue", "show__location"];
//Get the container on the page that a show will be appended to
let showContainer = document.querySelector(".shows__list");

//This function creats the headers for the shows
const displayShowHeaders = () => {
  // initialize an array to hold each labels for each show detail
  let showHeaderTexts = ["DATE", "VENUE", "LOCATION"];
  // create the tablet labels that show on medium devices
  let showHeaderList = document.createElement("ul");
  showHeaderList.classList.add("shows__labels-tablet");
  //used forEach to iterate through each label and create its element, add class and append it to shows__labels-tablet
  showHeaderTexts.forEach((labels) => {
    let showLabel = document.createElement("li");
    showLabel.classList.add("shows__label");
    showLabel.innerText = labels;
    showHeaderList.appendChild(showLabel);
  });
  //append to show__list div
  showContainer.appendChild(showHeaderList);
};
//created a div and added onclick event
const displayShowDetails = (show) => {
  let showClassCounter = 0;
  let showDiv = document.createElement("div");
  showDiv.classList.add("show");
  showDiv.setAttribute("onclick", "markActive(event)");
  //created element for each show detail
  let showLabels = document.createElement("ul");
  showLabels.classList.add("show__details");
  //iterated through each object in array using its key fom the key value pairs
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
  //added buy tickets button
  let showButton = document.createElement("button");
  showButton.classList.add("show__cta");
  showButton.innerText = "BUY TICKETS";
  showDiv.appendChild(showButton);
  showContainer.appendChild(showDiv);
};
//used this function to add color to each row when selected
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
