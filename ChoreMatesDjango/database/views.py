from rest_framework import viewsets
from .models import Household, ChoreMatesUser, CompleteChores
from .serializers import HouseholdSerializer, UserSerializer, ChoreSerializer

# Household Viewset
class HouseholdViewSet(viewsets.ModelViewSet):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer

# User Viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = ChoreMatesUser.objects.all()
    serializer_class = UserSerializer

# Chore Viewset
class ChoreViewSet(viewsets.ModelViewSet):
    queryset = CompleteChores.objects.all()
    serializer_class = ChoreSerializer
