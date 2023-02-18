from database.serializers import GetBalanceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import requests
import json

from django.conf import settings


API_KEY = getattr(settings, "API_KEY", None)
API_URL = getattr(settings, "API_URL", None)
class GetTransactions(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        r_data = json.loads(request.body.decode('utf-8'))
        serializer = GetBalanceSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            r = requests.post(API_URL + "/api/v1/users/transactions", json={'sort_by' : "transaction_time", 'sort_order': "desc", 'limit': 10, 'offset': 0, 'public_address': r_data['public_address']}, headers={"api_key": API_KEY})
        else:
            data['errors'] = serializer.errors
        return Response(r.json(), status=r.status_code)