from flask import request, jsonify
from config import app, db
from models.models import Comment


@app.route("/api/comments", methods=["GET", "POST"])
def comments_route():
    if request.method == "GET":
        comments = [comment.to_dict() for comment in Comment.query.all()]
        return jsonify(comments), 200
    elif request.method == "POST":
        data = request.get_json()
        text = data.get('text')
        comment = Comment(text=text)
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    
@app.route("/api/comments/<int:id>", methods=["GET", "PATCH", "DELETE"])
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
    elif request.mehod == "DELETE":
        db.session.delete(comment)
        db.session.commit()
        return jsonify({}), 204