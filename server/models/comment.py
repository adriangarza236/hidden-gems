from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
class Comment(db.Model, SerializerMixin):
    __tablename__="comments"

    serialize_rules=(
        '-user.comments',
        '-gem.comments'
    )

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    gem_id = db.Column(db.Integer, db.ForeignKey('gems.id'))

    user = db.relationship('User', back_populates='comments')
    gem = db.relationship('Gem', back_populates='comments')

    def __repr__(self):
        return f'<Comment id={self.id} text={self.text} created_at={self.created_at}>'