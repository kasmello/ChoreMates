from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HouseholdViewSet, UserViewSet, ChoreViewSet

router = DefaultRouter()
router.register(r'households', HouseholdViewSet)
router.register(r'users', UserViewSet)
router.register(r'chores', ChoreViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
