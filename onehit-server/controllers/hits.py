from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models.Hit import Hit

hits_bp = Blueprint("hits", __name__, url_prefix="/hits")


# GET /hits
@hits_bp.route("", methods=["GET"])
@jwt_required()
def get_hits():
    hits = Hit.query.all()

    return jsonify([hit.json() for hit in hits]), 200


# GET /hits/<id>
@hits_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_hit(id):
    hit = Hit.query.filter_by(id=id).first()

    if not hit:
        return jsonify({"message": "Hit not found"}), 404

    return jsonify(hit.json()), 200


# POST /hits
@hits_bp.route("", methods=["POST"])
@jwt_required()
def create_hit():
    data = request.get_json()

    fields = [
        "title",
        "artist",
        "artist_id",
        "track_id",
        "track_uri",
        "cover_image",
        "artist_image",
        "danceability",
        "energy",
        "key",
        "loudness",
    ]

    for field in fields:
        if field not in data:
            return jsonify({"message": f"Missing {field} field"}), 400

    hit = Hit(
        **data,
    )

    if not hit.save():
        return jsonify({"message": "Internal server error"}), 500

    return jsonify(hit.json()), 201


# PUT /hits/<id>
@hits_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_hit(id):
    hit = Hit.query.filter_by(id=id).first()

    if not hit:
        return jsonify({"message": "Hit not found"}), 404

    data = request.get_json()

    fields = [
        "title",
        "artist",
        "artist_id",
        "track_id",
        "track_uri",
        "cover_image",
        "artist_image",
        "danceability",
        "energy",
        "key",
        "loudness",
    ]

    for field in fields:
        if field not in data:
            return jsonify({"message": f"Missing {field} field"}), 400

        setattr(hit, field, data[field])

    hit.save()

    return jsonify(hit.json()), 200


# DELETE /hits/<id>
@hits_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_hit(id):
    hit = Hit.query.filter_by(id=id).first()

    if not hit:
        return jsonify({"message": "Hit not found"}), 404

    hit.delete()

    return jsonify({"message": "Hit deleted"}), 200
