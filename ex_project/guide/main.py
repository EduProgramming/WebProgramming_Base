from flask import Flask, jsonify, request, session, redirect, render_template, url_for
import json, datetime, base64
import requests
import db_init

with open('./database.json', 'r', encoding='utf-8') as f:
    read_data = f.read()

secret_data = json.loads(read_data)

IMGUR_CLIENT_ID = secret_data.get('IMGUR-CLIENT-ID')

app = Flask(__name__)
app.secret_key = 'guide'

def is_check_login():
    is_login = False
    if 'user_code' in session:
        is_login = True
    return is_login

def is_check_reservation(user_id):
    is_reservation = db_init.get_bus_reservation(user_id)
    return is_reservation

def _imgur_send_request(img):
    IMGUR_URL = 'https://api.imgur.com/3/image'
    bs64_img = base64.b64encode(img.read())
    data = {
        'image': bs64_img,
        'type': 'base64'
    }
    headers = {
        'Authorization': f'Client-ID {IMGUR_CLIENT_ID}'   
    }
    result = []
    try:
        response = requests.post(IMGUR_URL, headers=headers, data=data)
        response_data = response.json().get('data')
        img_link = response_data.get('link')
        img_deletehash = response_data.get('deletehash')
        result.append(img_link)
        result.append(img_deletehash)
    except:
        result = []
    return result

@app.route('/')
def index():
    is_login = is_check_login()
    return render_template('index.html', is_login=is_login)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_code = request.form.get('user-code')
        user_pwd = request.form.get('user-password')
        result = db_init.get_login_user(user_code, user_pwd)
        if result:
            session['user_code'] = user_code
            user_data = db_init.get_simple_data_user(user_code)
            session['user_id'] = user_data[0]
            session['user_name'] = user_data[1]
            return redirect(url_for('index'))
        else:
            return render_template('login.html')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_code', None)
    session.pop('user_id', None)
    session.pop('user_name', None)
    return redirect(url_for('index'))

@app.route('/join', methods=['GET', 'POST'])
def join():
    if request.method == 'POST':
        # TODO: 중복 확인 필요
        user_form = request.form
        user_code = user_form.get('user-code')
        user_password = user_form.get('user-password')
        user_name = user_form.get('user-name')
        user_email = user_form.get('user-email')
        user_is_student = user_form.get('user-is-student')
        is_student = True if user_is_student == '1' else False
        if is_student:
            user_major = int(user_form.get('user-major'))
            user_grade = int(user_form.get('user-grade'))
            db_init.create_user(user_code, user_password, user_name, user_email, user_major, user_grade)
        else:
            db_init.create_user(user_code, user_password, user_name, user_email)
        session['user_code'] = user_code
        # TODO: Login 바로 하기
        return redirect('/login')
    return render_template('join.html')

"""
아나바다
"""
@app.route("/products", methods=['GET'])
def products():
    is_login = is_check_login()
    categories = db_init.get_product_categories()
    products = db_init.get_products()
    products_data = [[] for _ in range(len(products))]
    for idx in range(len(products)):
        products_data[idx].extend(products[idx][:4])
        products_data[idx].append(format(products[idx][4], ',d'))
        products_data[idx].append(products[idx][5])
        time_value = datetime.datetime.now() - products[idx][6]
        # TODO: 삼항연산자로 한줄로 해결할 수 있음 - product에서는 처리해놓음
        if time_value.days > 0:
            products_data[idx].append(f'{time_value.days}일전')
        else:
            products_data[idx].append(f'{round(time_value.seconds / 3600)}시간 전')
    return render_template('product/products.html', is_login=is_login, categories=categories, products=products_data)

@app.route("/product", methods=['GET', 'POST'])
def product_create():
    is_login = is_check_login()
    if request.method == 'POST':
        user_id = session.get('user_id')
        product_imgs = request.files.getlist('file')
        img_list = []
        if product_imgs[0].filename:
            for img in product_imgs:
                result = _imgur_send_request(img)
                img_list.append(result)
        product_form = request.form
        product_category = product_form.get('product-category')
        product_name = product_form.get('product-name')
        product_content = product_form.get('product-content')
        product_price = int(product_form.get('product-price').replace(',', ''))
        product_data = {
            'category': product_category,
            'title': product_name,
            'content': product_content,
            'price': product_price,
        }
        db_init.set_product(user_id, product_data, img_list)
        return redirect('/products')
    categories = db_init.get_product_categories()
    return render_template('product/product_create.html', is_login=is_login, categories=categories)

@app.route("/product/<product_id>", methods=['GET', 'UPDATE', 'DELETE'])
def product(product_id):
    is_login = is_check_login()
    user_id = session.get('user_id')
    data = db_init.get_product(product_id)
    if data[2] != user_id and user_id:
        db_init.set_product_view(product_id, user_id)
    process_data = {}
    if data:
        time_value = datetime.datetime.now() - data[14]
        time_flow = f'{time_value.days}일전' if time_value.days > 0 else f'{round(time_value.seconds / 3600)}시간 전'
        process_data = {
            'id': data[0],
            'category': data[1],
            'user-id': data[2],
            'user-name': data[3],
            'title': data[4],
            'content': data[5],
            'price': format(data[6], ',d'),
            'status': data[7],
            'cnt': data[8],
            'imgs': [data[9], data[10], data[11], data[12], data[13]],
            'created_at': time_flow,
            'view': data[15],
        }
    if request.method == 'UPDATE':
        pass
    elif request.method == 'DELETE':
        pass
    return render_template('product/product.html', is_login=is_login, data=process_data)

"""
교내버스
"""
@app.route("/bus", methods=['GET', 'POST', 'DELETE'])
def bus():
    user_id = session.get('user_id')
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        data = json.loads(data)
        chair_number = data.get('seat')
        db_init.set_bus_reservation(user_id, chair_number)
        return jsonify({'result': True})
    elif request.method == 'DELETE':
        db_init.delete_bus_reservation(user_id)
        return jsonify({'result': True})
    is_login = is_check_login()
    is_reservation = False
    if user_id:
        is_reservation = is_check_reservation(user_id)
    return render_template('bus.html', is_login=is_login, is_reservation=is_reservation)

@app.route("/get_bus_status/<bus_num>/<bus_time>", methods=['POST'])
def get_bus_status(bus_num='A-1', bus_time='17:30:00'):
    datas = db_init.get_buses()
    return jsonify(datas)

@app.route("/place", methods=['GET', 'POST'])
def place():
    is_login = is_check_login()
    if request.method == 'POST':
        pass
    return render_template('place.html', is_login=is_login)
    
@app.route("/site/terms", methods=['GET'])
def terms():
    return render_template('site/terms.html')

@app.route("/site/privacy", methods=['GET'])
def privacy():
    return render_template('site/privacy.html')

@app.route("/site/security", methods=['GET'])
def security():
    return render_template('site/security.html')

if __name__ == '__main__':
    app.run(host="localhost", debug=True)