//BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI CONSTRUCTOR

function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class="delete">X</a></td>`;

  list.appendChild(row);
};

// Show Alert

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("title").value = "";
  document.getElementById("title").value = "";
};

//EVENT LISTENERS FOR ADDING BOOKS
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //INSTANTIATE A BOOK FROM THE CONSTRUCTOR ABOVE
  const book = new Book(title, author, isbn);

  //INSTANTIATE A UI OBJECT
  const ui = new UI();

  // VALIDATE IF A BOOK IS ENTERED

  if (title === "" || author === "" || isbn === "") {
    //ERROR ALERT
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book added!", "success");
    ui.clearFields();
  }

  e.preventDefault();
});

//EVENT LISTENER FOR DELETING BOOKS
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book removed", "success");
  e.preventDefault();
});
