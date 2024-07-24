from flask import request, jsonify, current_app as app
from .models import TestCase
from . import db

@app.route('/testcases', methods=['GET', 'POST'])
def manage_testcases():
    if request.method == 'GET':
        testcases = TestCase.query.all()
        return jsonify([{'id': tc.id, 'name': tc.name, 'description': tc.description} for tc in testcases])
    
    if request.method == 'POST':
        data = request.json
        new_testcase = TestCase(name=data['name'], description=data.get('description'))
        db.session.add(new_testcase)
        db.session.commit()
        return jsonify({'message': 'Test case created'}), 201
