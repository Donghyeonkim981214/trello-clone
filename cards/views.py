from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Card
from boards import models as Board_model
from lists import models as List_model
from .serializers import CardSerializer, CardsListSerializer, CardsReorderingSerializer, CardMoveSerializer
from rest_framework.decorators import action

from rest_framework import viewsets, permissions

class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CardSerializer

    def get_queryset(self):
        return self.request.user.cards.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['get'], detail=True, url_path='get-cards', url_name='get_cards')
    def get_cards(self, request, pk):
        cards = self.get_queryset().filter(board__string_id = pk)
        serializer = CardSerializer(cards, many=True)
        return Response({card['id']: card for card in serializer.data})

    def create(self, request, *args, **kwargs):
        boardId = request.data.pop('boardId')
        board = Board_model.Board.objects.get(string_id=boardId)
        request.data['board'] = board.id

        listId = request.data.pop('listId')
        list = List_model.List.objects.get(string_id=listId)
        request.data['list'] = list.id

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"newCard": {serializer.data['id']: serializer.data}, "id": serializer.data['id'], "listId": listId})
        else:
            print(serializer.errors)

    def partial_update(self, request, pk=None):
        edit_card = Card.objects.get(pk = pk)
        edit_type = request.data.pop('type')
        if(edit_type == "task"):
            edit_card.task = request.data.pop('task')                
            edit_card.save()
        serializer = self.get_serializer(edit_card, data=request.data, partial=True)
        if serializer.is_valid():
            return Response({"editedCard": {serializer.data['id']: serializer.data}, "id": serializer.data['id']})
        else:
            print(serializer.errors)
            return Response("error!")

    def destroy(self, request, pk, format=None):
        print(pk)
        deleted_card = self.get_queryset().get(pk = pk)
        ListCards = List_model.List.objects.get(pk = deleted_card.list.pk).cards.all()
        deleted_index = deleted_card.order_num
        for index in range(deleted_index, len(ListCards)):
            ListCards[index].order_num -= 1
            ListCards[index].save()
        cardId = deleted_card.string_id
        listId = deleted_card.list.string_id
        print(cardId)
        self.perform_destroy(deleted_card)
        return Response({"cardId": cardId, "listId": listId})

    @action(methods=['post'], detail=False, url_path='reorder-cards', url_name='reorder_cards')
    def reorder_cards(self, request):
        serializer = CardsReorderingSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.data['type'] == "in_list":
                reorderedCards = serializer.data.get('reorderedCards')
                startIndex = serializer.data.get('startIndex')
                for reorderedCardId in reorderedCards:
                    BdCard = Card.objects.get(string_id = reorderedCardId)
                    BdCard.order_num = startIndex
                    BdCard.save()
                    startIndex += 1
                return Response('Cards succsesfully reorderd!')
        else:
            print(serializer.errors)
            return Response('error!')
    
    @action(methods=['post'], detail=False, url_path='move-card', url_name='move_card')
    def move_card(self, request):
        serializer = CardMoveSerializer(data=request.data)
        if serializer.is_valid():
            #moved card
            card = self.get_queryset().get(pk = serializer.data['draggableId'])
            startListCards = List_model.List.objects.get(pk = serializer.data['droppableIdStart']).cards.all()
            startIndex = serializer.data.get('droppableIndexStart')
            endListCards = List_model.List.objects.get(pk = serializer.data['droppableIdEnd']).cards.all()
            endIndex = serializer.data.get('droppableIndexEnd')

            for index in range(endIndex, len(endListCards)):
                endListCards[index].order_num = index + 2
                endListCards[index].save()
            card.list = List_model.List.objects.get(pk = serializer.data['droppableIdEnd'])
            card.order_num = endIndex+1
            card.save()

            for index in range(startIndex + 1, len(startListCards)):
                startListCards[index].order_num -= 1
                startListCards[index].save()
            return Response('Cards succsesfully reorderd!')
        else:
            print(serializer.errors)
            return Response('error!')
 