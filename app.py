"""
app.py

Main program for MultiRestore app."""

import json
import time

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# ====================
@app.route('/')
def index():
    """Render page for all"""

    return render_template('index.html', page='all')

# ====================
@app.route('/spaces')
def spaces():
    """Render page for spaces"""

    return render_template('index.html', page='spaces')


# ====================
@app.route('/caps_and_punct')
def caps_and_punct():
    """Render page for caps and punct"""

    return render_template('index.html', page='caps_and_punct')


# ====================
@app.route('/all')
def all():
    """Render page for all"""

    return render_template('index.html', page='all')


# ====================
@app.route('/model', methods=['POST'])
def model():
    """Return Model 1 result"""

    request_data = json.loads(request.data)
    model = request_data['model']
    # input_text = request_data['input_text']

    if model == 'model1':
        time.sleep(5)
        output = 'Currently unavailable.'
        return jsonify(output)

    elif model == 'model3':
        time.sleep(5)
        output = 'Currently unavailable.'
        return jsonify(output)

    elif model == 'model4':
        time.sleep(5)
        output = 'Currently unavailable.'
        return jsonify(output)

    elif model == 'model5':
        time.sleep(5)
        output = 'Currently unavailable.'
        return jsonify(output)

    elif model == 'pipeline13':
        time.sleep(5)
        output = 'Currently unavailable.'
        return jsonify(output)


# ====================
if __name__ == "__main__":

    app.run(debug=True)
