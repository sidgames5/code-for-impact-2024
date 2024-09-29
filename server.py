from flask import Flask, request, send_from_directory
import json
import os
import zlib as zl
import time as t

datafolder = "./data"
places = os.path.join(datafolder, "places.json")

app = Flask(__name__, static_url_path="")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("static", path)


@app.route("/")
def serve_index():
    return send_from_directory("static", "index.html")


@app.route("/api", methods=["POST"])
def api_endpoint():
    data = request.json

@app.route("/api/places", methods=["GET"])
def places_endpoint():
    pl = None
    with open(places, "r") as f:
        pl = json.loads(f.read())
    return pl["places"]

@app.route("/api/writereview", methods=["POST"])
def write_endpoint():
    data = request.json
    name = data["name"]
    rating = data["rating"]
    review = data["review"]
    timestamp = t.time()
    picture = ""
    placeHash = data["place"]
    realplace = 0
    if name == "":
        name = "Anonymous"
    pl = None
    with open(places, "r") as f:
        pl = json.loads(f.read())
    placee = pl["places"]
    for i in range(len(placee)):
        if placee[i]["crc32"] == placeHash:
            realplace = i
            break

    pl["places"][realplace]["reviews"].append(
        {
            "name": name,
            "rating": rating,
            "review": review,
            "timestamp": timestamp,
            "picture": picture
        }
    )
    with open(places, "w") as f:
        f.write(json.dumps(pl))
    return pl["places"]

@app.route("/api/getreview", methods=["GET"])
def getReviews():
    placeHash = request.args.get("place")
    with open(places, "r") as f:
        pl = json.loads(f.read())
    placee = pl["places"]
    
    print(placee)
    realplace = 0
    
    for i in range(len(placee)):
        if int(placee[i]["crc32"]) == placeHash:
            realplace = i
            break
    return placee[realplace]["reviews"]

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)