let registrationSubmit = document.querySelector("#submit");
const fname = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const emailAddress = document.querySelector("#email");
const message = document.querySelector("#message");
registrationSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  getToDo();
});

function RegisterUser() {
  fetch("https://localhost:44312/Users/AddNewUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: fname.value,
      lastName: lName.value,
      email: emailAddress.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok");
        return response.json();
      } else {
        console.log("not okay");
      }
    })
    .then((result) => {
      console.log(result);
      fname.value = "";
      lName.value = "";
      emailAddress.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

function getToDo() {
  fetch("https://localhost:44312/Users/GetAllUsers")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      console.log(result);
      //-----------------------
      let isUserExist = result.filter((element) => {
        return element.name === fname.value && element.lastName === lName.value;
      });
      console.log(isUserExist);
      if (isUserExist.length > 0) {
        const text = document.createElement("p");
        text.innerHTML = "This User Already Exist";
        fname.value = "";
        lName.value = "";
        emailAddress.value = "";
        message.appendChild(text);
        message.style.color = "red";
        text.style.fontSize = "40px";
        message.style.textAlign = "center";
        setTimeout(() => {
          message.style.display = "none";
          window.location = "../Login/index.html";
        }, 2000);
      } else {
        RegisterUser();
        const text = document.createElement("p");
        text.innerHTML = "New User is registered";
        text.style.fontSize = "40px";
        fname.value = "";
        lName.value = "";
        emailAddress.value = "";
        message.appendChild(text);
        message.style.color = "green";
        message.style.textAlign = "center";
        setTimeout(() => {
          message.style.display = "none";
          window.location = "../Login/index.html";
        }, 2000);
      }
    });
}
