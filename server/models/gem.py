from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

class Gem(db.Model, SerializerMixin):
    __tablename__ = "gems"

    serialize_rules=(
        '-user.gem',
        '-comments.gem',
        '-gem_tags.gem'
    )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(200))
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates='gems')

    comments = db.relationship("Comment", back_populates='gem', cascade="all, delete-orphan")
    gem_tags = db.relationship("GemTag", back_populates='gem', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Gem id={self.id} title={self.title} description={self.description} address={self.address} latitude={self.latitude} longitude={self.longitude} image_url={self.image_url} category={self.category} created_at={self.created_at}>'