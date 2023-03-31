from flask import Blueprint, Response, json
from flask_restful import fields, Resource, Api

from recommend.models import Test_table, Test_table_2
from recommend import db

bp = Blueprint('main', __name__, url_prefix='/bp1')

api = Api(bp)

table_2_fields = {
    'id' : fields.Integer,
    'content' : fields.String, 
}

table_1_fields = {
    'id': fields.Integer,
    'content' : fields.String,
    'test_table_2' : fields.Nested(table_2_fields)
}

class Test_list(Resource):
    def get(self):
        
        table = Test_table.query.get(16)
        table.test_table_2 = table.test_table_2_set
        
        result = {
            'id' : table.id,
            'content' : table.content,
            'test_table_2' : [{'id': c.id, 'content': c.content} for c in table.test_table_2]
        }
        
        response = Response(json.dumps(result, ensure_ascii=False), content_type='application/json; charset=utf-8', status=200)
        return response

api.add_resource(Test_list, '/')

# class Test_2_list(Resource):
    