<h1>This is a Basic REST API with Authentication with mail sending for account verification.</h1>

<h2>Routes</h2>
      Register
      Login
      CurrentUser

<h2>TECH Stack</h2>

      Node
      Express
      MongoDB

<h2>Techniques</h2>

      Joi Validation
      Password Hashing
      Email sending with nodemailer SMTP for user email verification.
      JWT Authentication & Authorization


<h2>USAGE</h2>
    Pull from GitHub<br/>
    run npm install from root directory<br/>
    create .env file with the following keys<br/> 

    API_PORT=3003<br/>
    SECRET_KEY=<br/>
    SEND_GRID_KEY=<br/>
    APP_URL=http://localhost:3003/api<br/>
    DB_URI="Your mongodb connection string"<br/>
    SMTP_HOST=smtp.gmail.com<br/>
    SMTP_PORT=465<br/>
    SMTP_USERNAME=<br/>
    SMTP_PASSWORD=<br/>

    provide the values.

<h2>Test Routes</h2>

APP_URL/user/register<br/>

    email -- valid email address .com & .net domains only, required
    username -- alphanumeric, minimun of 4 chars maximum of 30 chars, required
    password -- alphanumeric, minimum of 6 chars, required
    repeat_password

Account Verification - make a GET request to the link contained in the email received upon successful registration.<br/>


APP_URL/user/login only if account has been verified - GETS back a token and sets header "auth-token"<br/>

    email
    password

APP_URL/user/current<br/>

    Gets the current USER. Make a GET request and set Header "auth-token" with value of token gotten from login.


#TO-DO
Add Photo Upload using Multer<br/>
Add Profile Info for User<br/>

