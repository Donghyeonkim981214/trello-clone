from django.urls import path
from rest_framework import routers
from . import views 

app_name = "card_api"

router = routers.DefaultRouter()
router.register(r'cards', views.CardViewSet, 'cards')
urlpatterns = router.urls