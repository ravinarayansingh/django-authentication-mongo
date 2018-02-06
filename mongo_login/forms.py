from django.contrib.auth.forms import AuthenticationForm
from django import forms
from django.forms import TextInput, PasswordInput


class QtxAuthForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class': ' form-control', 'placeholder': 'username'}))
    password = forms.CharField(widget=PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password'}))
