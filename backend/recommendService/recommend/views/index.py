from flask import Blueprint
from flask_restful import fields, marshal_with, Resource, Api

from recommend.models import Test_table, Test_table_2

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
    @marshal_with(table_1_fields)
    def get(self):
        tables = Test_table.query.get(1)
        tables.test_table_2 = tables.test_table_2_set
        print(tables.test_table_2)

        return tables

api.add_resource(Test_list, '/')

# class Test_2_list(Resource):
    