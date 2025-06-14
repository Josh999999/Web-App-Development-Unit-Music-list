from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

application = Flask(__name__)


@application.route('/')
def home():
    return render_template('index.html')





#Error 1: No Problem here
@application.route("/api/songList", methods=['GET'])
#This function will tigger when this URL is sent to the server with a GET request
def songList():
  url_root = os.path.realpath(os.path.dirname(__file__))
  #os.path.direname gets the filepath of the specified file (excluding the file)
  #os.path.realpath removes all symbols and spaces from the path (cleans the URL)
  url_json = os.path.join(url_root, "data", "song.json")
  #This joins url_root with the two other patameters passed in seperating each one with '/''s
  print(url_json)
  file = open(url_json, 'r')
  #opens the file from the new file path (the .json file with all of the songs)
  songs_object = json.load(file)
  #takes the file and converts it to json format (json object)
  file.close()
  #close the file
  print(songs_object)
  return songs_object
  #returns the json object







@application.route("/api/songList", methods=['PUT'])
#This function will tigger when this URL is sent to the server with a PUT request
def uploadSongs():
  returnMsgTrue = jsonify(message="song list uploaded")
  returnMsgFalse = jsonify(message="song list failed to upload(data was not in json)")
  #Creating json messages to return to the user
  if request.is_json: #tests if the request is JSON format
    request2 = request.get_json()
    #retrieves the json data from the request
    url_root = os.path.realpath(os.path.dirname(__file__))
    #os.path.direname gets the filepath of the specified file (excluding the file)
    #os.path.realpath removes all symbols and spaces from the path (cleans the URL)
    url_json = os.path.join(url_root, "data", "song.json")
    #This joins url_root with the two other patameters passed in seperating each one with '/''s
    print(url_json)
    file = open(url_json, 'w')
    #opens the file to write in
    json.dump(request2, file, indent=1)
    #dumps the json data into the file
    #doesnt need to use jsonify as the data sent over was already in json format
    file.close()
    #close the file
    return returnMsgTrue, 200
    #Returns the OK messages with an OK status code
  else:
    return returnMsgFalse, 400
    #Returns the Error messages with an client error status code

#Runs the application if the file name = 'main.py' on port 8080 on address 0.0.0.0 (wildcard address)
if __name__ == '__main__':
  application.run(host='0.0.0.0', port=8080)