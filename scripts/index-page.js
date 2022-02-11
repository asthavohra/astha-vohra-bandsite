let comments = [
  {
    name: "Connor Walton",
    timeStamp: "02/17/2021",
    message:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    timeStamp: "01/09/2021",
    message:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    timeStamp: "12/20/2020",
    message:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];
// This function builds and displays a comment based on the object passed to it
const displayComment = (newComment) => {
  // Element containing the comment avatar
  let commentAvatar = document.createElement("div");
  commentAvatar.classList.add("comment__avatar");

  // Element containing the comment name
  let commentName = document.createElement("div");
  commentName.classList.add("comment__details-name");
  commentName.innerText = newComment.name;

  // Element containing the comment timestamp
  let commentTime = document.createElement("div");
  commentTime.classList.add("comment__details-timestamp");
  // display the time stamped as a time passed message
  commentTime.innerText = newComment.timeStamp;

  // Element containing the comment message
  let commentMessage = document.createElement("div");
  commentMessage.classList.add("comment__details-message");
  commentMessage.innerText = newComment.message;

  // div containing the message and time stamp
  let commentDetailsHeader = document.createElement("div");
  commentDetailsHeader.classList.add("comment__details-header");
  commentDetailsHeader.appendChild(commentName);
  commentDetailsHeader.appendChild(commentTime);

  //div containing header and message
  let commentDetails = document.createElement("div");
  commentDetails.classList.add("comment__details");
  commentDetails.appendChild(commentDetailsHeader);
  commentDetails.appendChild(commentMessage);

  // div containing avatar and comment details
  let comment = document.createElement("div");
  comment.classList.add("comment");
  comment.appendChild(commentAvatar);
  comment.appendChild(commentDetails);

  //Once the comment is built add it to the comment list
  let commentsList = document.querySelector(".comments__list");
  commentsList.prepend(comment);
};

/* loop through each object in the comments array - build the html element and display it*/
comments.forEach((comment) => {
  displayComment(comment);
});

let commentForm = document.querySelector(".new-comment__form");
// submit the form values using an event listener
commentForm.addEventListener("submit", (event) => {
  // prevents the page from reloading upon submit
  event.preventDefault();
  //checks if the name is null or empty and adds a new class to the element which adds new property
  let name = document.getElementById("name");
  let nameValue = name.value;
  if (nameValue === null || nameValue === "") {
    name.classList.add("new-comment__form-error");

    return;
  }

  let today = new Date();
  // create a new comment object from the values submitted
  let newComment = {
    name: event.target.name.value,
    timeStamp:
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear(),
    message: event.target.message.value,
  };

  //push the new comment to the comments array
  comments.push(newComment);

  //clear all the previous comments from the screen
  const allComments = document.querySelectorAll(".comment");
  allComments.forEach((comment) => {
    comment.remove();
  });

  // re-render all the comments from the comment array
  comments.forEach((comment) => {
    displayComment(comment);
  });

  // Reset the input boxes with a blank value and the placeholder
  event.target.name.value = "";
  event.target.message.value = "";
});
