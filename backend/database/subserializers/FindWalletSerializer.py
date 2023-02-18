from rest_framework import serializers

class FindWalletSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    node_id = serializers.CharField()