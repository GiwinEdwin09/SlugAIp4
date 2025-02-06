from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pinecone
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec, PodSpec
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
#clients
pinecone_client = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

index_name = "course-scheduler"
index = pinecone_client.Index(index_name)

def query_courses(transcript, next_quarter):

    response = openai_client.embeddings.create(
        input="input classes for course generation",
        model="text-embedding-ada-002"
    )
    query_embedding = response.data[0].embedding

    results = index.query(
        vector=query_embedding,
        top_k=10,
        include_metadata=True,
    )
    return results["matches"]

#generation
def generate_recommendations(courses):
    course_list = "\n".join([f"{course}" for course in courses if 'metadata' in course])
    prompt = f"Based on the following courses, recommend 3 for the next quarter:\n{course_list}"
    
    response = openai_client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    recommendations = response.choices[0].message.content
    return recommendations

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    transcript = data.get('transcript')
    next_quarter = data.get('next_quarter')
    
    if not transcript or not next_quarter:
        return jsonify({"error": "Transcript and next quarter are required"}), 400
    
    courses = query_courses(transcript, next_quarter)
    recommendations = generate_recommendations(courses)
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)