from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

# Serve the index.html file for the root URL
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/amortization')
def loan_amortization():
    amount = request.args.get('amount')
    years = request.args.get('years')
    rate = request.args.get('rate')

    query = f"loan amortization for {amount} dollars over {years} years at {rate} percent interest"
    url = f"http://api.wolframalpha.com/v2/query?input={query}&format=plaintext&output=JSON&appid=WAKRRY-7YKHA9WJ5P"

    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
