const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-bt");

function openWindow () {
  let popup = document.querySelector(".popup");

  popup.classList.add("popup__opened");
}

function closeWindow () {
  let popup = document.querySelector(".popup");

  popup.classList.remove("popup__opened");
}

editButton.addEventListener("click",openWindow);
closeButton.addEventListener("click",closeWindow);

const form = document.querySelector(".popup__form");

function profileSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let jobInput = document.querySelector("#job").value;


  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__job").textContent = jobInput;

  closeWindow();
}

form.addEventListener("submit", profileSubmit);