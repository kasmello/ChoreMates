from rest_framework import serializers
from .models import Household, ChoreMatesUser, CompleteChores, Chore

# Household Serializer
class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = ['id', 'name', 'description', 'code']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoreMatesUser
        fields = ['id', 'name', 'household']

# Chore Serializer
class ChoreRawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = ['id', 'household', 'completedBy', 'choreName', 'timeReset', 'description']

class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompleteChores
        fields = ['id', 'choreName', 'timeReset', 'description', 'household', 'user']
