from flask import Flask, render_template, request
import lis
import js_parser

# import os, sys
# db_path = os.path.abspath('/database')
# sys.path.append(db_path)
import database.db as db

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
    user_input = request.form.get("user_input").strip()

    if not user_input:
        print 'NO USER INPUT'

    elif user_input[0] == '(': # if Scheme program
        json_object = lis.format_json(user_input)

    else: # try JavaScript
        json_object = js_parser.format_json(user_input)
    
    print json_object
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

@app.route("/tree")
def tree():
    html = render_template("tree.html")
    return html

if __name__ == "__main__":
    app.run(debug=True)
