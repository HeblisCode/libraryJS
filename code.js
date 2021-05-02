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

function displayBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "read");
  label.setAttribute("for", "read");
  label.innerText = "Read";

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

  label.appendChild(checkbox);
  bookContainer.appendChild(label);

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

const button = document.querySelector("#test");
button.addEventListener("click", () => {
  addBookToShelf("vanaana", "authfadgor", "pgsgfages", false);
  displayAllBooks();
});
