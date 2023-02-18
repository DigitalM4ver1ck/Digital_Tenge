from rest_framework import serializers

from database.submodels.UserWallet import UserWallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWallet
        fields = ['id','public_address', 'view_key','spend_key', 'phone_number', 'client_type']