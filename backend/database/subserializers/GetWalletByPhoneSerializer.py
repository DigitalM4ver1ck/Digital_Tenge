from rest_framework import serializers

class GetWalletByPhoneSerializer(serializers.Serializer):
    phone_number = serializers.CharField()