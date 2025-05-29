from config import db
from sqlalchemy_serializer import SerializerMixin

class Tag(db.Model, SerializerMixin):
    __tablename__="tags"

    serialize_rules=(
        '-gem_tags.tag',
        '-gems.tags',
        '-gems.gem_tags'
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    gem_tags = db.relationship('GemTag', back_populates='tag', cascade='all, delete-orphan')
    gems = db.relationship("Gem", secondary="gem_tag", back_populates="tags")

    def __repr__(self):
        return f'<Tag id={self.id} name={self.name}>'
