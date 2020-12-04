import os

from flask import Flask, request
from model import Film, connect_db, db
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///movies_app"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False

connect_db(app)

API_URL = "https://movie-database-imdb-alternative.p.rapidapi.com"
API_HEADERS = {
  'x-rapidapi-key': os.getenv("API_KEY"),
  'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
}



@app.route('/', methods=["GET"])
def get_films_by_likes():

    films = Film.query.all()

    list_films = [{k: v for k,v in film.__dict__.items() 
        if k in ['title', 'film_id', 'likes', 'dislikes', 'year']} for film in films]
    data = {'ranking': list_films}
  
    return (data, 200)


@app.route('/movies', methods=["GET"])
def get_films():

    search_term = request.args.get('search')
    page = request.args.get('page')
    querystring = {"s": search_term, "r": "json", "type": "movie", "page": page}

    response = requests.request("GET", url=API_URL, 
                                headers=API_HEADERS, params=querystring)

    if 'Error' in response.json():
        return (response.json()['Error'], 400)

    else:
        resp = response.json()['Search']
        data = {
            'Search': [{k: v for k,v in d.items() 
                if k in ['Title','imdbID', 'Poster']} for d in resp],
            'totalResults': response.json()['totalResults']
        }

        return (data, 200)


@app.route('/movies/<id>', methods=["GET"])
def get_one_film(id):

    querystring = {"i": id, "r": "json", "type": "movie"}

    # try:
    response = requests.request("GET", url=API_URL, 
                                headers=API_HEADERS, params=querystring);

    if 'Error' in response.json():
        return (response.json()['Error'], 500)

    else:

        resp = response.json()
        data = {
            'imdbID': resp['imdbID'],
            'Title': resp['Title'],
            'Poster': resp['Poster'],
            'Director': resp['Director'],
            'Released': resp['Released'],
            'Plot': resp['Plot']
        }
    
        return (data, 200)

@app.route('/movies/<id>/vote/<direction>', methods=["POST"])
def vote_on_film(id, direction):

    title = request.json.get("title")
    year = request.json.get("year")
    if year != "None":
        length = len(str(year))
        year_only = str(year)[length - 4:]

    try:
        film = Film.query.filter_by(film_id=id).first()

        if film:
            film.updateVotes(direction)
        else:
            film = Film(film_id=id, title=title, year=year_only)
            film.updateVotes(direction)
            db.session.add(film)
        
        db.session.commit()

        data = {"likes": film.likes, "dislikes": film.dislikes}
        
        return (data, 201)

    except:
        return ({"error": ["An error occurred. Votes cannot be registered"]}, 500)
