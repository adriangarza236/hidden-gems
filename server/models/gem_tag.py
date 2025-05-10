from config import db
from sqlalchemy_serializer import SerializerMixin

class GemTag(db.Model, SerializerMixin):
    __tablename__="gem_tag"

    id = db.Column(db.Integer, primary_key=True)
    gem_id = db.Column(db.Integer, db.ForeignKey('gems.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"))

    def __repr__(self):
        return f'<GemTag id={self.id}>'