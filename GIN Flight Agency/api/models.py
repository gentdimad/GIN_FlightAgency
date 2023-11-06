import datetime
from django.db import models

# Create your models here.
class Flight(models.Model):
    FID = models.CharField(max_length = 5)
    origin = models.TextField()
    destination = models.TextField()
    depart = models.DateField()
    dTime = models.TimeField(default= datetime.time(00, 00))
    aTime = models.TimeField(default= datetime.time(00, 00))
    price = models.FloatField()

class Ticket(models.Model):
    owner = models.TextField()
    FID = models.CharField(max_length=5)
