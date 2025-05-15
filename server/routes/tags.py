from flask import request, jsonify 
from config import app, db 
from models.models import Tag

@app.route("/api/tags", methods=["GET"], endpoint="tags")
def tags_route():
    tags = [tag.to_dict() for tag in Tag.query.all()]
    return jsonify(tags), 200

@app.route("/api/tag/<int:id>", methods=["GET"], endpoint="tag")
def tag_route(id):
    tag = Tag.query.get(id)
    return jsonify(tag.to_dict()), 200