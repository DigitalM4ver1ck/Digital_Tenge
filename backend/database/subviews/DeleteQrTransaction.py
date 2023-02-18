from database.serializers import QrTransactionCreate
from database.models import QrTransaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework import status

@permission_classes((permissions.AllowAny,))
class DeleteQrTransaction(APIView):
     def delete(self, request, pk):
        qr = QrTransaction.objects.get(pk=pk)
        qr.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)