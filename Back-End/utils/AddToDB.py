import json
import requests
import time

email = "admin@travel.com"
pwd = "securePassword"

API_URL = "http://127.0.0.1:3000/api/destinations/createDestination"
Login_URL = "http://127.0.0.1:3000/api/auth/login"

sesssion_key = ""
login = {"email": email, "password": pwd}

def post_data(json_data, url, token = None):
    bearer_token = token

    if token:
        headers = {
        'Authorization': f'Bearer {bearer_token}',
        'Content-Type': 'application/json'  
        }
    else:
         headers = {
        'Content-Type': 'application/json'  
        }
         
    response = requests.post(url, data=json.dumps(json_data), headers=headers)
    print("Response:", response.status_code)
    return response

sesssion_key = post_data(login, Login_URL).json()["token"]

# Load JSON data from file
with open("./dataset/traveldata.json", 'r') as json_file:
    travel_data = json.load(json_file)


# Iterate over each JSON object and post it
for data_point in travel_data:
    post_data(data_point, API_URL, sesssion_key)
    time.sleep(1)  # Wait for 1 second before posting the next JSON object
