from rest_framework import serializers
from .models import Household, User, Chore

# Household Serializer
class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = ['id', 'name', 'description', 'code']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'household']

# Chore Serializer
class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ['id', 'household', 'completedBy', 'choreName', 'timeReset']
