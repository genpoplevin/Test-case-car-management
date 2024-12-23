from http import HTTPStatus

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from django.urls import reverse

from cars.models import Car

User = get_user_model()


class TestRoutes(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            license_number=456
        )
        response = self.client.post(
            '/api/token/',
            {
                'username': 'testuser',
                'password': 'testpassword'
            }
        )
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.car = Car.objects.create(
            owner=self.user,
            make='Toyota',
            model='Corolla',
            year=2022,
            color='Blue'
        )

    def test_pages_availibility_for_authenticated_user(self):
        """
        Проверка, что страница профиля, страница со списком автомобилей доступны
        авторизованному пользователю.
        """
        urls = (
            '/api/cars/',
            '/api/profile/'
        )
        for name in urls:
            with self.subTest(name=name):
                url = name
                response = self.client.get(url)
                self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_create_car(self):
        """
        Проверка, что авторизованный пользователь может создать новый 
        автомобиль на своей странице.
        """
        data = {
            'make': 'Honda',
            'model': 'Civic',
            'year': 2021,
            'color': 'Red'
        }
        response = self.client.post('/api/cars/', data)
        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        self.assertEqual(Car.objects.count(), 2)
        self.assertEqual(Car.objects.last().make, 'Honda')

    def test_update_car(self):
        """
        Проверка, что авторизованный пользователь может изменить данные 
        автомобиля на своей странице.
        """
        data = {
            'make': 'Toyota',
            'model': 'Camry',
            'year': 2020,
            'color': 'White'
        }
        response = self.client.put(f'/api/cars/{self.car.id}/', data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.car.refresh_from_db()
        self.assertEqual(self.car.model, 'Camry')
        self.assertEqual(self.car.color, 'White')

    def test_delete_car(self):
        """
        Проверка, что авторизованный пользователь может удалить 
        автомобиль на своей странице.
        """
        response = self.client.delete(f'/api/cars/{self.car.id}/')
        self.assertEqual(response.status_code, HTTPStatus.NO_CONTENT)
        self.assertEqual(Car.objects.count(), 0)

    def test_unauthenticated_access(self):
        """
        Проверка, что неавторизованный пользователь не имеет доступа к списку 
        автомобилей.
        """
        self.client.credentials()
        response = self.client.get('/api/cars/')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
