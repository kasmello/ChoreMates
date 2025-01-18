from django.contrib import admin
from .models import Household, ChoreMatesUser, Chore

# Register the Household model
@admin.register(Household)
class HouseholdAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'code')
    search_fields = ('name', 'code')


# Register the ChoreMatesUser model
@admin.register(ChoreMatesUser)
class ChoreMatesUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'household')
    search_fields = ('username',)
    list_filter = ('household',)


# Register the Chore model
@admin.register(Chore)
class ChoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'choreName', 'household', 'completedBy', 'timeReset')
    search_fields = ('choreName',)
    list_filter = ('household', 'completedBy')
