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

  for (let keys in book) {
    const paragraph = document.createElement("p");
    paragraph.innerText = keys;
    bookContainer.appendChild(paragraph);
  }

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
  addBookToShelf("title", "author", "pages");
  displayAllBooks();
});
