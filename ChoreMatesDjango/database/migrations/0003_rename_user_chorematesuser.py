# Generated by Django 4.2.2 on 2025-01-17 16:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0002_make_completechores_view'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='ChoreMatesUser',
        ),
    ]
