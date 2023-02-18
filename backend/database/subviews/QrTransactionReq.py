from database.serializers import QrTransactionCreate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class QrTransactionReq(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = {}
        serializer = QrTransactionCreate(data=request.data)
        if serializer.is_valid():
            qr_trans = serializer.save()
        else:
            data['errors'] = serializer.errors
        return Response(qr_trans.id)