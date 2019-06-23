from app import app,db, login_manager
from flask_cors import cross_origin
from flask import request,render_template,redirect,url_for, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from models import User, UserSession, Product, ProductImage, Review, product_schema, products_schema
from random import choice
from uuid import uuid4
import datetime

@app.route('/register', methods=["POST"])
@cross_origin(origin="*",headers=["Content-Type","Authorization"])
def register():
    try:
        args = request.get_json()
        username = args['username']
        email = args['email']
        password = args['password']
        if('firstName' in args.keys()):
            first_name = args['firstName']
        else:
            first_name = ''
        if('lastName' in args.keys()):
            last_name = args['lastName']
        else:
            last_name = ''

        user = User(username=username,email=email,first_name=first_name,last_name=last_name)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()

        return jsonify(args)
    except Exception as e:
        print(e)
        return 'ERROR {}'.format(e)


@app.route('/checkSession/<id>', methods=["GET"])
@cross_origin(origin="*",headers=["Content-Type", "Authorization"])
def checkSession(id):
    if id == 'undefined':
        return 'Session not found'
    
    
    user_session = UserSession.query.filter_by(session_id=id).first()
    # Check that session is not expired
    if datetime.datetime.now() < user_session.expiration_date:
        user = User.query.filter_by(id=user_session.user_id).first()
        return jsonify(id=user.id,username=user.username,email=user.email,first_name=user.first_name,last_name=user.last_name,is_interviewer=user.is_interviewer,create_date=user.create_date)
    
    return 'Session not found'

@app.route('/login/<email>/<password>')
@cross_origin(origin="*",headers=["Content-Type","Authorization"])
def login(email,password):
    try:
        user = User.query.filter_by(email=email).first()
        if user.check_password_hash(password):
            uuid = str(uuid4())
            print(uuid)
            # Set expiration date to one week
            expiration_date = datetime.datetime.now() + datetime.timedelta(days=7)
            user_session = UserSession(session_id=uuid,user_id=user.id,expiration_date=expiration_date)
            db.session.add(user_session)
            db.session.commit()
            return jsonify(id=user.id,username=user.username,email=user.email,first_name=user.first_name,last_name=user.last_name,create_date=user.create_date, token=uuid)
        else:
            return 'Password Incorrect'

    except Exception as e:
        return 'Error: {}'.format(e)

######################################################
#   BEGIN ROUTES FOR PRODUCTS
######################################################

@app.route('/product/<id>', methods=["GET"])
def getProduct(id):
    pass

@app.route('/products',methods=["GET"])
def getAllProducts():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result.data)

@app.route('/product', methods=["POST"])
def addProduct():
    try:
        args = request.get_json()
        title = args['title']
        description = args['description']
        price = args['price']
        sales = args['sales']
        featured = args['featured']
        thumbnail = args['thumbnail']

        product = Product(title=title,description=description,price=price,sales=sales,featured=featured,thumbnail=thumbnail)

        db.session.add(product)
        db.session.commit()

        return jsonify(args)
    except Exception as e:
        print(e)
        return 'ERROR {}'.format(e)

@app.route('/product', methods=["PUT"])
def updateProduct():
    pass

@app.route('/product/<id>', methods=["DELETE"])
def deleteProduct(id):
    pass

@app.route('/productImages/<id>', methods=["GET"])
def getProductImages(id):
    pass

@app.route('/productImages/<id>', methods=["DELETE"])
def delProductImage(id):
    pass

######################################################
#   BEGIN ROUTES FOR PURCHASES
######################################################