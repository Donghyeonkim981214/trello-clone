from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from lists import models as list_model
from boards import models as board_model

# Create your models here.

class Card(models.Model):
    task = models.TextField()
    list = models.ForeignKey(list_model.List, on_delete=models.CASCADE, related_name="cards")
    board = models.ForeignKey(board_model.Board, on_delete=models.CASCADE, related_name="cards")
    order_num = models.IntegerField(null=True, blank=True)
    string_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User, related_name="cards", on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['order_num']

    def __str__(self):
        return self.string_id

@receiver(post_save, sender=Card)
def order_listing_update(sender, instance, created, **kwargs):
    if created:
        num_cards = instance.list.cards.all()
        instance.order_num = len(num_cards)
        instance.string_id = "card-" + str(instance.id)
        instance.save()