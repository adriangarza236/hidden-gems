from flask import request, jsonify
from config import app, db
from models.models import GemTag


@app.route("/api/gem_tags", methods=["GET", "POST"], endpoint="gem_tags")
def gem_tags_route():
    if request.method == "GET":
        gem_tags = [gem_tag.to_dict() for gem_tag in GemTag.query.all()]
        return jsonify(gem_tags), 200
    elif request.method == "POST":
        data = request.get_json()
        gem_id = data.get('gem_id')
        tag_id = data.get('tag_id')
        gem_tag = GemTag(gem_id=gem_id, tag_id=tag_id)
        db.session.add(gem_tag)
        db.session.commit()
        return jsonify(gem_tag.to_dict(only=('gem_id', 'tag_id'))), 201
    
@app.route("/api/gem_tag/<int:id>", methods=["DELETE"], endpoint="gem_tag")
def gem_tag_route(id):
    gem_tag = GemTag.query.get(id)
    db.session.delete(gem_tag)
    db.session.commit()
    return jsonify({}), 204