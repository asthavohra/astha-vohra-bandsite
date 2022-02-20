//api key and hostname declared as variables
let hostName = "https://project-1-api.herokuapp.com";
let apiKey = "85f2ec0f-2a71-46d9-9a4b-05893999763512";
let commentsApiPath = "/comments";
let likeApiPath = "/like";
//this function interpolates and returns the url
let getCommentsUrl = () => {
  return `${hostName}${commentsApiPath}`;
};
//this function interpolates and return url
let getLikeUrl = (id) => {
  return `${hostName}${commentsApiPath}/${id}${likeApiPath}`;
};
//this function interpolates and return url
let getDeleteCommentUrl = (id) => {
  return `${hostName}${commentsApiPath}/${id}`;
};
//this function gets the response from api using axios and stores the data of response in a variable called comments
let getCommentsFromApi = () => {
  //passed apiKey variable as params and passed commentsUrl
  axios
    .get(getCommentsUrl(), {
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      //validateData function is called and the status is stored in a validationStatus variable
      let validationStatus = validateGetCommentsData(response);
      if (validationStatus) {
        //if successfull then store the data in comments variable and call displayData to perform DOM
        let comments = response.data;
        //sorted comments based on timestamp
        comments.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
        displayCommentsData(comments);
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
let validateGetCommentsData = (response) => {
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.length > 0
  )
    return true;
  else return false;
};

//used forEach to access each and called addComment function to perform DOM
let displayCommentsData = (comments) => {
  //removing the page loader gif after 3 sec so that data from API can be displayed
  setTimeout(() => {
    let commentLoader = document.getElementById("comment_loader");
    commentLoader.remove();

    comments.forEach((comment) => {
      addComment(comment);
    });
  }, 3000);
};

let postComment = (requestBody) => {
  //used post method to post comments and passed getCommentsUrl function
  axios
    .post(getCommentsUrl(), requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        api_key: apiKey,
      },
    })
    .then((response) => {
      //on validation success,response.data is stored in newComments variable and displayNewComment function is called
      let validateCommentsStatus = validateNewCommentData(response);
      if (validateCommentsStatus) {
        let newComments = response.data;
        displayNewComment(newComments);
        //on validation not success log an error message
      } else {
        console.log("Sorry! There is some error");
      }
    })
    .catch((error) => {
      console.log("Unable to post comments due to ", error);
    });
};

//validated the reponse from api
let validateNewCommentData = (response) => {
  if (response && response.status === 200 && response.data) {
    return true;
  } else {
    return false;
  }
};

//this function calls addComment function  and also clears the name and comment field when submit happens
let displayNewComment = (newComments) => {
  addComment(newComments);
  let nameLabel = document.getElementById("name");
  let messageLabel = document.getElementById("message");
  nameLabel.value = "";
  messageLabel.value = "";
};

//this function performs DOM for adding new comments and also displaying comments from api
let addComment = (comment) => {
  let mainCommentDiv = document.getElementById("comments");

  let commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  //set id for the div to fetch it later for deletion
  commentDiv.setAttribute("id", "" + comment.id + "_comment");

  let commentAvatarDiv = document.createElement("div");
  commentAvatarDiv.classList.add("comment__avatar");

  let commentDetailsDiv = document.createElement("div");
  commentDetailsDiv.classList.add("comment__details");

  let commentDetailsHeaderDiv = document.createElement("div");
  commentDetailsHeaderDiv.classList.add("comment__details-header");

  let commentDetailsNameDiv = document.createElement("div");
  commentDetailsNameDiv.classList.add("comment__details-name");
  commentDetailsNameDiv.innerText = comment.name;

  let commentDetailsIimestampDiv = document.createElement("div");
  commentDetailsIimestampDiv.classList.add("comment__details-timestamp");
  let date = new Date(comment.timestamp);
  //converts time into the required readable format
  commentDetailsIimestampDiv.innerText = jQuery.timeago(date);

  commentDetailsHeaderDiv.appendChild(commentDetailsNameDiv);
  commentDetailsHeaderDiv.appendChild(commentDetailsIimestampDiv);

  commentDetailsDiv.appendChild(commentDetailsHeaderDiv);

  commentDiv.appendChild(commentAvatarDiv);
  commentDiv.appendChild(commentDetailsDiv);

  mainCommentDiv.prepend(commentDiv);

  let commentDetailsMessageDiv = document.createElement("div");
  commentDetailsMessageDiv.classList.add("comment__details-message");
  commentDetailsMessageDiv.innerText = comment.comment;

  commentDetailsDiv.appendChild(commentDetailsMessageDiv);

  let likeButtonDiv = document.createElement("div");
  likeButtonDiv.classList.add("comment__details-message-like");
  likeButtonCount = document.createElement("div");
  likeButtonCount.classList.add("comment__details-message-count");
  likeButtonCount.setAttribute("id", `${comment.id}`);

  likeButtonCount.innerText = comment.likes;
  likeButtonDiv.appendChild(likeButtonCount);
  let anchorLikeDiv = document.createElement("a");
  anchorLikeDiv.setAttribute(
    "href",
    `javascript:increaseLike('${comment.id}');`
  );

  let likeButton = document.createElement("img");
  likeButton.setAttribute("src", "../assets/icons/SVG/icon-like.svg");
  likeButton.alt = "like comment icon";

  let deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.classList.add("comment__details-message--delete");
  let anchorDeleteDiv = document.createElement("a");
  anchorDeleteDiv.setAttribute(
    "href",
    `javascript:deleteComment('${comment.id}');`
  );
  let deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "../assets/icons/SVG/icon-delete.svg");
  deleteButton.alt = "delete comment icon";

  anchorLikeDiv.appendChild(likeButton);
  likeButtonDiv.appendChild(anchorLikeDiv);
  anchorDeleteDiv.appendChild(deleteButton);
  deleteButtonDiv.appendChild(anchorDeleteDiv);
  likeButtonDiv.appendChild(deleteButtonDiv);
  commentDetailsMessageDiv.appendChild(likeButtonDiv);
  //commentDetailsMessageDiv.appendChild(deleteButtonDiv);
};

let increaseLike = (id) => {
  axios
    .put(getLikeUrl(id), null, { params: { api_key: apiKey } })
    .then((response) => {
      let likeValidation = validateGetLikeData(response);
      if (likeValidation) {
        //fetched the divsion using comment id
        let currentLikeCountDiv = document.getElementById(`${id}`);
        //replace the innertext to get the increased like count
        currentLikeCountDiv.innerText = response.data.likes;
      } else {
        console.log("Unable to increase likes", response);
      }
    })
    .catch((error) => {
      console.error("Unable to display likes due to ", error);
    });
};

let validateGetLikeData = (response) => {
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.likes
  ) {
    return true;
  } else {
    return false;
  }
};
//
let deleteComment = (id) => {
  axios
    .delete(getDeleteCommentUrl(id), { params: { api_key: apiKey } })
    .then((response) => {
      let deleteValidation = validateDeleteComment(response);
      if (deleteValidation) {
        let commentDiv = document.getElementById(`${id}_comment`);
        commentDiv.remove();
      } else {
        console.log("Unable to delete comments", response);
      }
    })
    .catch((error) => {
      console.error("Unable to delete comment due to ", error);
    });
};

let validateDeleteComment = (response) => {
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.id
  ) {
    return true;
  } else {
    return false;
  }
};

//evenlistener to remove the red border from name field when key is pressed
document.getElementById("name").addEventListener("keypress", (event) => {
  let nameLabel = document.getElementById("name");
  let nameValue = nameLabel.value;
  if (nameValue || nameValue !== "") {
    nameLabel.classList.remove("new-comment__form-name-error");
  }
});

//get form element and add eventlistner
document.getElementById("commentForm").addEventListener("submit", (event) => {
  //prevents default behaviour
  event.preventDefault();
  let nameLabel = document.getElementById("name");
  let messageLabel = document.getElementById("message");
  let requestBody = {
    name: nameLabel.value,
    comment: messageLabel.value,
  };
  if (!requestBody.name) {
    nameLabel.classList.add("new-comment__form-name-error");
    return;
  } else {
    nameLabel.classList.remove("new-comment__form-name-error");
  }
  postComment(requestBody);
});

//-----Caller------
getCommentsFromApi();
