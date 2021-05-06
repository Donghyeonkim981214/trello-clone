from django.urls import path
from rest_framework import routers
from . import views 

app_name = "board_api"

urlpatterns = [
#   path('list/', views.BoardList),
]

router = routers.DefaultRouter()
router.register(r'boards', views.BoardViewSet, 'boards')
router.register(r'boardsOrder', views.BoardsOrderViewSet, 'boardsOrder')
urlpatterns += router.urls