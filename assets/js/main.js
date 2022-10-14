// TODO: DOM READY

document.addEventListener("DOMContentLoaded", function () {
  const submitAdd = document.getElementById("addbook");
  submitAdd.addEventListener("submit", function (event) {
    event.preventDefault();
    addbooklist();
  });
  const searchSubmit = document.getElementById("searchbook");
  searchSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    searchbooklist();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});