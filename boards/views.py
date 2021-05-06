from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Board
from .serializers import BoardsListSerializer, BoardOrderSerializer, BoardSerializer
from rest_framework.decorators import action


from rest_framework.decorators import api_view

# Create your views here.

from rest_framework import viewsets, permissions

class BoardViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BoardSerializer

    def get_queryset(self):
        return self.request.user.boards.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = BoardsListSerializer(queryset, many=True)
        return Response({board['id']: board for board in serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            return Response({"newBoard": {serializer.data['id']: serializer.data}, "id": serializer.data['id']})
        else:
            print(serializer.errors)
            return Response(serializer.errors)

    @action(methods=['get'], detail=True, url_path='get-board', url_name='get_board')
    def get_board(self, request, pk=None):
        board = Board.objects.get(string_id = pk)
        serializer = BoardSerializer(board, many=False)
        return Response(serializer.data)

class BoardsOrderViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BoardOrderSerializer
    
    def get_queryset(self):
        return self.request.user.boards.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = BoardOrderSerializer(queryset, many=True)
        return Response([board['string_id'] for board in serializer.data])