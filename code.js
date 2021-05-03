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

//CREATE BOOK HTML PARTS************************************************************************************************
function createCheckbox(checked) {
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "read");
  checked ? (checkbox.checked = true) : (checkbox.checked = false);

  label.setAttribute("for", "read");
  label.innerText = "Read";

  label.appendChild(checkbox);
  return label;
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
  console.log(bookContainer);
  const deleteButton = bookContainer.querySelector(".deleteButton");
  const checkbox = bookContainer.querySelector("label > input");

  deleteButton.addEventListener("click", () => {
    const bookContainer = document.querySelector(`#${book.id}`);
    bookContainer.remove();
    removeBookFromShelf(book.title);
  });

  checkbox.addEventListener("change", () => {
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
  const checkboxLabel = createCheckbox(book.read);
  const deleteButton = createDeleteButton(book.title);

  bookContainer.appendChild(titlePar);
  bookContainer.appendChild(authorPar);
  bookContainer.appendChild(pagesPar);
  bookContainer.appendChild(checkboxLabel);
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

//NEW BOOK FORM*******************************************************************************************************
function submitForm() {
  const bookInfo = document.querySelectorAll("form > input");
  const newBook = addBookToShelf(
    bookInfo[0].value,
    bookInfo[1].value,
    bookInfo[2].value,
    bookInfo[3].checked,
    "id" + Math.floor(Math.random() * 99999) //random id
  );
  displayBook(newBook);
  closePopUpMenu("addBookMenuContainer");
}

//INIT FUNCTION********************************************************************************************************
function init() {
  //get the books
  const shelfArray = localStorage.getItem("shelfArray");
  const sideMenuButton = document.querySelector("#sideMenuButton");
  const addBookButton = document.querySelector("#addBookButton");
  const submitFormButton = document.querySelector("#submitForm");

  if (shelfArray === null) {
    shelf = [];
  } else {
    shelf = JSON.parse(shelfArray).map((book) =>
      Object.assign(new Book(), book)
    );
  }
  displayAllBooks();

  //set event listeners
  window.addEventListener("click", (e) => {
    if (
      e.target.id === "addBookMenuContainer" ||
      e.target.id === "sideMenuContainer"
    ) {
      closePopUpMenu(e.target.id);
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopUpMenu("sideMenuContainer");
      closePopUpMenu("addBookMenuContainer");
    }
  });
  addBookButton.addEventListener("click", () => {
    openPopUpMenu("addBookMenuContainer");
    closePopUpMenu("sideMenuContainer");
  });
  submitFormButton.addEventListener("click", () => {
    submitForm();
  });
  sideMenuButton.addEventListener("click", () =>
    openPopUpMenu("sideMenuContainer")
  );
}

init();
