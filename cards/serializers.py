from rest_framework import serializers
from .models import Card

# CardsListSerializer
class CardsListSerializer(serializers.ModelSerializer):
  id = serializers.CharField(source='string_id', allow_blank=True)

  class Meta:
    model = Card
    fields = ['id', 'task']

# CardSerializer
class CardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='string_id', allow_blank=True)

    class Meta:
        model = Card
        fields = ['task', 'id', 'board', 'list', 'order_num']

#Reorder Lists
class CardsReorderingSerializer(serializers.Serializer):
    reorderedCards = serializers.ListField()
    startIndex = serializers.IntegerField()
    type = serializers.CharField()

class CardMoveSerializer(serializers.Serializer):
    droppableIdStart = serializers.IntegerField()
    droppableIdEnd = serializers.IntegerField()
    droppableIndexStart = serializers.IntegerField()
    droppableIndexEnd = serializers.IntegerField()
    draggableId = serializers.IntegerField()