from django.contrib import admin
from .models import Household, User, Chore

@admin.register(Household)
class HouseholdAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'code')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'household')


@admin.register(Chore)
class ChoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'household', 'completedBy', 'choreName', 'timeReset')
