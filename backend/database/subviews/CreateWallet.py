
from pickle import NONE
from database.serializers import WalletSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from database.models import UserWallet
import requests
import json

from database.submodels.UserModel import User
from rest_framework import status

from django.conf import settings

API_KEY = getattr(settings, "API_KEY", None)
API_URL = getattr(settings, "API_URL", None)
NODE_ID = getattr(settings, "NODE_ID", None)
ID_CENTER_URL = getattr(settings, "ID_CENTER_URL", None)

class createWallet(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        r_data = json.loads(request.body.decode('utf-8'))
        serializer = WalletSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            r_create_wallet = requests.post(API_URL + "/api/v1/users/keys", json={'public_address' : r_data['public_address'], 'view_key' : r_data['view_key'], 'client_type' : r_data['client_type']}, headers={"api_key": API_KEY})
            if(r_create_wallet.status_code == 200):
                user_wallet = UserWallet(public_address = r_data['public_address'], view_key = r_data['view_key'],spend_key = r_data['spend_key'], phone_number = r_data['phone_number'], client_type = r_data['client_type'])
                user_wallet.save()
                user = User.objects.get(phone_number=r_data['phone_number'])
                r_id_center = requests.post(ID_CENTER_URL + "/api/v1/idcenter/info", json={'node_id' : NODE_ID, 'display_name':{"en": "Eurasian Bank", "kz": "Еуразиялық Банкі", "ru": "Евразийский банк"} , 'public_address' : r_data['public_address'], 'short_name' : user.username, 'full_name' : user.username ,'phone_number' : r_data['phone_number'], 'client_type': r_data['client_type']}, 
                headers={"api_key": API_KEY})
                if(r_id_center.status_code == 200):
                   return Response("Create wallet was succesfull", status=r_id_center.status_code)
                else:
                   return Response("Wallet was created, but exception in idcenter", status=r_id_center.status_code)
            else:
                return Response("Exception in create wallet", status=r_create_wallet.status_code)
        else:
            data['errors'] = serializer.errors
            return Response("Serializer error", status=status.HTTP_400_BAD_REQUEST)


