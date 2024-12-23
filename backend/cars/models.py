from django.contrib.auth.models import AbstractUser
from django.db import models


class Driver(AbstractUser):
    license_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.username


class Car(models.Model):
    owner = models.ForeignKey(
        Driver,
        related_name='cars',
        on_delete=models.CASCADE
    )
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=16)

    def __str__(self):
        return f'{self.make} {self.model}'
