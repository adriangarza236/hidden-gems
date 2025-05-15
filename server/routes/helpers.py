from flask import session
from models.models import *

def is_logged_in():
    return not not session.get("user_id")

def current_user():
    if is_logged_in():
        return User.query.get(session["user_id"])
    
def is_owner(id):
    return current_user().id == id