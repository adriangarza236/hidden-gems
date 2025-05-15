from config import app
from flask import request, g 
from models.models import *
from .helpers import *

@app.before_request
def before_routes():
    if request.endpoint in ("tags", "tag", "gem_tags", "gem_tag"):
        if not is_logged_in():
            return { "error": "Access Denied" }, 401
    elif request.endpoint == "gem":
        id = request.view_args.get('id')
        g.gem = Gem.query.get(id)
        if not is_logged_in() or not is_owner(g.gem.user_id):
            return { "error": "Access Denied" }, 401
    elif request.endpoint == "comment":
        id = request.view_args.get('id')
        g.comment = Comment.query.get(id)
        if not is_logged_in() or not is_owner(g.comment.user_id):
            return { "error": "Access Denied" }, 401
        
from .comments import *
from .gem_tags import *
from .gems import *
from .sessions import *
from .tags import *
from .users import *
