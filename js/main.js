// Declaring variables which are later attached to listeners
const form = document.getElementById('bookmarkForm');
const inputName = document.getElementById('siteName');
const inputUrl = document.getElementById('siteUrl');

function fetchBookmarks() {
  // Fetch bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output ID
  const bookmarksResults = document.getElementById('bookmarksResults');

  // Build output to the page
  bookmarksResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; ++i) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      `<div class="well">
        <h3>${name}
          <a 
            class="btn btn-green"
            target="_blank"
            href="${url}">
            Visit
          </a>
          <a 
            onclick="deleteBookmark('${url}')"
            class="btn btn-red"
            href="#">
            Delete
          </a>
        </h3>
      </div>`;
  }
}

// Validate form
function validateForm(siteName, siteUrl) {
  // If either siteName or siteUrl is empty
  if (!siteName || !siteUrl) {
    // Alert user
    alert('Please fill in the form');
    return false;
  }

  // Email validation
  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  // If site's url does not match email validation
  if (!siteUrl.match(regex)) {
    // Alert user
    alert('Please use a valid URL, e.g. https://google.com');
    return false;
  }
  // If all conditions are met, return true and exit the function
  return true;
}

// Save Bookmarks
function saveBookmark(e) {
  // Form values
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  // If bookmark object is null in Local Storage
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize the array
    const bookmarks = [];
    // Add bookmarks to array
    bookmarks.push(bookmark);
    // Set new array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Fetch bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form after submitting
  document.getElementById('bookmarkForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from default submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Fetch bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (let i = 0; i < bookmarks.length; ++i) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Updating text labels
function updateText() {
  // Small timer for labels
  setTimeout(() => {
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    if (siteName || siteUrl != '') {
      this.parentElement.classList.add('form-group-float');
    } else {
      this.parentElement.classList.remove('form-group-float');
    }
  }, 1);
}

// Event Listeners
form.addEventListener('submit', saveBookmark);
inputName.addEventListener('change', updateText);
inputUrl.addEventListener('change', updateText);
inputName.addEventListener('keydown', updateText);
inputUrl.addEventListener('keydown', updateText);

// Fetching current bookmarks list on page load
window.onload = fetchBookmarks;
