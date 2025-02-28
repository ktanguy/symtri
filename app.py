from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

# Wolfram Alpha API Configuration
api_key = "WAKRRY-7YKHA9WJ5P"  # Replace this with your own API key
BASE_URL = "https://api.wolframalpha.com/v2/query"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/finance', methods=['GET'])
def get_current_stock_price():
    # Get ticker from request parameters, default to AAPL
    ticker = request.args.get('ticker', default='AAPL', type=str)

    # Construct the query exactly as the working URL
    query = f"Economic growth in Rwanda"
    
    # Request parameters matching the working URL
    params = {
        "input": query,
        "format": "image,plaintext",
        "output": "JSON",
        "appid": api_key
    }

    # Make the request to Wolfram Alpha
    response = requests.get(BASE_URL, params=params)
    
    # Error handling for API request failure
    if response.status_code != 200:
        return jsonify({"error": "Unable to get data from Wolfram Alpha"}), 500
    
    # Extracting the relevant data from the JSON response
    data = response.json()
    pods = data.get('queryresult', {}).get('pods', [])
    stock_price = None

    for pod in pods:
        subpods = pod.get('subpods', [])
        for subpod in subpods:
            if subpod.get('plaintext'):
                stock_price = subpod['plaintext']
                break  # Found the price, no need to continue

    # If no stock price is found, return a descriptive message
    if not stock_price:
        return jsonify({
            "ticker": ticker,
            "message": "No current price available."
        }), 200

    return jsonify({"ticker": ticker, "price": stock_price})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
