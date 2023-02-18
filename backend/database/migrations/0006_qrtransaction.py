# Generated by Django 4.0.3 on 2022-10-04 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0005_userwallet_spend_key'),
    ]

    operations = [
        migrations.CreateModel(
            name='QrTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('r_public_address', models.CharField(max_length=1000)),
                ('r_short_name', models.CharField(max_length=1000)),
                ('amount', models.IntegerField()),
            ],
        ),
    ]
