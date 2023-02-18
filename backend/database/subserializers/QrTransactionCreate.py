from rest_framework import serializers

from database.models import QrTransaction

class QrTransactionCreate(serializers.ModelSerializer):
    class Meta:
        model = QrTransaction
        fields = ['id','r_public_address', 'r_short_name','amount']