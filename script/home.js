let nameInput = document.getElementById('siteName');
let urlInput = document.getElementById('siteURL');
let addButton = document.getElementById('addBTN');
let tableBody = document.getElementById('tableBody');
let searchButton = document.getElementById('searchBTN');
let warnningMSG = document.getElementById('warnning');

var mainIndex = 0;
if(localStorage.getItem('bookMarkValue')==null){
    bookMarkList=[];
}else{
    bookMarkList = JSON.parse(localStorage.getItem('bookMarkValue'))
    displayBookMark(bookMarkList)
}
var counter = bookMarkList.length;
var bookMarkList = JSON.parse(localStorage.getItem('bookMarkValue')) || [];

addButton.onclick = function(e){
    e.preventDefault();
    if(addButton.innerHTML == "Update"){
        addButton.innerHTML = "add bookMark";
        let bookMark = {
            name : nameInput.value,
            urlPage : urlInput.value
        }
        bookMarkList.splice(mainIndex , 1 , bookMark)
    } else{
        let bookMark = {
            name : nameInput.value,
            urlPage : urlInput.value
        }
        bookMarkList.push(bookMark);
        counter = bookMarkList.length;
    }
    clrarInput();
    localStorage.setItem("bookMarkValue" , JSON.stringify(bookMarkList));
    updateCounter();
    displayBookMark(bookMarkList)
    console.log(bookMarkList)
}

// ------------------------------clear inputs
function clrarInput(){
    let bookMark ={
       name: nameInput.value='',
       urlPage:urlInput.value=''
    }
}
// ------------------------------display inputs

function displayBookMark(anyArray) {
    var tableBody = document.getElementById('tableBody');
    // Clear existing rows
    tableBody.innerHTML = '';

    // Determine the starting index for the loop
    var startIndex = Math.max(0, bookMarkList.length - 5);
    console.log(startIndex)
    for (let i = startIndex; i < anyArray.length; i++) {
        var rowData = anyArray[i];

        var row = document.createElement('tr');

        var nameCell = document.createElement('td');
        nameCell.textContent = rowData.name;

        var linkCell = document.createElement('td');
        var linkElement = document.createElement('a');
        linkElement.href = rowData.urlPage;
        // linkElement.textContent = 'Visit';

        var visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.classList.add('visitSite') // Add class for styling
        linkElement.appendChild(visitButton);
        linkCell.appendChild(linkElement);

        var updateCell = document.createElement('td');
        var updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('updateSite') // Add class for styling
        updateButton.addEventListener('click', function() {
            updateBookMark(i);
        });
        
        updateCell.appendChild(updateButton);

        var deleteCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteSite') // Add class for styling
        deleteButton.addEventListener('click', function() {
            // Remove the corresponding row and update local storage
            bookMarkList.splice(i, 1);
            localStorage.setItem('bookMarkValue', JSON.stringify(bookMarkList));
            displayBookMark(bookMarkList);
             updateCounter();
            counter--; // Decrement the counter when deleting a row
           
        });
        deleteCell.appendChild(deleteButton);
        
        row.appendChild(nameCell);
        row.appendChild(linkCell);
        row.appendChild(updateCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    }
    updateCounter()
}
displayBookMark(bookMarkList) 

// ------------------------------------update 
function updateBookMark(index) {
    nameInput.value = bookMarkList[index].name;
    urlInput.value = bookMarkList[index].urlPage;
    addButton.innerHTML = "Update";
    mainIndex = index;
}

// -------------------------------------counter
function updateCounter() {
    if (!isNaN(counter)) {
        document.getElementById('siteCounter').textContent = 'bookMark count: ' + counter;
        localStorage.setItem('counter', counter.toString());
    }
}

// -------------------------------------search
searchButton.onkeyup=function(){
    searchBookMark(this.value)
}
function searchBookMark(item) {
    var wantedBook = [];
    var found = false;
    for (var i = 0; i < bookMarkList.length; i++) {
        if (bookMarkList[i].name.toLowerCase().includes(item)) {
            wantedBook.push(bookMarkList[i]);
            found = true;
        }
    }
    if (found) {
        displayBookMark(wantedBook);
        // Reset display after 3 seconds
        setTimeout(function () {
            resetDisplay();
        }, 3000);
    } else {
        warnningMSG.classList.replace("d-none", "d-block");
        displayBookMark([]); // Hide the displayed data
        // Reset display after 3 seconds
        setTimeout(function () {
            resetDisplay();
           
        }, 4000);
    }
}

//--------------------------------------reset
function resetDisplay() {
    warnningMSG.classList.replace("d-block", "d-none");
}
