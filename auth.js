import passport from 'passport';
import expressSession from 'express-session';
import LocalStrategy from 'passport-local';
import { createHash } from 'crypto';
import { getUser,createUser } from './resto/model.js';

export default function (app) {
  passport.serializeUser((user, done) => {
    if (user && user.length > 0) {
      done(null, user[0].id);
    } else {
      done('Wrong username or password');
    }
  });
passport.deserializeUser(async(id, done) => {
  const users = await getUser({ id });
  if (!users || users.length === 0) {
    done('User not found');
  } else {
    done(null, users[0]);
  }
});
passport.use(
new LocalStrategy(async(username, password, done) => {
  //console.log('Attempting login with username:', username, 'and password:', password)
 // const hash = createHash('md5').update(password).digest('hex');
const user = await getUser({username,password});
console.log('User found:');
if(!user){
  console.log('User not found');
  done(null,false);
}else{
  console.log('User authenticated');
  done(null,user);
}
}),
);
app.use(
expressSession({
secret: 'top secret',
resave: false,
saveUninitialized: false,
}),
);
app.use(passport.initialize());
app.use(passport.session());
app.post('/login', passport.authenticate('local', { failureRedirect: 'gym/login.html' }), (req, res) => {
  // Handle successful login
  res.redirect('/');
});

  app.post('/createaccount', async (req, res) => {
    const formType = req.body.formType;

    if (formType === 'createAccount') {
        // Handle create account request
        const newUsername = req.body.newUsername;
        const newPassword = req.body.newPassword;

        // Perform validation on newUsername and newPassword if needed

        // Hash the password before storing it in the database
        //const hashedPassword = hashPassword(newPassword);

        // Create a new user in the database
        await createUser({ username: newUsername, password: newPassword });

        // Redirect to the login page
        res.redirect('/login.html');
    } else {
        // Handle other types of requests (if any)
    }
});

  app.get('/logout', (request, response) => {
    request.logout((err) => {
      if(err){
        console.error(err)
      }
      response.redirect('/');
    });
    });
  }