from flask import Flask, render_template, request
import scheme_interpreter.lis as lis
import js_parser.js_parser as js_parser
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
    print request.form.get("user_input")
    user_input = request.form.get("user_input").strip()

    if not user_input:
        print 'NO USER INPUT'
        return None

    elif user_input[0] == '(': # if Scheme program
        json_object = lis.format_json(user_input)

    else: # try JavaScript
        json_object = js_parser.format_json(user_input)
    
    # print json_object
    return json_object

@app.route("/get_db_code/<code_id>")
def get_db_code(code_id):
    # return JSON to ajax call -- code from database
    code_object = db.s.query(db.Code).filter_by(id=code_id).one()
    code = code_object.code
    return code

@app.route("/save_to_db", methods=["POST"])
def save_to_db():
    print request.form.get("user_input")
    user_input = request.form.get("user_input").strip()
    if not user_input:
        print 'NO USER INPUT'

    else:
        success = db.new_code(user_input) # returns None if failure, code id if success
        if success:
            return "Share your code with http://visualispy.herokuapp.com/%r." % success
        else: 
            return "Sorry, an error occurred."

@app.route("/<code_id>")
def display_db_code(code_id):
    # return JSON to ajax call -- code from database
    code_object = db.s.query(db.Code).filter_by(id=code_id).one()
    code = code_object.code
    html = render_template("index.html", code=code)
    return html

@app.route("/about")
def about():
    html = render_template("about.html")
    return html

# @app.route("/tree")
# def tree():
#     html = render_template("tree.html")
#     return html

if __name__ == "__main__":
    app.run(debug=True)
