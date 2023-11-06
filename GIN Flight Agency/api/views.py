from django.shortcuts import render
from rest_framework import generics, status
from .serializers import FlightSerializer, CreateFlightSerializer, LoginSerializer, RegisterSerializer, TicketSerializer
from .models import Flight, Ticket
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
# Create your views here.

class FlightView(generics.CreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class CreateFlightView(APIView):
    serializer_class = CreateFlightSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            fID = Flight.objects.all().count()
            orig = serializer.data.get('origin')
            dest = serializer.data.get('destination')
            depa = serializer.data.get('depart')
            dT = serializer.data.get('dTime')
            aT = serializer.data.get('aTime')
            prc = serializer.data.get('price')
            queryset = Flight.objects.filter(FID = fID)
            if queryset.exists():
                flight = queryset[0]
                flight.FID = fID
                flight.origin = orig
                flight.destination = dest
                flight.depart = depa
                flight.dTime = dT
                flight.aTime = aT
                flight.price = prc
                flight.save(update_fields=['FID', 'origin', 'destination', 'depart', 'dTime','aTime','price'])
            else: 
                flight = Flight(FID = fID, origin = orig , destination = dest, depart = depa, dTime = dT, aTime = aT, price = prc)
                flight.save()

            return Response(CreateFlightSerializer(flight).data, status=status.HTTP_201_CREATED)

class DeleteFlightView(APIView):
    serializer_class = FlightSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            fID = serializer.data.get('FID')
            queryset = Flight.objects.filter(FID = fID)
            if queryset.exists():
                ticket = queryset[0]
                ticket.delete()
            else: 
                return Response({'Bad Request':'Ticket Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(FlightSerializer(ticket).data, status=status.HTTP_200_OK)

class CreateTicketView(APIView):
    serializer_class = TicketSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            fID = serializer.data.get('FID')
            owner = serializer.data.get('owner')
            queryset = Ticket.objects.filter(FID = fID)
            if queryset.exists():
                ticket = queryset[0]
                ticket.FID = fID
                ticket.owner = owner
                ticket.save(update_fields=['FID', 'owner'])
            else: 
                ticket = Ticket(owner = owner, FID = fID)
                ticket.save()

            return Response(TicketSerializer(ticket).data, status=status.HTTP_201_CREATED)

class DeleteTicketView(APIView):
    serializer_class = TicketSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            fID = serializer.data.get('FID')
            owner = serializer.data.get('owner')
            queryset = Ticket.objects.filter(FID = fID, owner = owner)
            if queryset.exists():
                ticket = queryset[0]
                ticket.delete()
            else: 
                return Response({'Bad Request':'Ticket Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)


class GetFlights(APIView):
    serializer_class = FlightSerializer

    def get(self,request, format=None):
            data = []
            flights = Flight.objects.all()
            for flight in flights:
                item = FlightSerializer(flight).data
                data.append(item)

            return Response(data, status=status.HTTP_200_OK)

class GetTickets(APIView):
    serializer_class = TicketSerializer

    def get(self,request, format=None):
            data = []
            tickets = Ticket.objects.all()
            for ticket in tickets:
                item = TicketSerializer(ticket).data
                data.append(item)

            return Response(data, status=status.HTTP_200_OK)

            


class CreateUserView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(username = username, email = email, password = password)
                user.save()

            return Response(RegisterSerializer(user).data, status=status.HTTP_201_CREATED)


class GetUser(APIView):
    serializer_class = LoginSerializer
    lookup_url_kwarg = 'username'

    def get(self,request, format=None):
        username = request.GET.get(self.lookup_url_kwarg)
        if username != None:
            user = User.objects.filter(username = username)
            if len(user) > 0:
                data = LoginSerializer(user[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request':'Unregistered User'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request':'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


class GetUsers(APIView):
    serializer_class = RegisterSerializer

    def get(self,request, format=None):
            users = User.objects.all()
            data = []
            for user in users:
                if user.is_staff == False:
                    item = RegisterSerializer(user).data
                    data.append(item)

            return Response(data, status=status.HTTP_200_OK)