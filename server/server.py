from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from pytube import YouTube
from io import BytesIO
import os

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'videos'

def download_video(url, path):
    yt = YouTube(url)
    video_title = yt.title.replace(' ', '_').replace('|', '').replace('!', '').replace('?', '').replace('/', '').replace('\\', '') + '.mp4'
    stream = yt.streams.get_highest_resolution()
    return stream.download(path, filename=video_title), video_title

@app.route('/api/v1/getVideo', methods=['POST'])
def get_video():
    data = request.get_json()
    print(data)
    try:
        download_response, file_name = download_video(data['url'], app.config['UPLOAD_FOLDER'])
        return_data = {
            "message": "Video downloaded successfully!",
        }
        return send_from_directory(app.config['UPLOAD_FOLDER'], file_name, as_attachment=True)
    except Exception as e:
        return jsonify({"message": "An error occurred while downloading the video.", "error": str(e)})

@app.route('/api/v1/getVideoInfo', methods=['POST'])
def get_video_info():
    data = request.get_json()
    try:
        yt = YouTube(data['url'])
        video_info = {
            "title": yt.title,
            "length": yt.length,
            "views": yt.views,
            "author": yt.author,
            "thumbnail": yt.thumbnail_url,
            "highest_resolution": yt.streams.get_highest_resolution().resolution,
            "audio_quality": yt.streams.get_audio_only().abr,
        }
        return jsonify(video_info)
    except Exception as e:
        return jsonify({"message": "An error occurred while fetching video information.", "error": str(e)})
    

if __name__ == '__main__':
    app.run(debug=True, port=8080)