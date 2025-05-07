from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import re

app = Flask(__name__)
CORS(app)




MYSQL_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Subhi@2911'
}

DATABASE_NAME = 'bus_app'

def sanitize_table_name(name):
    return re.sub(r'\W+', '_', name)

# Connect to MySQL server (no DB yet)
def connect_server():
    return mysql.connector.connect(
        host=MYSQL_CONFIG['host'],
        user=MYSQL_CONFIG['user'],
        password=MYSQL_CONFIG['password']
    )

# Connect to specific DB (after it's created)
def connect_db():
    return mysql.connector.connect(
        host=MYSQL_CONFIG['host'],
        user=MYSQL_CONFIG['user'],
        password=MYSQL_CONFIG['password'],
        database=DATABASE_NAME
    )

# Ensure the database exists
def ensure_database():
    conn = connect_server()
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}")
    conn.commit()
    cursor.close()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    route = data.get('route')
    name = data.get('name')

    if not route or not name:
        return jsonify({'error': 'Missing data'}), 400

    table_name = sanitize_table_name(route)

    try:
        ensure_database()
        conn = connect_db()
        cursor = conn.cursor()

        # Create table if not exists
        cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS `{table_name}` (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255)
            )
        ''')

        # Insert name
        cursor.execute(f'INSERT INTO `{table_name}` (name) VALUES (%s)', (name,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': f'Data saved to route `{table_name}`'}), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
