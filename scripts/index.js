// getting dom for getting data from firestore
const guideList = document.querySelector('.guides');

//setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      console.log(guide);
      const li = `
     <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      </li>
    `;
      html += li
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align"> Login or Singup to see guides </h5>';
  }
}

// setting ui nav link based on auth status
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetail = document.querySelector('.account-details');

const setupNavUi = (user) => {
  if (user) {
    // account info
    const html = `
        <div>Logged in as : ${user.email} </div>
    `;
    accountDetail.innerHTML = html;
    // toggle loggedin ui element
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // hide acc info
    accountDetail.innerHTML = '';
    // toggle logged out ui element
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}





// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});