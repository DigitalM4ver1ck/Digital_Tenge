from rest_framework import serializers

class TransferSerializer(serializers.Serializer):
   s_public_address= serializers.CharField()
   s_node_id= serializers.CharField()
   s_signature= serializers.CharField()
   r_public_address= serializers.CharField()
   r_node_id= serializers.CharField()
   amount = serializers.IntegerField()
   type = serializers.CharField()
   note = serializers.CharField()