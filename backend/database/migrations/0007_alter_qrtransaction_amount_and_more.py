# Generated by Django 4.0.3 on 2022-10-04 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0006_qrtransaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qrtransaction',
            name='amount',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='qrtransaction',
            name='r_public_address',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='qrtransaction',
            name='r_short_name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
