from flask import Flask, jsonify, render_template, request

APP = Flask(__name__)

# ensure responses aren't cached
if APP.config["DEBUG"]:
  @APP.after_request
  def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@APP.route("/")
def index():
  """Homepage"""
  return render_template("index.html")

@APP.route("/question")
def question():
  """Return 10 random question"""
  data = []
  if request.args.get("method") == "random":
    with open("questions.txt") as file:
      while file.readline() != "":
        a = {}
        a["question"] = file.readline().strip()
        a["option"] = file.readline().strip().split(", ")
        a["answer"] = file.readline().strip()
        data.append(a)

  return jsonify(data)
