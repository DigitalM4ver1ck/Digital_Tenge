from django.db import models

class UserWallet(models.Model):
    public_address = models.CharField(max_length=1000)
    view_key = models.CharField(max_length=1000)
    spend_key = models.CharField(max_length=1000, null=True)
    phone_number = models.CharField(max_length=1000, null=True)
    client_type = models.CharField(max_length=1000, null=True)
    tsp_name = models.CharField(max_length=1000, null=True)