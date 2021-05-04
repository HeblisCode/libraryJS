let shelf = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
  localStorage.setItem("shelfArray", JSON.stringify(shelf));
};

//ADD BOOKS******************************************************************************************************************************
function addBookToShelf(title, author, pages, read, id) {
  const book = new Book(title, author, pages, read, id);
  shelf.push(book);
  localStorage.setItem("shelfArray", JSON.stringify(shelf));
  return book;
}
function removeBookFromShelf(id) {
  for (let i = 0; i < shelf.length; i++) {
    if (shelf[i].id === id) shelf.splice(i, 1);
  }
  localStorage.setItem("shelfArray", JSON.stringify(shelf));
}

//NEW BOOK FORM*******************************************************************************************************
function submitForm() {
  const form = document.querySelector("form");
  const bookInfo = document.querySelectorAll("form > input");
  const readInfo = document.querySelector("#trueCheckboxForm");

  if (Array.from(bookInfo).some((element) => element.checkValidity() === false))
    return;
  const newBook = addBookToShelf(
    bookInfo[0].value,
    bookInfo[1].value,
    bookInfo[2].value > 9999
      ? `${Math.floor(bookInfo[2].value / 1000)}K`
      : bookInfo[2].value, //changes notation if the number is too big
    readInfo.checked,
    "id" + Math.floor(Math.random() * 99999) //random id
  );
  form.reset();
  displayBook(newBook);
  closePopUpMenu("addBookMenuContainer");
}

//CREATE BOOK HTML PARTS************************************************************************************************
function createCheckbox(checked) {
  const icon = document.createElement("span");
  const paragraph = document.createElement("p");
  const checkboxContainer = document.createElement("div");
  const wrapper = document.createElement("div");

  icon.innerText = "done";
  icon.classList.add("material-icons");
  if (checked) icon.classList.add("checkbox_true");

  paragraph.innerText = "Read?";

  checkboxContainer.classList.add("checkbox");
  checkboxContainer.appendChild(icon);

  wrapper.classList.add("readStatusContainer");
  wrapper.appendChild(paragraph);
  wrapper.appendChild(checkboxContainer);

  return wrapper;
}
function createParagraph(type, content) {
  const paragraph = document.createElement("p");
  paragraph.innerText = content;
  paragraph.classList.add(type);

  return paragraph;
}
function createDeleteButton() {
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("deleteButton");
  deleteButton.classList.add("material-icons");
  deleteButton.innerText = "close";
  return deleteButton;
}
function addEventListenerToBook(book) {
  const bookContainer = document.querySelector(`#${book.id}`);
  const deleteButton = bookContainer.querySelector(".deleteButton");
  const checkbox = bookContainer.querySelector(
    ".readStatusContainer > div > span"
  );

  deleteButton.addEventListener("click", () => {
    const bookContainer = document.querySelector(`#${book.id}`);
    bookContainer.remove();
    removeBookFromShelf(book.id);
  });

  checkbox.addEventListener("click", (e) => {
    toggleCheckbox(e);
    book.toggleReadStatus();
  });
}

//DISPLAY BOOK************************************************************************************************
function displayBook(book) {
  const shelfContainer = document.querySelector("#shelf");
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  bookContainer.id = book.id;

  const titlePar = createParagraph("title", book.title);
  const authorPar = createParagraph("author", book.author);
  const pagesPar = createParagraph("pages", book.pages);
  const checkboxWrapper = createCheckbox(book.read);
  const deleteButton = createDeleteButton(book.title);

  bookContainer.appendChild(titlePar);
  bookContainer.appendChild(authorPar);
  bookContainer.appendChild(pagesPar);
  bookContainer.appendChild(checkboxWrapper);
  bookContainer.appendChild(deleteButton);

  shelfContainer.appendChild(bookContainer);
  addEventListenerToBook(book);
}
function displayAllBooks() {
  if (shelf.length === 0) return;
  const shelfContainer = document.querySelector("#shelf");
  shelfContainer.innerHTML = "";
  shelf.forEach((book) => {
    displayBook(book);
  });
}

//POP UP MENU***********************************************************************************************************
function openPopUpMenu(container) {
  const menu = document.querySelector(`#${container}`);
  menu.style.display = "block";
}
function closePopUpMenu(container) {
  const menu = document.querySelector(`#${container}`);
  menu.style.display = "none";
}

//CHEBOXES*************************************************************************************************************
function toggleCheckbox(e) {
  e.target.classList.toggle("checkbox_true");
}

//INIT FUNCTION********************************************************************************************************
function init() {
  //get the books
  const shelfArray = localStorage.getItem("shelfArray");
  const addBookButton = document.querySelector("#addBookMenuButton");
  const submitFormButton = document.querySelector("#submitForm");
  const checkbox = document.querySelector("#formCheckbox > span");

  if (shelfArray === null) {
    shelf = [];
  } else {
    shelf = JSON.parse(shelfArray).map((book) =>
      Object.assign(new Book(), book)
    );
  }
  displayAllBooks();

  //set event listeners
  window.addEventListener("mousedown", (e) => {
    if (e.target.id === "addBookMenuContainer") {
      closePopUpMenu(e.target.id);
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopUpMenu("addBookMenuContainer");
    }
  });
  addBookButton.addEventListener("click", () => {
    openPopUpMenu("addBookMenuContainer");
  });
  submitFormButton.addEventListener("mousedown", () => {
    submitForm();
  });
  checkbox.addEventListener("click", (e) => {
    const trueCheckbox = document.querySelector("#trueCheckboxForm");
    toggleCheckbox(e);
    trueCheckbox.checked = !trueCheckbox.checked;
  });
}

init();
