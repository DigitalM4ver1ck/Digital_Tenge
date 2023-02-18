from rest_framework import serializers

class GetBalanceSerializer(serializers.Serializer):
    public_address = serializers.CharField()