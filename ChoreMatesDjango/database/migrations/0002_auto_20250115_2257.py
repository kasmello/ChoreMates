# Generated by Django 5.0.1 on 2025-01-15 22:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("database", "0001_initial"),
    ]

    operations = [migrations.RunSQL(
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
