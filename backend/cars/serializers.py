from rest_framework import serializers

import datetime as dt

from .models import Driver, Car


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ['id', 'username', 'email', 'license_number', 'cars']


class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'color', 'owner']
        read_only_fields = ['owner']

    def validate_year(self, value):
        year = dt.date.today().year
        if not (year - 40 < value <= year):
            raise serializers.ValidationError('Проверьте год выпуска авто!')
        return value
