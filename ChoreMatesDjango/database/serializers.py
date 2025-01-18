from rest_framework import serializers
from .models import Household, ChoreMatesUser, Chore

class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = '__all__'  # Expose all fields

class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = '__all__'

class ChoreMatesUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoreMatesUser
        fields = '__all__'
      
