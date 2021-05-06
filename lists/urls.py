from django.urls import path
from rest_framework import routers
from . import views 

app_name = "list_api"

router = routers.DefaultRouter()
router.register(r'lists', views.ListViewSet, 'lists')
router.register(r'listsOrder', views.ListsOrderViewSet, 'listsOrder')
urlpatterns = router.urls