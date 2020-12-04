# FILM CTRL

FILM CTRL is a JavaScript/React/Redux application that simply lets users search for available movies and decide whether they liked them or not through voting.
This app connects to a Python/Flask backend API through Redux/Thunk and stores liked (or disliked) movies in a postgreSQL database.
FILM CTRL is designed to be responsive for both desktops and phone screens/tablets with Material-UI.
This app uses [Movie Database (IMDB Alternative)](https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative) which is a free API.

![DESKTOP](desktop_demo.gif)

![MOBILE](mobile_demo.gif)

## Setup

### BACKEND

1. `python3 -m venv venv` to create your own virtual environment.
2. `source venv/bin/activate` to fire up your virtual environment.
3. `pip install -r requirements.txt`
4. `flask run` 
5. (Optional) You can have [http://localhost:5000](http://localhost:5000) in the browser to view the returned data.

- to create the database(required):
  1. `psql`
  2. `createdb movies_app`
  3. `ipython3`
  4. `%run app.py`
  5. `db.create_all()`

### FRONTEND

1. `npm install package-lock.json`
2. `npm start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Note: this app runs in the development mode.


## Further Notes and Tasks

- FILM CTRL was bootstrapped with Create React App.
- Additional testing for each of the React components, as well as for the backend routes.
- Further improve app design in terms of persuasiveness, responsiveness, and accessibility.

## Challenges

- Learned and leveraged Material-UI to fully cover styling. 
