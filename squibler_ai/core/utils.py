import firebase_admin
from firebase_admin import credentials, db

def setFirebaseSetup():
    # Load Firebase credentials
    cred = credentials.Certificate("./serviceAccountKey.json")
    
    # Initialize Firebase app
    firebase_admin.initialize_app(cred, {
        'databaseURL': "https://squibler-30bef-default-rtdb.asia-southeast1.firebasedatabase.app/"
    })

    # Access the root reference of the database
    ref = db.reference("/")
    ref.set({"message": "sfioejiojfweojio"})
