from database.serializers import WalletSerializer, GetWalletByPhoneSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from database.models import UserWallet
import json

from django.conf import settings


API_KEY = getattr(settings, "API_KEY", None)
API_URL = getattr(settings, "API_URL", None)

class findWalletByPhoneNumber(APIView):
    def post(self,request):
        r_data = json.loads(request.body.decode('utf-8'))
        serializer = GetWalletByPhoneSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            queryset = UserWallet.objects.get(phone_number=r_data['phone_number'])
            w_serializer = WalletSerializer(queryset)
        else:
            data['errors'] = serializer.errors
        
        return Response(w_serializer.data)