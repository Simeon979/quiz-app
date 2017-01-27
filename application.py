from flask import Flask, render_template

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