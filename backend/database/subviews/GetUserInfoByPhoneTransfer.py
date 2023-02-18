from database.serializers import FindWalletSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import requests
import json

from django.conf import settings


API_KEY = getattr(settings, "API_KEY", None)
ID_CENTER_URL = getattr(settings, "ID_CENTER_URL", None)
class GetUserInfoByPhoneTransfer(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer = FindWalletSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            r = requests.post(ID_CENTER_URL + "/api/v1/idcenter/infobyphone", json=request.data, headers={"api_key": API_KEY})
        else:
            data['errors'] = serializer.errors
        return Response(r.json(), status=r.status_code)