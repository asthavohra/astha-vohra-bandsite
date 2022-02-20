//api key and hostname declared as variables
let hostName = "https://project-1-api.herokuapp.com";
let apiKey = "85f2ec0f-2a71-46d9-9a4b-05893999763512";

//this function interpolates and returns the url
let getShowDateUrl = () => {
  let showDateApiPath = "/showdates";
  return `${hostName}${showDateApiPath}`;
};
//this function gets the response from api using axios and stores the data of response in a variable called shows
let getDataFromApi = () => {
  //passed apiKey variable as params
  axios
    .get(getShowDateUrl(), {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      //validateData function is called and the status is stored in a validationStatus variable
      let validationStatus = validateData(response);
      if (validationStatus) {
        //if successfull then store the data in shows variable and call displayData to perform DOM
        let shows = response.data;
        displayData(shows);
      } else {
        //log an error if validation had issues
        console.log("Sorry! There is some error");
      }
    })
    .catch((error) => {
      console.error("Sorry couldn't display the page due to error", error);
    });
};
//this function takes the response and validates it
let validateData = (response) => {
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.length > 0
  )
    return true;
  else return false;
};
// create the tablet labels that show on medium devices
let displayData = (shows) => {
  let showListDiv = document.querySelector(".shows__list");
  let showslabelstabletDiv = document.createElement("ul");
  showslabelstabletDiv.classList.add("shows__labels-tablet");
  // initialize an array to hold each labels for each show detail on medium and larger devices
  let labels = ["DATE", "VENUE", "LOCATION"];
  //used forEach to create the labels for the page to display on medium and larger devices
  labels.forEach((label) => {
    let showslabelDiv = document.createElement("li");
    showslabelDiv.classList.add("shows__label");
    showslabelDiv.innerText = label;
    showslabelstabletDiv.appendChild(showslabelDiv);
  });

  showListDiv.appendChild(showslabelstabletDiv);

  shows.forEach((show) => {
    let showDiv = document.createElement("div");
    showDiv.classList.add("show");
    //Add event listener
    showDiv.setAttribute("onclick", "markActive(event)");

    let showDetailsDiv = document.createElement("ul");
    showDetailsDiv.classList.add("show__details");

    // initialize an array to hold the classes for each show detail
    let showDetailsClasses = ["show__date", "show__venue", "show__location"];
    let showDetailsClassesCounter = 0;
    //iterated through each object in show array using its key fom the key value pairs
    Object.keys(show).forEach((key) => {
      if (key !== "id") {
        //This block creates labels specific for mobile
        let showLabelMobileDateDiv = document.createElement("li");
        showLabelMobileDateDiv.classList.add("show__label--mobile");
        showLabelMobileDateDiv.innerText = key;
        showDetailsDiv.appendChild(showLabelMobileDateDiv);

        //This block adds classes based on showDetailsClasses array
        let showDetailsValueDiv = document.createElement("li");
        showDetailsValueDiv.classList.add(
          showDetailsClasses[showDetailsClassesCounter]
        );
        if (key === "date") {
          //the date was in string ,used parseInt to convert it into integer and stored it into date variable
          let date = new Date(parseInt(show[key]));
          //used toDateString method to change the format of the date
          showDetailsValueDiv.innerText = date.toDateString();
        } else {
          showDetailsValueDiv.innerText = show[key];
        }
        showDetailsDiv.appendChild(showDetailsValueDiv);

        showDetailsClassesCounter++;
        if (showDetailsClassesCounter >= showDetailsClasses.length) {
          showDetailsClassesCounter = 0;
        }
      }
    });

    showDiv.appendChild(showDetailsDiv);

    let showCtaDiv = document.createElement("button");
    showCtaDiv.classList.add("show__cta");
    showCtaDiv.innerText = "BUY TICKETS";

    showDiv.appendChild(showCtaDiv);

    showListDiv.appendChild(showDiv);
  });
};
//used this function to add color to each row when selected
let markActive = (event) => {
  let showListDiv = document.querySelector(".shows__list");
  let showDivs = showListDiv.querySelectorAll("div");
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

//-------Caller------
getDataFromApi();
