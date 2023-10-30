import uuid

from db import db
from models.User import User


# Hit Likes Table
hit_likes = db.Table(
    "hit_likes",
    db.Column("user_id", db.String(36), db.ForeignKey("user.id"), primary_key=True),
    db.Column("hit_id", db.String(36), db.ForeignKey("hit.id"), primary_key=True),
)


class Hit(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    artist_id = db.Column(db.String(80), nullable=False)
    track_id = db.Column(db.String(80), nullable=False)
    track_uri = db.Column(db.String(80), nullable=False)
    cover_image = db.Column(db.String(80), nullable=False)
    artist_image = db.Column(db.String(80), nullable=False)
    danceability = db.Column(db.Float, nullable=False)
    energy = db.Column(db.Float, nullable=False)
    key = db.Column(db.Integer, nullable=False)
    loudness = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"), nullable=False)
    likes = db.relationship(
        "User",
        secondary=hit_likes,
        primaryjoin=(hit_likes.c.hit_id == id),
        secondaryjoin=(hit_likes.c.user_id == id),
        backref=db.backref("liked_hits", lazy="dynamic"),
        lazy="dynamic",
    )

    def __repr__(self):
        return f"<Hit {self.title}>"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to save hit: {e}")
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to delete hit: {e}")
            return False

    def json(self):
        user = db.session.query(User).filter_by(id=self.user_id).first()

        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "artist_id": self.artist_id,
            "track_id": self.track_id,
            "track_uri": self.track_uri,
            "cover_image": self.cover_image,
            "artist_image": self.artist_image,
            "danceability": self.danceability,
            "energy": self.energy,
            "key": self.key,
            "loudness": self.loudness,
            "user_id": self.user_id,
            "user": user.json(),
        }
