from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder='static')
CORS(app)

DB_PATH = 'database.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # 用户表
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')
    # 历史记录表
    c.execute('''CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT,
        food REAL,
        travel REAL,
        utility REAL,
        total REAL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )''')
    conn.commit()
    conn.close()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'success': False, 'msg': '用户名和密码不能为空'})
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    try:
        c.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        return jsonify({'success': True})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'msg': '用户名已存在'})
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE username=? AND password=?', (username, password))
    user = c.fetchone()
    conn.close()
    if user:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'msg': '用户名或密码错误'})

@app.route('/api/history', methods=['POST'])
def save_history():
    data = request.json
    username = data.get('username')
    date = data.get('date')
    food = data.get('food')
    travel = data.get('travel')
    utility = data.get('utility')
    total = data.get('total')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # 获取用户ID
    c.execute('SELECT id FROM users WHERE username=?', (username,))
    user = c.fetchone()
    if not user:
        conn.close()
        return jsonify({'success': False, 'msg': '用户不存在'})
    user_id = user[0]
    c.execute('INSERT INTO history (user_id, date, food, travel, utility, total) VALUES (?, ?, ?, ?, ?, ?)',
              (user_id, date, food, travel, utility, total))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/history', methods=['GET'])
def get_history():
    username = request.args.get('username')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT id FROM users WHERE username=?', (username,))
    user = c.fetchone()
    if not user:
        conn.close()
        return jsonify({'success': False, 'msg': '用户不存在'})
    user_id = user[0]
    c.execute('SELECT date, food, travel, utility, total FROM history WHERE user_id=? ORDER BY id DESC', (user_id,))
    rows = c.fetchall()
    conn.close()
    history = [{'date': r[0], 'food': r[1], 'travel': r[2], 'utility': r[3], 'total': r[4]} for r in rows]
    return jsonify({'success': True, 'history': history})

# 静态文件服务（开发用，生产建议用nginx等）
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)