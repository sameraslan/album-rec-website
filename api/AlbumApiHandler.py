from flask_restful import Api, Resource, reqparse
from Backend.Recommender import RecommendationAlg
import json

class AlbumApiHandler(Resource):
  def get(self, title, artist):
    recommended = RecommendationAlg.main(title.lower(), artist.lower())

    return {
      'resultStatus': 'SUCCESS',
      'albums': json.dumps(recommended),
      }

  # I can call post with the album title then return the titles of the albums that are most similar
  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    # parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()

    print("HI", args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_json = args['message']

    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    # ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret