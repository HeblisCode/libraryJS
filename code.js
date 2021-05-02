let shelf = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeReadStatus = function (bool) {
  this.read = bool;
};

//ADD BOOKS******************************************************************************************************************************
function addBookToShelf(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  shelf.push(book);
}
function removeBookFromShelf(title) {
  for (let i = 0; i < shelf.length; i++) {
    if (shelf[i].title === title) shelf.splice(i, 1);
  }
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
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.innerText = "DELETE";
  return deleteButton;
}
function addEventListenerToBook(book) {
  const bookContainer = document.querySelector(`#${book.title}`);
  console.log(bookContainer);
  const deleteButton = bookContainer.querySelector(".deleteButton");
  const checkbox = bookContainer.querySelector("label > input");

  deleteButton.addEventListener("click", () => {
    const bookContainer = document.querySelector(`#${book.title}`);
    bookContainer.remove();
    removeBookFromShelf(book.title);
  });

  checkbox.addEventListener("change", () => {
    book.changeReadStatus(checkbox.checked);
  });
}

//DISPLAY BOOK************************************************************************************************
function displayBook(book) {
  const shelfContainer = document.querySelector("#shelf");
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  bookContainer.id = book.title;

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
  const shelfContainer = document.querySelector("#shelf");
  shelfContainer.innerHTML = "";
  shelf.forEach((book) => {
    displayBook(book);
  });
}

//NEW BOOK FORM*******************************************************************************************************
function openForm() {
  const formContainer = document.querySelector("#addBookMenuContainer");
  formContainer.style.display = "block";
}
function closeForm() {
  const formContainer = document.querySelector("#addBookMenuContainer");
  formContainer.style.display = "none";
}
function submitForm() {
  const bookInfo = document.querySelectorAll("form > input");
  addBookToShelf(
    bookInfo[0].value,
    bookInfo[1].value,
    bookInfo[2].value,
    bookInfo[3].checked
  );
  displayAllBooks();
  closeForm();
}

const button = document.querySelector("#test");
button.addEventListener("click", () => {
  openForm();
});

const submit = document.querySelector("#submitForm");
submit.addEventListener("click", (e) => {
  submitForm();
});
