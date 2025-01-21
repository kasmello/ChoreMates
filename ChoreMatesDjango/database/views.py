from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Household, Chore, ChoreMatesUser
from .serializers import HouseholdSerializer, ChoreSerializer, ChoreMatesUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
import random

class HouseholdViewSet(viewsets.ModelViewSet):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer
    filterset_fields = ['code']

    def generate_unique_code(self):
        """Generates a unique 6-digit code."""
        while True:
            code = str(random.randint(100000, 999999))  # Generate a 6-digit code
            if not Household.objects.filter(code=code).exists():
                return code

    def perform_create(self, serializer):
        """Override perform_create to assign a unique 6-digit code to the household."""
        unique_code = self.generate_unique_code()
        serializer.save(code=unique_code)  # Save with the generated unique code

class ChoreViewSet(viewsets.ModelViewSet):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    filterset_fields = ['household']

class ChoreMatesUserViewSet(viewsets.ModelViewSet):
    queryset = ChoreMatesUser.objects.all()
    serializer_class = ChoreMatesUserSerializer






