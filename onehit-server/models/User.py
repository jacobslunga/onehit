import uuid

from db import db

# User Follows Table
user_follows = db.Table(
    "user_follows",
    db.Column("follower_id", db.String(36), db.ForeignKey("user.id"), primary_key=True),
    db.Column("followed_id", db.String(36), db.ForeignKey("user.id"), primary_key=True),
)


class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(80), unique=True, nullable=False)
    display_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    spotify_id = db.Column(db.String(80), unique=True, nullable=False)
    spotify_url = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String(80), nullable=True)

    hits = db.relationship("Hit", backref="user", lazy=True)
    followers = db.relationship(
        "User",
        secondary=user_follows,
        primaryjoin=(user_follows.c.follower_id == id),
        secondaryjoin=(user_follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic",
    )

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to save user: {e}")
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to delete user: {e}")
            return False

    def json(self):
        hits = [hit.json() for hit in self.hits]
        followers = [follower.json() for follower in self.followers]
        following = [follow.json() for follow in self.following]

        return {
            "id": self.id,
            "username": self.username,
            "display_name": self.display_name,
            "email": self.email,
            "spotify_id": self.spotify_id,
            "spotify_url": self.spotify_url,
            "image_url": self.image_url,
            "hits": hits,
            "followers": followers,
            "following": following,
        }
