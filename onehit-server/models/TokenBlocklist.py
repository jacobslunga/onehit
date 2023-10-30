from db import db


# Token Blocklist model
class TokenBlockList(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
