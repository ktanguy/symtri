from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

# Wolfram Alpha API Configuration
app_id = 'WAKRRY-7YKHA9WJ5P'  # Replace this with your actual App ID
query = "Economic growth in Rwanda"
url = "https://api.wolframalpha.com/v2/query"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/economic-growth')
def get_economic_growth():
    # Request parameters for v2/query
    params = {
        "input": query,
        "format": "plaintext",
        "output": "json",
        "appid": app_id
    }
    
    try:
        # Send the request to Wolfram Alpha
        response = requests.get(url, params=params, timeout=10)
        
        # Check for a successful response
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            pods = data.get('queryresult', {}).get('pods', [])
            results = []

            # Extract and store relevant information from the pods
            for pod in pods:
                title = pod.get('title', 'No title')
                subpods = pod.get('subpods', [])
                for subpod in subpods:
                    content = subpod.get('plaintext', 'No data available')
                    print("before translation", title)
                    title = requests.post("https://kfin-592896761758.us-central1.run.app/translate", json={"text": title})
                    print(title)
                    content = requests.post("https://kfin-592896761758.us-central1.run.app/translate", json={"text": content})
                    results.append({"title": title.json(), "content": content.json()})
            
            return jsonify(results)
        else:
            return jsonify({"error": f"Error: {response.status_code}"}), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
