from rest_framework import serializers
from .models import List
from cards import models as Card_model
from boards import models as Board_model

# ListsListSerializer
class ListsListSerializer(serializers.ModelSerializer):
  id = serializers.CharField(source='string_id', allow_blank=True)

  class Meta:
    model = List
    fields = ['id', 'title']

# ListOrder Serializer
class ListsOrderSerializer(serializers.ModelSerializer):

  class Meta:
    model = List
    fields = ['string_id']

# CardSerializer
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card_model.Card
        fields = ['task', 'string_id', 'order_num']

# ListSerializer
class ListSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='string_id', allow_blank=True)
    cards = serializers.StringRelatedField(many=True)

    class Meta:
        model = List
        fields = ['id', 'title', 'board', 'cards', 'pk']

    def get_cards(self, instance):
      cards_in_list = instance.cards.all().order_by('order_num')
      return CardSerializer(cards_in_list, many=True).data

    """ def create(self, validated_data):
        boardId = validated_data.pop('boardId')
        board_instance, created = Board_model.Board.objects.get_or_create(string_id = boardId)
        list_instance = List.objects.create(**validated_data, board=board_instance)
        return list_instance """


#Reorder Lists
class ListsReorderingSerializer(serializers.Serializer):
    reorderedLists = serializers.ListField()
    startIndex = serializers.IntegerField()