"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/register", methods=["POST"])
def register():
    try:

        data = request.json

        if not data["email"] or not data["password"]:
            raise Exception({"error":  "missing data"})
        stm = select(User).where(
            User.email == data["email"])
        existing_user = db.session.execute(stm).scalar()
        if existing_user:
            raise Exception({"error":  "email, taken, try logging in"})


        hashed_password = generate_password_hash(data["password"])

       
        
        new_user = User(
            email=data["email"],
            password=hashed_password,
            is_active=True
        )
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=str(new_user.id))
        return jsonify({"msj": "register OK", "token": token}), 201

    except Exception as e:
       
        db.session.rollback()
        return jsonify({"error": "something went wrong"}), 400


@api.route("/login", methods=["POST"])
def login():
    try:

        data = request.json

        if not data["email"] or not data["password"]:
            raise Exception({"error":  "missing data"})
        stm = select(User).where(
            User.email == data["email"])
        user = db.session.execute(stm).scalar()
        if not user:
            raise Exception({"error":  "email not found"})

        if not check_password_hash(user.password, data["password"]):
            return jsonify({"success": False, "msg": "email/password incorrectos"}), 418

        token = create_access_token(identity=str(user.id))
        return jsonify({"msj": "login ok", "token": token}), 200

    except Exception as e:
       
        db.session.rollback()
        return jsonify({"error": "something went wrong"}), 400


@api.route("/private", methods=["GET"])
@jwt_required()
def get_user_inf():
    try:
        user_id = get_jwt_identity()
        user = db.session.get(User, user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user": user.serialize()
        }), 200

    except Exception as e:
      
        return jsonify({"error": "Something went wrong"}), 500
