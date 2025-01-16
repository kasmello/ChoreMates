# Generated by Django 5.0.1 on 2025-01-15 22:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("database", "0001_initial"),
    ]

    operations = [
    migrations.CreateModel(
        name="CompleteChores",
        fields=[
            ("id", models.IntegerField(primary_key=True, serialize=False)),
            ("choreName", models.CharField(max_length=255)),
            ("timeReset", models.IntegerField()),
            ("description", models.TextField()),
            ("household", models.CharField(max_length=255)),
            ("user", models.CharField(max_length=255)),
        ],
        options={
            "db_table": "complete_chores",
            "managed": False,
        },
    ),    
    migrations.RunSQL(
    """
    CREATE VIEW complete_chores AS
    select
        c.id
        ,c.choreName
        ,c.timeReset
        ,c.description
        ,h.name as household
        ,u.name as user
    from 
        production.database_chore c
    left join 
        production.database_household h on h.id = c.household_id
    left join 
        production.database_user u on u.id = c.completedBy_id
    """,
            reverse_sql="DROP VIEW IF EXISTS complete_chores;",
        ),]
