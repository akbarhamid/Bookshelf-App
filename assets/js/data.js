const STORAGE_KEY = "Bookshelf-App";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function savedata() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) books = data;

}

function updateDataStorage() {
  if (isStorageExist()) {
    savedata();
  }
}

function composebookobject(titlebook, authorbook, yearbook, isCompleted) {
  return {
    id: +new Date(),
    titlebook,
    authorbook,
    yearbook,
    isCompleted,
  };
}

function findbook(iditembook) {
  for (book of books) {
    if (book.id === iditembook) return book;
  }
  return null;
}

function findbookindex(iditembook) {
  let index = 0;
  for (book of books) {
    if (book.id === iditembook) return index;
    index++;
  }
  return -1;
}

function refreshdatabook() {
  const listunread = document.getElementById(
    UNREAD_BOOK
  );
  const listCompleted = document.getElementById(FINISHED_BOOK);
  for (book of books) {
    const newBook = createbooklist(
      book.titlebook,
      book.authorbook,
      book.yearbook,
      book.isCompleted
    );
    newBook[IDITEM_BOOK] = book.id;
    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listunread.append(newBook);
    }
  }
}