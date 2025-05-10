from flask import jsonify
from config import app
from models.models import User

@app.route("/api/users")
def users_route():
    users = [user.to_dict() for user in User.query.all()]
    return jsonify(users), 200