from flask import Flask, request, send_from_directory

app = Flask(__name__)
image_directory = './images'


@app.route('/images/<path:path>')
def serve_image(path):
    return send_from_directory(image_directory, path)


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['image']
    file.save('./images/'+file.filename)
    return 'File saved successfully'


if __name__ == '__main__':
    app.run(debug=True, port=8000)
