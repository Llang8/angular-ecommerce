from app import db
from werkzeug.security import generate_password_hash,check_password_hash
from datetime import datetime
from flask_login import UserMixin

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25),unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True,nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    create_date = db.Column(db.DateTime, index=True, default = datetime.utcnow)

    # Setup backrefs for one-to-many relationships
    reviews = db.relationship('Review', backref='user', lazy=True)
    purchases = db.relationship('Purchase', backref='user', lazy=True)
    cart_items = db.relationship('CartItem', backref='user', lazy=True)


    def __repr__(self):
        return '<USER {}>'.format(self.username)

    def set_password(self,password):
        self.password_hash = generate_password_hash(password)

    def check_password_hash(self,password):
        return check_password_hash(self.password_hash, password) 


class Product(db.Model):
    __tablename__='product'
    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    description=db.Column(db.String, nullable=False)
    thumbnail=db.Column(db.String, nullable=False)
    sales=db.Column(db.Integer, default=0)
    featured=db.Column(db.Integer, default=2)
    price=db.Column(db.Integer, nullable=False)

    # Setup backrefs
    images = db.relationship('ProductImage', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def __repr__(self):
        return '<Product {}>'.format(self.id)

class Admin(UserMixin, db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(100))

    
    def __repr__(self):
        return '<ADMIN {}>'.format(self.id)

class ProductImage(db.Model):
    __tablename__='product_image'
    id=db.Column(db.Integer, primary_key=True)
    image=db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    def __repr__(self):
        return '<PRODUCTIMAGE {}>'.format(self.id)

class UserSession(db.Model):
    __tablename__ = 'user_session'
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String, nullable=False,unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expiration_date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<SESSION {}>'.format(self.id)

class Review(db.Model):
    __tablename__='review'
    id=db.Column(db.Integer, primary_key=True)
    rating=db.Column(db.Integer, nullable=False)
    subject=db.Column(db.String, nullable=False)
    message=db.Column(db.String, nullable=False)
    date_created=db.Column(db.DateTime, index=True, default=datetime.utcnow)
    product_id=db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<REVIEW {}>'.format(self.id)

class CartItem(db.Model):
    __tablename__='cart_item'
    id=db.Column(db.Integer, primary_key=True)
    quantity=db.Column(db.Integer, nullable=False)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    product_id=db.Column(db.Integer,db.ForeignKey('product.id'),nullable=False)

    def __repr__(self):
        return '<CARTITEM {}>'.format(self.id)
