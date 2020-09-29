// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const admin_email = adminForm['admin-email'].value;
    const admin_email = document.querySelector("#admin-email").value;
    const addAdminRole = functions.httpsCallable('addAdminRole'); //function name used in cloud function export.fn_name
    addAdminRole({ email: admin_email }).then(result => {
        // console.log(result);
    });
})


// listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) {
        // console.log('user login:', user);
        // get data from firebase
        user.getIdTokenResult().then(idTokenResult => {
            // console.log(`Admin :  ${idTokenResult.claims.admin}`);
            user.admin = idTokenResult.claims.admin
            setupNavUi(user);
        })
        db.collection('guides').onSnapshot(snapshot => {
            // console.log(snapshot.docs);
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message);
        });
    } else {
        // console.log('user logged out');
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
    }).catch(err => {
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
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
        });
    }).then(() => {
        // console.log(cred);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';

    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
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
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        // close the login modal and reset the login form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';

    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;

    })
});



