# Generated by Django 3.2.25 on 2024-12-21 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='color',
            field=models.CharField(default=1, max_length=16),
            preserve_default=False,
        ),
    ]
