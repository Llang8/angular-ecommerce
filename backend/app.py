from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from config import Config
import os

# Initialize App
app = Flask(__name__)


cors = CORS(app, resources={"/products": {"origins": "*"}})
cors = CORS(app, resources={"/login": {"origins": "*"}})

# Setup config from import
app.config.from_object(Config)

# Initialize db
db = SQLAlchemy(app)
ma = Marshmallow(app)

login_manager = LoginManager(app)
login_manager.login_view = 'loginAdmin'

from routes import *

# Run Server
if __name__ == "__main__":

    # Set debug to false in production
    app.run(debug=True)