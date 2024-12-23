from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Car, Driver
from .serializers import CarSerializer, DriverSerializer


class CarViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Car.objects.filter(owner=self.request.user)


class DriverViewSet(ModelViewSet):
    queryset = Driver.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DriverSerializer
