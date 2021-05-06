from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import List
from boards import models as Board_model
from .serializers import ListsReorderingSerializer, ListSerializer, ListsListSerializer, ListsOrderSerializer
from rest_framework.decorators import action


# Create your views here.

from rest_framework import viewsets, permissions

class ListViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ListSerializer
    def get_queryset(self):
        return self.request.user.lists.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['get'], detail=True, url_path='get-lists', url_name='get_lists')
    def get_lists(self, request, pk):
        lists = self.get_queryset().filter(board__string_id = pk)
        print(lists)
        serializer = ListSerializer(lists, many=True)
        return Response({a_list['id']: a_list for a_list in serializer.data})

    @action(methods=['post'], detail=False, url_path='reorder-lists', url_name='reorder_lists')
    def reorder_lists(self, request):
        serializer = ListsReorderingSerializer(data=request.data)
        if serializer.is_valid():
            reorderedLists = serializer.data.get('reorderedLists')
            startIndex = serializer.data.get('startIndex')
            for reorderedListId in reorderedLists:
                BdList = List.objects.get(string_id = reorderedListId)
                BdList.order_num = startIndex
                BdList.save()
                startIndex += 1
            return Response('List succsesfully reorderd!')
        print("error")
        return Response('error!')
    
    def partial_update(self, request, pk=None):
        edit_list = List.objects.get(pk = pk)
        edit_type = request.data.pop('type')
        serializer = self.get_serializer(edit_list, data=request.data, partial=True)
        if serializer.is_valid():
            if(edit_type == "title"):
                print(serializer.data)
                edit_list.title = request.data.pop('title')
                edit_list.save()
            return Response({"editedList": {serializer.data['id']: serializer.data}, "id": serializer.data['id']})
        else:
            print(serializer.errors)
            return Response("error!")

    def create(self, request, *args, **kwargs):
        boardId = request.data.pop('boardId')
        board = Board_model.Board.objects.get(string_id=boardId)
        request.data['board'] = board.id
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            return Response({"newList": {serializer.data['id']: serializer.data}, "id": serializer.data['id']})
        else:
            print("error")

    def destroy(self, request, pk, format=None):
        deleted_list = List.objects.get(pk = pk)
        listId = deleted_list.string_id
        self.perform_destroy(deleted_list)
        return Response(listId)

class ListsOrderViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ListsOrderSerializer
    ordering = ('order_num')

    def get_queryset(self):
        return self.request.user.lists.all()
    
    def retrieve(self, request, pk=None):
        lists = self.get_queryset().filter(board__string_id = pk).order_by('order_num')
        serializer = ListsOrderSerializer(lists, many=True)
        return Response([list['string_id'] for list in serializer.data])