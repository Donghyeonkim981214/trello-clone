from rest_framework import serializers
from .models import Board
from lists import models as List_model
from cards import models as Card_model

# BoardListSerializer
class BoardsListSerializer(serializers.ModelSerializer):
  id = serializers.CharField(source='string_id', allow_blank=True)

  class Meta:
    model = Board
    fields = ['id', 'title']

# BoardOrder Serializer
class BoardOrderSerializer(serializers.ModelSerializer):

  class Meta:
    model = Board
    fields = ['string_id']

""" # CardSerializer
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card_model.Card
        fields = ['task', 'string_id', 'order_num']

# ListSerializer
class ListSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True)

    class Meta:
        model = List_model.List
        fields = ['title', 'string_id', 'order_num', 'cards']

# BoardSerializer
class BoardSerializer(serializers.ModelSerializer):
  id = serializers.CharField(source='string_id', allow_blank=True)
  lists = serializers.SerializerMethodField()

  class Meta:
    model = Board
    fields = ['id', 'title', 'lists']

  def get_lists(self, instance):
      lists_in_board = instance.lists.all().order_by('order_num')
      return ListSerializer(lists_in_board, many=True).data

  def to_representation(self, instance):
      representation = super().to_representation(instance)
      representation['lists'] = {list['string_id']: list for list in representation['lists']}
      return representation """

# BoardSerializer
class BoardSerializer(serializers.ModelSerializer):
  id = serializers.CharField(source='string_id', allow_blank=True)

  class Meta:
    model = Board
    fields = ['id', 'title']