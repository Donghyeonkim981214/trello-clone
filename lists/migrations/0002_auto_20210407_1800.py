# Generated by Django 3.1.7 on 2021-04-07 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list',
            name='task',
        ),
        migrations.AddField(
            model_name='list',
            name='title',
            field=models.CharField(default='', max_length=50),
        ),
    ]
