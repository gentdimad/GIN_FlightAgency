from django.urls import path
from .views import FlightView, CreateUserView, CreateFlightView, GetUser, GetUsers, GetFlights, CreateTicketView, GetTickets, DeleteTicketView, DeleteFlightView

urlpatterns = [
    path('flights', FlightView.as_view(), name="flights"),
    path('flights/create', CreateFlightView.as_view(), name="flights/create"),
    path('createticket', CreateTicketView.as_view(), name="createticket"),
    path('deleteticket', DeleteTicketView.as_view(), name="deleteticket"),
    path('deleteflight', DeleteFlightView.as_view(), name="deleteflight"),
    path('createuser', CreateUserView.as_view(), name="createuser"),
    path('getuser', GetUser.as_view(), name="getuser"),
    path('getusers', GetUsers.as_view(), name="getusers"),
    path('getflights', GetFlights.as_view(), name="getflights"),
    path('gettickets', GetTickets.as_view(), name="gettickets"),
]
