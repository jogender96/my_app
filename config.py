import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://username:Jogender@123@localhost/mytestdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
