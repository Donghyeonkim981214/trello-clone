from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User

# Create your models here.

class Board(models.Model):
    title = models.CharField(max_length=50)
    order_num = models.IntegerField(null=True, blank=True)
    string_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User, related_name="boards", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

@receiver(post_save, sender=Board)
def order_listing_update(sender, instance, created, **kwargs):
    if created:
        instance.order_num = instance.id
        instance.string_id = "board-" + str(instance.id)
        instance.save()