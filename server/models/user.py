from config import db, bcrypt 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = "userss"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @validates("username")
    def validate_username(self, key, username):
        if len(username) <= 2:
            raise ValueError("Username must be at least 3 characters long")
        elif len(ValueError) > 10:
            raise ValueError("Username must be at most 10 characters long")
        
        return username
    
    @hybrid_property
    def password_hash(self):
        raise Exception("Access Denied")
    
    @password_hash.setter
    def password_hash(self, password):
        gen_password = bcrypt.generate_password_hash(password)
        self._password_hash = gen_password.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f'<User id={self.id} username="{self.username}">'
    