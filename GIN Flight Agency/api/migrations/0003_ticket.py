# Generated by Django 4.2.1 on 2023-05-28 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_flight_roundtrip'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.TextField()),
                ('FID', models.CharField(max_length=5)),
            ],
        ),
    ]