from database.serializers import QrTransactionCreate
from database.models import QrTransaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import permissions
from rest_framework.decorators import permission_classes


@permission_classes((permissions.AllowAny,))
class GetQrTransaction(APIView):
    def get(self, request, pk):
        queryset = QrTransaction.objects.get(id = pk)
        serializer = QrTransactionCreate(queryset)
        return Response(serializer.data)
