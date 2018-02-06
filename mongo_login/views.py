from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.urls import reverse_lazy
from django.views.generic import FormView, RedirectView

from mongo_login.forms import QtxAuthForm


class LoginView(FormView):
    template_name = "login.html"
    form_class = QtxAuthForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        print("heloooooooooooooooooo", self.request.user)
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']

        user = authenticate(username=username, password=password)
        print(user.is_staff)
        print(user.is_superuser)
        if user is not None and user.is_active:
            # print(self.request.user)

            login(self.request, user)
            return super(LoginView, self).form_valid(form)
        else:
            return self.form_invalid(form)


class LogoutView(LoginRequiredMixin, RedirectView):
    permanent = False
    url = '/login'

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogoutView, self).get(request, args, kwargs)


def home_view(request):
    return HttpResponse("Success")