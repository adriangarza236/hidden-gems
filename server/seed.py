from config import app, db
from models.models import *
from faker import Faker
import random

fake = Faker()

with app.app_context():
    print("Seeding Data...")

    print("Deleting...")
    GemTag.query.delete()
    Gem.query.delete()
    Tag.query.delete()
    Comment.query.delete()
    User.query.delete()

    print("Creating Users...")
    rocco = User(username="Rocco")
    kirby = User(username="Kirby")
    mia = User(username="Mia")

    rocco.password_hash = "testtest"
    kirby.password_hash = "testtest"
    mia.password_hash = "testtest"

    db.session.add_all([rocco, kirby, mia])
    db.session.commit()

    print("Creating Gems...")

    gem1 = Gem(title=fake.catch_phrase(), description=fake.paragraph(), address=fake.address(), latitude=29.7834633, longitude=-95.7303196, image_url='https://media.cntraveler.com/photos/615f55a8eb6bd1314aa47add/1:1/w_3467,h_3467,c_limit/Outdoor%20Enthusiasts-2021_GettyImages-451932111.jpg', user_id=rocco.id)
    gem2 = Gem(title=fake.catch_phrase(), description=fake.paragraph(), address=fake.address(), latitude=29.7688766, longitude=-95.7779153, image_url=fake.image_url(), user_id=mia.id)
    gem3 = Gem(title=fake.catch_phrase(), description=fake.paragraph(), address=fake.address(), latitude=fake.latitude(), longitude=fake.longitude(), image_url=fake.image_url(), user_id=kirby.id)
    gem4 = Gem(title=fake.catch_phrase(), description=fake.paragraph(), address=fake.address(), latitude=fake.latitude(), longitude=fake.longitude(), image_url=fake.image_url(), user_id=rocco.id)
    gem5 = Gem(title=fake.catch_phrase(), description=fake.paragraph(), address=fake.address(), latitude=fake.latitude(), longitude=fake.longitude(), image_url=fake.image_url(), user_id=kirby.id)

    db.session.add_all([gem1, gem2, gem3, gem4, gem5])
    db.session.commit()

    print("Creating Tags...")

    nature = Tag(name="Nature")
    food = Tag(name="Food")
    art = Tag(name="Art")
    music = Tag(name="Music")
    bar = Tag(name="Bar")

    db.session.add_all([nature, food, art, music, bar])
    db.session.commit()

    print("Creating GemTags...")

    gem1_tag = GemTag(gem_id=gem1.id, tag_id=art.id)
    gem2_tag = GemTag(gem_id=gem2.id, tag_id=nature.id)
    gem3_tag = GemTag(gem_id=gem3.id, tag_id=nature.id)
    gem4_tag = GemTag(gem_id=gem4.id, tag_id=bar.id)
    gem5_tag = GemTag(gem_id=gem5.id, tag_id=music.id)

    db.session.add_all([gem1_tag, gem2_tag, gem3_tag, gem4_tag, gem5_tag])
    db.session.commit()

    print("Creating Comments...")

    comm1 = Comment(text=fake.paragraph(), user_id=rocco.id, gem_id=gem1.id)
    comm2 = Comment(text=fake.paragraph(), user_id=kirby.id, gem_id=gem2.id)
    comm3 = Comment(text=fake.paragraph(), user_id=mia.id, gem_id=gem3.id)
    comm4 = Comment(text=fake.paragraph(), user_id=rocco.id, gem_id=gem4.id)
    comm5 = Comment(text=fake.paragraph(), user_id=kirby.id, gem_id=gem5.id)

    db.session.add_all([comm1, comm2, comm3, comm4, comm5])
    db.session.commit()

    print("Finished Seeding Data...")





    
