from flask_sqlalchemy import SQLAlchemy;

db = SQLAlchemy();

class Film(db.Model):

    __tablename__ = "movies"

    film_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(200), nullable=False, default="No title")
    year = db.Column(db.String(5), default="N/A")
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)

    def updateVotes(self, direction):
        if direction == 'up':
            current = self.likes or 0
            self.likes = current + 1
        elif direction == 'down':
            current = self.dislikes or 0
            self.dislikes = current + 1
        else:
            raise Exception('Rating must be either up or down.')

def connect_db(app):

    db.app = app
    db.init_app(app)
