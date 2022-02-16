//api key used
let apiKey = "85f2ec0f-2a71-46d9-9a4b-058939997635";
let hostName = "https://project-1-api.herokuapp.com";
let showDateApiPath = "/showdates";

let getShowDatesUrl = () => {
  return `${hostName}${showDateApiPath}?api_key=${apiKey}`;
};
let getShowDatesData = () => {
  let showDatesUrl = getShowDatesUrl();
  axios
    .get(showDatesUrl)
    .then((response) => {
      displayShowDateData(response);
    })
    .catch((error) => {
      //request went and response returned with error ;anyhting apart from 2xx
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    });
};
getShowDatesData();
let displayShowDateData = (response) => {
  if (response && response.data) {
    let shows = response.data;
    displayShowHeaders();
    shows.forEach((show) => {
      let showClassCounter = 0;
      let showDiv = document.createElement("div");
      showDiv.classList.add("show");
      showDiv.setAttribute("onclick", "markActive(event)");
      //created element for each show detail
      let showLabels = document.createElement("ul");
      showLabels.classList.add("show__details");
      //iterated through each object in array using its key fom the key value pairs
      Object.keys(show).forEach((key) => {
        if (key !== "id") {
          let showLabel = document.createElement("li");
          showLabel.classList.add("show__label--mobile");
          showLabel.innerText = key;

          let showLabelValue = document.createElement("li");
          showLabelValue.classList.add(showDetailsClasses[showClassCounter++]);

          if (key === "date") {
            let date = new Date(parseInt(show[key]));
            showLabelValue.innerText = date.toDateString();
          } else {
            showLabelValue.innerText = show[key];
          }

          showLabels.appendChild(showLabel);
          showLabels.appendChild(showLabelValue);
          showClassCounter = showClassCounter % 3;
        }
      });
      showDiv.appendChild(showLabels);
      //added buy tickets button
      let showButton = document.createElement("button");
      showButton.classList.add("show__cta");
      showButton.innerText = "BUY TICKETS";
      showDiv.appendChild(showButton);
      showContainer.appendChild(showDiv);
    });
  }
};
// get the shows data from the api

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
