from flask import Flask, render_template, request
import lis
import db
# import time

app = Flask(__name__)
app.secret_key = "thisisasecret"

@app.route("/")
def index():
    # asks user to input Scheme code
    html = render_template("index.html")
    return html

@app.route("/get_json", methods=["POST"])
def code_submitted():
    # return JSON to ajax call -- code input by user
    user_input = request.form.get("user_input")

    if not user_input:
        print 'NO USER INPUT'

    if user_input:
        json_object = lis.return_json(user_input)
        print json_object

    # time.sleep(5)
    return json_object

@app.route("/get_db_code/<code_name>")
def get_db_code(code_name):
    # return JSON to ajax call -- code from database
    code_object = db.s.query(db.Code).filter_by(name=code_name).one()
    code = code_object.code
    # json_object = lis.return_json(code)
    # return json_object
    return code

@app.route("/about")
def about():
    html = render_template("about.html")
    return html

if __name__ == "__main__":
    app.run(debug=True)
