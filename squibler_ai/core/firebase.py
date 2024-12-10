import firebase_admin
from firebase_admin import credentials, db

def get_firebase_app():
    """
    Ensure the Firebase app is initialized only once and return the app instance.
    """
    if not firebase_admin._apps:  # Check if the app is already initialized
        cred = credentials.Certificate("./serviceAccountKey.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': "https://squibler-30bef-default-rtdb.asia-southeast1.firebasedatabase.app/"
        })
    return firebase_admin.get_app()  # Return the initialized app

def get_database_reference():
    """
    Get the root reference of the database.
    """
    get_firebase_app()  # Ensure the app is initialized
    return db.reference("/")


def save_words_count(count):
    """
    Increment the word count in the database.
    """
    ref = get_database_reference().child("wordCounts")
    current_count = ref.get()  # Get the current count from the database

    # If no count exists, initialize it to 0
    if current_count is None:
        current_count = 0

    # Increment the count and update it in the database
    new_count = current_count + count
    ref.set(new_count)



def save_words_analysis(word_analysis):
   
    ref = get_database_reference().child("word_analysis")
    ref.update(word_analysis)
