from flask import Flask, render_template, redirect, url_for, request
import lis

app = Flask(__name__)
app.secret_key = "thisisasecret"

# asks user to input Scheme code
@app.route("/")
def index():
    html = render_template("index.html")
    return html

@app.route("/get_json", methods=["POST"])
def code_submitted():
    user_input = request.form.get("user_input")

    if not user_input:
        print 'NO USER INPUT'
        # return render_template("tree.html", json_object='Please type in valid code.')
        # return 'Please type in valid code.'

    if user_input:
        json_object = lis.return_json(user_input)
        print json_object

    # return JSON to ajax call
    return json_object

if __name__ == "__main__":
    app.run(debug=True)
