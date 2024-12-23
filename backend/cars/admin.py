from django.contrib import admin
from cars.models import Car, Driver


class CarAdmin(admin.ModelAdmin):
    pass


class DriverAdmin(admin.ModelAdmin):
    pass


admin.site.register(Car, CarAdmin)
admin.site.register(Driver, DriverAdmin)
