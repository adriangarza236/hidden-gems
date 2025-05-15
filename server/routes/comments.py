from flask import request, jsonify
from config import app, db
from models.models import Comment
from .helpers import *


@app.route("/api/comments", methods=["GET", "POST"])
def comments_route():
    if request.method == "GET":
        comments = [comment.to_dict() for comment in Comment.query.all()]
        return jsonify(comments), 200
    elif request.method == "POST":
        if is_logged_in():
            data = request.get_json()
            text = data.get('text')
            gem_id = data.get('gem_id')
            user_id = current_user().id
            comment = Comment(text=text, gem_id=gem_id, user_id=user_id)
            db.session.add(comment)
            db.session.commit()
            return jsonify(comment.to_dict()), 201
        else:
            return { "error": "Access Denied" }, 401
    
@app.route("/api/comment/<int:id>", methods=["GET", "PATCH", "DELETE"], endpoint="comment")
def comment_route(id):
    comment = Comment.query.get(id)
    if request.method == "GET":
        return jsonify(comment.to_dict()), 200
    elif request.method == "PATCH":
        data = request.get_json()
        for key in data.keys():
            if hasattr(comment, key):
                setattr(comment, key, data[key])
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    elif request.method == "DELETE":
        db.session.delete(comment)
        db.session.commit()
        return jsonify({}), 204