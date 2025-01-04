from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login
from django.contrib import messages
from database.forms import UserForm

from django.http import JsonResponse

from django.shortcuts import redirect

from django.contrib.auth.hashers import make_password

