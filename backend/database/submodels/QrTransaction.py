from django.db import models

class QrTransaction(models.Model):
    r_public_address = models.CharField(max_length=1000, null=True, blank=True)
    r_short_name = models.CharField(max_length=1000, null=True, blank=True)
    amount = models.IntegerField(null=True, blank=True)