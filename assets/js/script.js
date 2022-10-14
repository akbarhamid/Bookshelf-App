
const FINISHED_BOOK = "finishedbooklist";
const UNREAD_BOOK = "unreadbooklist";
const IDITEM_BOOK = "iditembook";

// TODO: ADD BOOK LIST

function addbooklist() {
  const unreadbook = document.getElementById(
    UNREAD_BOOK
  );
  const finishedbook = document.getElementById(
    FINISHED_BOOK
  );
  const titlebook = document.getElementById("inputtitlebook").value;
  const authorbook = document.getElementById("inputauthorbook").value;
  const yearbook = document.getElementById("inputyearbook").value;
  let listChecked = document.getElementById("inputbookstatus").checked;
  if (listChecked) {
    const bookList = createbooklist(
      titlebook,
      authorbook,
      yearbook,
      listChecked
    );
    const bookObject = composebookobject(
      titlebook,
      authorbook,
      yearbook,
      listChecked
    );
    bookList[IDITEM_BOOK] = bookObject.id;
    books.push(bookObject);
    finishedbook.append(bookList);
  } else {
    const bookList = createbooklist(titlebook, authorbook, yearbook, false);
    const bookObject = composebookobject(
      titlebook,
      authorbook,
      yearbook,
      false
    );
    bookList[IDITEM_BOOK] = bookObject.id;
    books.push(bookObject);
    unreadbook.append(bookList);
  }
  updateDataStorage();
  setBackDefault();
}

// TODO: BOOK ITEM LIST

function createbooklist(title, author, year, isCompleted) {
  const booktitle = document.createElement("h3");
  booktitle.innerText = title;
  const bookauthor = document.createElement("p");
  bookauthor.innerHTML = `Author: <span id="author"> ` + author + `</span>`;
  const bookyear = document.createElement("p");
  bookyear.innerHTML = `Year: <span id="year">` + year + `</span>`;
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-list");
  if (isCompleted) {
    buttonContainer.append(
      createundobutton(),
      createeditbutton(),
      createdeletebutton()
    );
  } else {
    buttonContainer.append(
      createdonebutton(),
      createeditbutton(),
      createdeletebutton()
    );
  }
  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book-item");
  bookContainer.append(booktitle, bookauthor, bookyear, buttonContainer);
  return bookContainer;
}

function addbookitemlist(bookshelfElement) {
  const bookshelfCompleted = document.getElementById(FINISHED_BOOK);
  const listbooktitle = bookshelfElement.querySelector(".book-item > h3").innerText;
  const listbookauthor = bookshelfElement.querySelector("span#author").innerText;
  const listbookyear = bookshelfElement.querySelector("span#year").innerText;
  const newbooklist = createbooklist(
    listbooktitle,
    listbookauthor,
    listbookyear,
    true
  );
  const bookList = findbook(bookshelfElement[IDITEM_BOOK]);
  bookList.isCompleted = true;
  newbooklist[IDITEM_BOOK] = bookList.id;
  bookshelfCompleted.append(newbooklist);
  bookshelfElement.remove();
  updateDataStorage();
}

function deletebookitemlist(bookshelfElement) {
  const bookPosition = findbookindex(bookshelfElement[IDITEM_BOOK]);
  books.splice(bookPosition, 1);
  bookshelfElement.remove();
  updateDataStorage();
}

function undobookitemlist(bookshelfElement) {
  const listunread = document.getElementById(UNREAD_BOOK);
  const listbooktitle = bookshelfElement.querySelector(".book-item > h3").innerText;
  const listbookauthor = bookshelfElement.querySelector("span#author").innerText;
  const listbookyear = bookshelfElement.querySelector("span#year").innerText;
  const newbooklist = createbooklist(
    listbooktitle,
    listbookauthor,
    listbookyear,
    false
  );
  const bookList = findbook(bookshelfElement[IDITEM_BOOK]);
  bookList.isCompleted = false;
  newbooklist[IDITEM_BOOK] = bookList.id;
  listunread.append(newbooklist);
  bookshelfElement.remove();
  updateDataStorage();
}

// TODO: EDIT BOOK ITEM

function editBook(bookshelfElement) {
  document.getElementById("submitbook").style.display = "none";
  const editBtn = document.getElementById("editbook");
  editBtn.style.display = "block";
  document.getElementById("inputtitlebook").value = bookshelfElement.querySelector(".book-item > h3").innerText;
  document.getElementById("inputauthorbook").value = bookshelfElement.querySelector("span#author").innerText;
  document.getElementById("inputyearbook").value = bookshelfElement.querySelector("span#year").innerText;
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addeditedbook(bookshelfElement);
  });
}

function addeditedbook(bookshelfElement) {
  bookshelfElement.remove();
  deletebookitemlist(bookshelfElement);
  const unreadbook = document.getElementById(
    UNREAD_BOOK
  );
  const finishedbook = document.getElementById(
    FINISHED_BOOK
  );
  const titlebook = document.getElementById("inputtitlebook").value;
  const authorbook = document.getElementById("inputauthorbook").value;
  const yearbook = document.getElementById("inputyearbook").value;
  const listChecked = document.getElementById("inputbookstatus");
  if (listChecked.checked) {
    const bookList = createbooklist(
      titlebook,
      authorbook,
      yearbook,
      listChecked
    );
    const bookObject = composebookobject(
      titlebook,
      authorbook,
      yearbook,
      listChecked
    );
    bookList[IDITEM_BOOK] = bookObject.id;
    books.push(bookObject);
    finishedbook.append(bookList);
  } else {
    const bookList = createbooklist(titlebook, authorbook, yearbook, false);
    const bookObject = composebookobject(
      titlebook,
      authorbook,
      yearbook,
      false
    );
    bookList[IDITEM_BOOK] = bookObject.id;
    books.push(bookObject);
    unreadbook.append(bookList);
  }
  updateDataStorage();
  setBackDefault();
  buttonreturn();
}

// TODO: CREATE BUTTON

function createbutton(buttonTypeClass, buttonTypeName, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerHTML = buttonTypeName;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createdonebutton() {
  return createbutton("button-green", "Finished", function (event) {
    addbookitemlist(event.target.parentElement.parentElement);
  });
}

function createdeletebutton() {
  return createbutton("button-red", "Delete", function (event) {
    deletebookitemlist(event.target.parentElement.parentElement);
  });
}

function createundobutton() {
  return createbutton("button-yellow", "Unread", function (event) {
    undobookitemlist(event.target.parentElement.parentElement);
  });
}

function createeditbutton() {
  return createbutton("button-orange", "Edit", function (e) {
    editBook(e.target.parentElement.parentElement);
  });
}

function buttonreturn() {
  document.getElementById("submitbook").style.display = "block";
  document.getElementById("editbook").style.display = "none";
}

// TODO: SEARCH

function searchbooklist() {
  let value = document.getElementById("searchbooktitle").value.toUpperCase();
  let books = document.getElementsByClassName("book-item");
  for (let i = 0; i < books.length; i++) {
    let book = books[i].getElementsByTagName("h3");
    if (book[0].innerHTML.toUpperCase().indexOf(value) > -1) {
      books[i].style.display = "";
    } else {
      books[i].style.display = "none";
    }
  }
}

// TODO: CLEAR FIELD
function setBackDefault() {
  document.getElementById("inputtitlebook").value = "";
  document.getElementById("inputauthorbook").value = "";
  document.getElementById("inputyearbook").value = "";
  document.getElementById("inputbookstatus").checked = false;
}