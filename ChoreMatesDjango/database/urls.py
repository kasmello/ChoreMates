from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HouseholdViewSet, ChoreMatesUserViewSet, ChoreViewSet

router = DefaultRouter()
router.register(r'households', HouseholdViewSet)
router.register(r'chores', ChoreViewSet)
router.register(r'users', ChoreMatesUserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]