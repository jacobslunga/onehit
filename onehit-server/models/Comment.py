from db import db
from models.User import User

# Comment Likes Table
comment_likes = db.Table(
    "comment_likes",
    db.Column("user_id", db.String(36), db.ForeignKey("user.id"), primary_key=True),
    db.Column("comment_id", db.Integer, db.ForeignKey("comment.id"), primary_key=True),
)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"), nullable=False)
    hit_id = db.Column(db.Integer, db.ForeignKey("hit.id"), nullable=False)

    likes = db.relationship(
        "User",
        secondary=comment_likes,
        primaryjoin=(comment_likes.c.comment_id == id),
        secondaryjoin=(comment_likes.c.user_id == id),
        backref=db.backref("comment_likes", lazy="dynamic"),
        lazy="dynamic",
    )

    def __repr__(self):
        return f"<Comment {self.id}>"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to save comment: {e}")
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"Failed to delete comment: {e}")
            return False

    def json(self):
        author = User.query.filter_by(id=self.user_id).first()

        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "hit_id": self.hit_id,
            "author": author.json() if author else "User not found",
            "likes": {
                "count": self.likes.count(),
                "users": [user.json() for user in self.likes],
            },
        }
