from flask import request, jsonify 
from config import app, db
from models.models import Gem
from models.models import Tag
from .helpers import *
from werkzeug.utils import secure_filename
import os
import json

UPLOAD_FOLDER = os.path.join('static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/gems", methods=["GET", "POST"])
def gems_route():
    if request.method == "GET":
        gems = [gem.to_dict() for gem in Gem.query.all()]
        return jsonify(gems), 200
    elif request.method == "POST":
        if is_logged_in():
            title = request.form.get('title')
            description = request.form.get('description')
            address = request.form.get('address')
            latitude = request.form.get('latitude')
            longitude = request.form.get('longitude')
            tag_ids_raw = request.form.get('tag_ids')

            if not title or not description or not address or latitude is None or longitude is None:
                return jsonify({"error": "Missing required fields"}), 400
            
            try:
                latitude = float(latitude)
                longitude = float(longitude)
            except (TypeError, ValueError):
                return jsonify({"error": "Invalid latitude or longitude"}), 400
            
            try:
                tag_ids = json.loads(tag_ids_raw) if tag_ids_raw else []
            except Exception:
                return jsonify({"error": "Invalid tag_ids format"}), 400

            image_url = None
            if 'image' in request.files:
                image = request.files['image']
                if image and allowed_file(image.filename):
                    filename = secure_filename(image.filename)
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    os.makedirs(os.path.dirname(filepath), exist_ok=True)
                    image.save(filepath)
                    image_url = f"http://localhost:5555/static/uploads/{filename}"
                else:
                    return jsonify({"error": "Unsupported file type"}), 400
                
            user = current_user()
            if not user:
                return jsonify({"error": "User not found"}), 401

            gem = Gem(
                title=title,
                description=description,
                image_url=image_url,
                address=address,
                latitude=latitude, 
                longitude=longitude,  
                user_id=user.id
            )
            db.session.add(gem)
            db.session.commit()

            if tag_ids:
                tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
                gem.tags.extend(tags)
                db.session.commit()

            gem = Gem.query.get(gem.id)

            print(gem.image_url)
            return jsonify(gem.to_dict()), 201
        else: 
            return { "error": "Access Denied" }, 401

@app.route("/api/gem/<int:id>", methods=["GET", "PATCH", "DELETE"], endpoint="gem")
def gem_route(id):
    gem = Gem.query.get(id)
    if request.method == "GET":
        return jsonify(gem.to_dict()), 200
    elif request.method == "PATCH":
        title = request.form.get("title")
        description = request.form.get("description")
        tag_ids_raw = request.form.get("tag_ids")

        if title:
            gem.title = title
        if description:
            gem.description = description

        if tag_ids_raw:
            try:
                tag_ids = json.loads(tag_ids_raw)
                tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
                gem.tags = tags
            except Exception:
                return jsonify({"error": "Invalid tag_ids format"}), 400
            
        if 'image' in request.files:
            image = request.files['image']
            if image and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                os.makedirs(os.path.dirname(filepath), exist_ok=True)
                image.save(filepath)
                image_url = f"http://localhost:5555/static/uploads/{filename}"
                gem.image_url = image_url
            else:
                return jsonify({"error": "Unsupported file type"}), 400
                
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