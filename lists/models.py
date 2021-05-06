from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from boards import models as board_model

# Create your models here.

class List(models.Model):
    title = models.CharField(max_length=50, default="")
    board = models.ForeignKey(board_model.Board, on_delete=models.CASCADE, related_name="lists")
    string_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order_num = models.IntegerField(null=True, blank=True)
    owner = models.ForeignKey(
        User, related_name="lists", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

@receiver(post_save, sender=List)
def order_listing_update(sender, instance, created, **kwargs):
    if created:
        instance.order_num = instance.id
        instance.string_id = "list-" + str(instance.id)
        instance.save()