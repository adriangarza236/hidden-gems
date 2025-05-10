from flask import request, jsonify 
from config import app, db 
from models.models import Tag

@app.route("/api/tags", methods=["GET"])
def tags_route():
    tags = [tags.to_dict() for tag in Tag.query.all()]
    return jsonify(tags), 200