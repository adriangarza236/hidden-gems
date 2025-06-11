from flask import request, jsonify 
from config import app, db
from models.models import Gem
from models.models import Tag
from .helpers import *


@app.route("/api/gems", methods=["GET", "POST"])
def gems_route():
    if request.method == "GET":
        gems = [gem.to_dict() for gem in Gem.query.all()]
        return jsonify(gems), 200
    elif request.method == "POST":
        if is_logged_in():
            data = request.get_json()
            title = data.get('title')
            description = data.get('description')
            address = data.get('address')
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            image_url = data.get('image_url')
            tag_ids = data.get('tag_ids', [])
            gem = Gem(title=title, description=description, address=address, latitude=latitude, longitude=longitude, image_url=image_url, user_id=current_user().id)
            db.session.add(gem)
            db.session.commit()

            if tag_ids:
                tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
                gem.tags.extend(tags)
                db.session.commit()

            return jsonify(gem.to_dict()), 201
        else: 
            return { "error": "Access Denied" }, 401

@app.route("/api/gem/<int:id>", methods=["GET", "PATCH", "DELETE"], endpoint="gem")
def gem_route(id):
    gem = Gem.query.get(id)
    if request.method == "GET":
        return jsonify(gem.to_dict()), 200
    elif request.method == "PATCH":
        data = request.get_json()
        for key in data.keys():
            if hasattr(gem, key):
                setattr(gem, key, data[key])
        db.session.add(gem)
        db.session.commit()
        return jsonify(gem.to_dict()), 200
    elif request.method == "DELETE":
        db.session.delete(gem)
        db.session.commit()
        return jsonify({}), 204

@app.route('/api/gems/<int:gem_id>/comments', methods=['GET', 'POST'])
def get_comments_for_gem(gem_id):
    if request.method == "GET":
        comments = Comment.query.filter_by(gem_id=gem_id).all()
        return jsonify([comment.to_dict() for comment in comments]), 200
    elif request.method == "POST":
        data = request.get_json()

        text = data.get('text')
        user_id = data.get('user_id')

        if not text or not user_id:
            return jsonify({"error": "Missing content or user_id"}), 400
        
        new_comment = Comment(text=text, user_id=user_id, gem_id=gem_id)

        db.session.add(new_comment)
        db.session.commit()

        return jsonify(new_comment.to_dict()), 201