from config import db, app
from models.models import User
from flask import request, jsonify, make_response, session
from sqlalchemy.exc import IntegrityError

@app.route("/api/check_current_user")
def check_current_user():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({}), 204

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    try:
        user = User(username=username)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return make_response(jsonify(user.to_dict())), 201
    except IntegrityError as error:
        if "UNIQUE" in str(error):
            return jsonify({ "error": "Username must be unique" }), 422
        else:
            return jsonify({ "error": "Username must exist" }), 422
    except ValueError as error:
        return jsonify({ "error": str(error) }), 422
    
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get_json('username')
    password = data.get_json('password')
    user = User.query.filter_by(username=username).first()
    if user and user.authenticate(password):
        session['user_id'] = user.id
        return make_response(jsonify(user.to_dict())), 200
    else:
        return jsonify({ "error": "username or password did not match" }), 422
    
@app.route("/api/logout", methods=["DELETE"])
def logout():
    session.clear()
    return jsonify({}), 204