from database.serializers import GetBalanceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import requests
import json

from django.conf import settings


API_KEY = getattr(settings, "API_KEY", None)
API_URL = getattr(settings, "API_URL", None)

class getBalance(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer = GetBalanceSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            r = requests.post(API_URL + "/api/v1/users/tokens", json=request.data, headers={"api_key": API_KEY})
        else:
            data['errors'] = serializer.errors
        return Response(r.json(), status=r.status_code)