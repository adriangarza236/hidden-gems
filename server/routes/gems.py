from flask import request, jsonify 
from config import app, db
from models.models import Gem


@app.route("/api/gems", methods=["GET", "POST"], endpoint="gems")
def gems_route():
    if request.method == "GET":
        gems = [gem.to_dict() for gem in Gem.query.all()]
        return jsonify(gems), 200
    elif request.method == "POST":
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        address = data.get('address')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        image_url = data.get('image_url')
        category = data.get('category')
        gem = Gem(title=title, description=description, address=address, latitude=latitude, longitude=longitude, image_url=image_url, category=category)
        db.session.add(gem)
        db.session.commit()
        return jsonify(gem.to_dict()), 201

@app.route("/api/gems/<int:id>", methods=["GET", "PATCH", "DELETE"])
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
