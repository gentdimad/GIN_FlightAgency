from rest_framework import serializers
from .models import Flight, Ticket
from django.contrib.auth.models import User

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('id', 'FID', 'origin', 'destination', 'depart', 'dTime', 'aTime',  'price')

class CreateFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('id', 'origin', 'destination', 'depart', 'dTime', 'aTime',  'price')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('owner', 'FID')

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'is_staff')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')