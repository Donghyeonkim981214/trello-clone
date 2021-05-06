# Generated by Django 3.1.7 on 2021-05-04 17:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('boards', '0003_auto_20210407_1755'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='boards', to=settings.AUTH_USER_MODEL),
        ),
    ]