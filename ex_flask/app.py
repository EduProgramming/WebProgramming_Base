from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

@app.route("/new", methods=['GET', 'POST'])
def new():
    if request.method == 'POST':
        user_id = request.form.get('user_id')
        user_pwd = request.form.get('user_pwd')
        data = {
            'user_id': user_id,
            'user_pwd': user_pwd,
        }
        return render_template('check.html', data=data)
    else:
        return render_template('new.html')

if __name__ == '__main__':
    app.run()