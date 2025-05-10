from config import db
from sqlalchemy_serializer import SerializerMixin

class Tag(db.Model, SerializerMixin):
    __tablename__="tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Tag id={self.id} name={self.name}>'
