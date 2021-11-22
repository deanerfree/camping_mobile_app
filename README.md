# camping_mobile_app
<h1>Camping Mobile App</h1>
<div>
  <p>This is a mobile app built using React Native focused initially on iOS</p>
  <p>Frontend utilizes tools such as:</p>
  <ol>
    <li>react-snap-carousel</li>
    <li>React Native Maps</li>
    <li>Axios</li>
  </ol>
  <p>API is built using Node.js that is communicating with the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">NPS data API</a></p>
  
<div>
  <h3>To get started</h3>
  <h4>Frontend</h4>
<ol>
  <li>In a folder of your liking git clone <a href='https://github.com/deanerfree/camping_mobile_app'>https://github.com/deanerfree/camping_mobile_app</a></li>
  <li>from console, terminal or command prompt open the folder where the project was cloned and type cd frontend</li>
  <li>type expo install to install proper libraries</li>
  <li>type expo start to start React app in localhost <strong>**run on iOS platform** and download <a href="https://expo.dev/client">Expo Go</a> to test on your iOS mobile</strong></li>
</ol>
  <h4>Backend</h4>
<ol>
  <li>From your folder where you cloned the project type cd backend <a href='https://github.com/deanerfree/camping_mobile_app'>https://github.com/deanerfree/camping_mobile_app</a></li>
  <li>Activate backend virtual environment : source venv/bin/activate</li>
  <li>Install packages: pip3 install -r requirements.txt</li>
  <li>Run the server: uvicorn server.app:app --reload</li>
  <li>Enjoy!</li>
</ol>
  <h3>Features</h3>
  <ol>
    <li>This is a multistep form</li>
    <li>This was styled using Material UI</li>
    <li>Items in the form are validated using Formik and Yup</li>
    <li>Email format is validated using regex</li>
    <li>The request is sent to a FastAPI server then stored in a mongoDB</li>
    <li>Server creates a timestamp when entered and updated</li>
    <li>The users email is the most unique entry so if the email already exists you will be redirected to a new page detailing the error</li>
    <li>If the request to create a new entry is successful you will be redirected to a success page</li>
    <li>Successfull server response lets you know when the entry was made and who made it</li>
    <li>Server is setup for CRUD with the ability to get, get by id, edit, and delete additionally to creating a profile</li>
  </ol>
  </div>
</div>
<div>
  <h3>Future Items</h3>
  <ol>
    <li>Add full CRUD functionality of the app connecting the frontend and backend to allow for get, put, and delete</li>
    <li>Design elements could be improved</li>
    <li>Add authentication and some sort of dashboard</li>
  </ol>
  </div>
</div>
