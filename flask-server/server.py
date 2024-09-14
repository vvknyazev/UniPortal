from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bson.json_util import dumps
import datetime

import pymongo

app = Flask(__name__)

# Configuring MongoDB
app.config[
    "MONGO_URI"] = "mongodb+srv://vvknyazev:YJrOHOSnHleTM3wn@cluster0.yzlgozz.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0"
# app.config["MONGO_URI"] = "mongodb+srv://vvknyazev:516FnwwZdgRj6dyL@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)
# Configuring JWT
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
jwt = JWTManager(app)

# app.config.from_object(Config)
# mongo.init_app(app)

CORS(app)

# app.config["MONGO_URI"] = "mongodb+srv://vvknyazev:516FnwwZdgRj6dyL@cluster0.yzlgozz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    mongo = PyMongo(app)
    # db = mongo.cx["data"]
    # collection = db["users"]
    print("MongoDB connected:", mongo.db)
except Exception as e:
    print("Error connecting to MongoDBasd:", e)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = mongo.db.users.find_one({"username": username})
    if user:
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    mongo.db.users.insert_one({"username": username, "email": email, "password": hashed_password})

    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(days=1))
    return jsonify(access_token=access_token), 200
    # return jsonify({"msg": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = mongo.db.users.find_one({"username": username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(days=1))
    return jsonify(access_token=access_token), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/get_recommendations', methods=['GET'])
@jwt_required()
def get_recommendationsFromDB():
    try:
        current_user = get_jwt_identity()

        # Debugging statements
        print("Current user:", current_user)

        user = mongo.db.users.find_one({"username": current_user})

        if not user:
            return jsonify({"msg": "User not found"}), 404

        recommendations = user.get('recommendations', [])

        return jsonify({"recommendations": recommendations}), 200
    except Exception as e:
        print("Error:", str(e))  # Debugging statement
        return jsonify({"msg": str(e)}), 500
@app.route('/save_recommendations', methods=['POST'])
@jwt_required()
def save_recommendations():
    try:
        current_user = get_jwt_identity()
        print(current_user)
        data = request.get_json()
        print(data)
        recommendations = data.get('recommendations')
        print(recommendations)
        if recommendations is None:
            return jsonify({"msg": "No recommendations provided"}), 400

        # Update user's document with new recommendations
        mongo.db.users.update_one(
            {"username": current_user},
            {"$set": {"recommendations": recommendations}}
        )

        return jsonify({"msg": "Recommendations saved successfully"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500





# app.register_blueprint(auth)

path_to_csv = './optimized-dataset.csv'
df_data = pd.read_csv(path_to_csv)

df_data['specialization'] = df_data['specialization'].str.strip().str.lower()
categorical_features = ['gender', 'interests', "grade", 'mbti']

encoder = OneHotEncoder(sparse_output=False)
one_hot_encoded = encoder.fit_transform(df_data[categorical_features])

one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoder.get_feature_names_out(categorical_features))
df_encoded = pd.concat([df_data, one_hot_df], axis=1)
df_encoded = df_encoded.drop(categorical_features, axis=1)

columns_to_drop = df_encoded.filter(like='specialization').columns
df_encoded_without_specialization = df_encoded.drop(columns=columns_to_drop)


def compute_similarity(user, data):
    similarity = cosine_similarity(user, data)
    return similarity


def get_recommend(user, weights):
    user_data = pd.DataFrame([user], columns=['gender', 'interests', 'grade', 'mbti'])
    one_hot_user_data = encoder.transform(user_data[categorical_features])
    one_hot_user_df = pd.DataFrame(one_hot_user_data, columns=encoder.get_feature_names_out(categorical_features))

    weighted_one_hot_user_df = one_hot_user_df.copy()
    for feature, weight in weights.items():
        weighted_one_hot_user_df.loc[:, weighted_one_hot_user_df.columns.str.startswith(feature)] *= weight

    weighted_similarity_matrix = compute_similarity(weighted_one_hot_user_df.values,
                                                    df_encoded_without_specialization.values)

    top_indices = np.argsort(weighted_similarity_matrix[0])[-4:-1][::-1]
    # print(df_encoded.iloc[top_indices]['specialization'])
    decoded_top_users = encoder.inverse_transform(df_encoded_without_specialization.iloc[top_indices])

    return df_encoded.iloc[top_indices]['specialization']


# Тестування роботи алгоритму для вигаданого користувача
user = ["Male", "Technology", 85, "INTJ"]

if user[2] > 96:
    user[2] = 96

if user[2] < 49:
    user[2] = 49

weights = {'gender': 0.1, 'interests': 0.5, 'grade': 0.1, 'mbti': 0.3}

# Якщо користувач не обрав інтереси
if df_data['interests'].str.match(user[1]).any():
    print("its in")
else:
    user[1] = user[1].split(";")[0]
    weights = {'gender': 0.1, 'interests': 0, 'grade': 0.1, 'mbti': 0.8}

print(df_data['interests'])

print(weights)
print(user)
recommended_specializations = get_recommend(user, weights)
print(recommended_specializations)


@app.route('/recommend', methods=['POST'])
def get_recommendations():
    if request.method == 'POST':
        # print(request)
        data = request.json
        print(data)
        user_input = [data['inputData']['gender'], data['inputData']['interests'], data['inputData']['grade'],
                      data['inputData']['mbti']]
        print(user_input)

        if user_input[2] > 96:
            user_input[2] = 96

        if user_input[2] < 49:
            user_input[2] = 49
        if user_input[3] == 'INFP':
            return jsonify({"recommend": ['general', 'general', 'general']})

        weights = {'gender': 0.05, 'interests': 0.4, 'grade': 0.05, 'mbti': 0.5}
        if user_input[1] == "" or user_input[1] == " ":
            weights = {'gender': 0.1, 'interests': 0, 'grade': 0.1, 'mbti': 0.8}
            user_input[1] = "Technology"
        elif df_data['interests'].str.contains(user_input[1]).any():
            print("its in")
        else:
            user_input[1] = user_input[1].split(";")[0]
            weights = {'gender': 0.1, 'interests': 0, 'grade': 0.1, 'mbti': 0.8}
            print("its not")

        recommended_specializations = get_recommend(user_input, weights)

        print(recommended_specializations)
        print("ONLY ELEMENT")
        print(recommended_specializations.values[0])

        return jsonify({"recommend": [recommended_specializations.values[0], recommended_specializations.values[1],
                                      recommended_specializations.values[2]]})


if __name__ == "__main__":
    app.run(debug=True)
