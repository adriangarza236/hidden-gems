from flask import request, jsonify 
from config import app, db
from models.models import Gem
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
            gem = Gem(title=title, description=description, address=address, latitude=latitude, longitude=longitude, image_url=image_url)
            db.session.add(gem)
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
