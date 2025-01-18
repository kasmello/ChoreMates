from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Household, Chore, ChoreMatesUser
from .serializers import HouseholdSerializer, ChoreSerializer, ChoreMatesUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend

class HouseholdViewSet(viewsets.ModelViewSet):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['name', 'description', 'code']  # Fields that can be searched
    ordering_fields = '__all__'  # Allows ordering by any field in the model
    ordering = ['name']  # Default ordering if no ordering is specified

class ChoreViewSet(viewsets.ModelViewSet):
    queryset = CompleteChores.objects.all()
    serializer_class = ChoreSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['choreName', 'description', 'household__name']  # Fields to search on
    ordering_fields = '__all__'
    ordering = ['choreName']

class ChoreMatesUserViewSet(viewsets.ModelViewSet):
    queryset = ChoreMatesUser.objects.all()
    serializer_class = ChoreMatesUserSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['username', 'password', 'is_staff']  # Fields to search on
    ordering_fields = '__all__'
    ordering = ['username']

'''
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = ChoreMatesUserSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the new user
            user = serializer.save()
            
            # Create an authentication token for the user
            token, created = Token.objects.get_or_create(user=user)

            # Send back the user data along with the token
            response_data = {
                'user': serializer.data,
                'token': token.key
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''


