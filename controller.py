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
    print request.form
    print request.form.get("user_input")

    if not user_input:
        print 'NO USER INPUT'
        # return render_template("tree.html", json_object='Please type in valid code.')
        # return 'Please type in valid code.'



        s ="""
                    {
                         "*": [
                              "*",
                              9,
                              8
                         ]
                    };
                    """
        return s


    print user_input
    if user_input:
        print 'USER INPUT'
        json_object = lis.return_json(user_input)
        print type(json_object)
        print json_object


    # return redirect(url_for("index"))
    # display JSON in browser 

    # return render_template("tree.html", json_object=json_object)
    # RETURN THE JSON OBJECT YOU 'TARD
    return json_object

    

# @app.route("/tree")
# def tree():


if __name__ == "__main__":
    app.run(debug=True)



        # $.ajax({
        #     url: "/",
        #     method: "POST",
        #     data: {
        #         list_name: "List Name"
        #     },

        # }).done(function(data){
        #     alert(data);
        # }).fail(function(){
        #     alert('fail!!!');
        # });
