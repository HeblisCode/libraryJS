let shelf = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToShelf(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  shelf.push(book);
  console.log(shelf);
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "read");
  label.setAttribute("for", "read");
  label.innerText = "Read";

  label.appendChild(checkbox);

  return label;
}

function displayBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  const checkboxLabel = createCheckbox();
  const checkbox = checkboxLabel.querySelector("input");

  for (let keys in book) {
    if (keys !== "read") {
      const paragraph = document.createElement("p");
      paragraph.innerText = book[keys];
      paragraph.classList.add(keys);
      bookContainer.appendChild(paragraph);
    } else {
      book[keys] ? (checkbox.checked = true) : (checkbox.checked = false);
    }
  }

  bookContainer.appendChild(checkboxLabel);
  return bookContainer;
}

function displayAllBooks() {
  const shelfContainer = document.querySelector("#shelf");
  shelfContainer.innerHTML = "";
  shelf.forEach((book) => {
    const newBook = displayBook(book);
    shelfContainer.appendChild(newBook);
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
