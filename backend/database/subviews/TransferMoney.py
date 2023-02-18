from rest_framework.views import APIView
from rest_framework.response import Response
from database.serializers import TransferSerializer
import requests
from rest_framework import status
import json

from django.conf import settings


API_KEY = getattr(settings, "API_KEY", None)
API_URL = getattr(settings, "API_URL", None)
NODE_ID = getattr(settings, "NODE_ID", None)

class TransferMoney(APIView):
    def post(self, request):
        r_data = json.loads(request.body.decode('utf-8'))
        r = requests.post(API_URL + "/api/v1/transaction", json={'sender': {'is_anonymous': False, 'public_address': r_data['s_public_address'], 'node_id': r_data['s_node_id'], 'signature': r_data['s_signature']},'receiver' : {'public_address' : r_data['r_public_address'], 'node_id': r_data['r_node_id']},'amount': r_data['amount'],'type': r_data['type'],'note': r_data['note']}, headers={"api_key": API_KEY})
        return Response(r.json(), status=r.status_code)
       