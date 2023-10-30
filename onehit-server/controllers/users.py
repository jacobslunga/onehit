from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import User

users_bp = Blueprint("users", __name__, url_prefix="/users")


# GET /users/me
@users_bp.route("/me", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()

    if user_id is None:
        return jsonify({"msg": "Missing user_id in JWT"}), 400

    user = User.query.filter_by(id=user_id).first()

    return jsonify(user.json()), 200


# GET /users/<user_id>
@users_bp.route("/<user_id>", methods=["GET"])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.json()), 200


# PUT /users/<user_id>
@users_bp.route("/<user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()

    user.username = data["username"]
    user.display_name = data["display_name"]
    user.email = data["email"]

    user.save()

    return jsonify(user.json()), 200


# DELETE /users/<user_id>
@users_bp.route("/<user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    user.delete()

    return jsonify({"msg": "User deleted"}), 200


""" AUTHENTICATION """


# POST /users/auth/login/spotify
@users_bp.route("/auth/login/spotify", methods=["POST"])
def login_user():
    data = request.get_json()

    fields = ["username", "display_name", "email", "spotify_id"]

    for field in fields:
        if field not in data:
            return jsonify({"msg": f"Missing {field} in request body"}), 400

    user = User.query.filter_by(spotify_id=data["spotify_id"]).first()

    if user is None:
        user = User(
            username=data["username"],
            display_name=data["display_name"],
            email=data["email"],
            spotify_id=data["spotify_id"],
        )
        user.save()

    return jsonify(user.json()), 200
