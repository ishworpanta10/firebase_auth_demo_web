


// listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) {
        console.log('user login:', user);
        // get data from firebase
        db.collection('guides').get().then(snapshot => {
            // console.log(snapshot.docs);
            setupGuides(snapshot.docs);
            setupNavUi(user);
        });
    } else {
        console.log('user logged out');
        setupNavUi();
        setupGuides([]);
    }
});

// create new guide in firestore
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = createForm['title'].value;
    const content = createForm['content'].value;
    db.collection('guides').add({
        title: title,
        content: content,
    }).then(() => {
        // close the create modal and reset the create form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        console.log(err.message);
    })
});



// Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    // default behavuor is reloading so
    e.preventDefault();
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //signed up user
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logOut = document.querySelector('#logout');
logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("user logged out");
    })
});

// login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['login-email'].value;
    const password = signupForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        // close the login modal and reset the login form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});



