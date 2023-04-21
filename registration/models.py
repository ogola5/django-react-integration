from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, business_name, business_owner, business_categories, nationality, contact, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        user = self.model(email=self.normalize_email(email), username=username, business_name=business_name, business_owner=business_owner, business_categories=business_categories, nationality=nationality, contact=contact, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, business_name, business_owner, business_categories, nationality, contact, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, business_name, business_owner, business_categories, nationality, contact, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    business_name = models.CharField(max_length=255)
    business_owner = models.CharField(max_length=255)
    business_categories = models.CharField(max_length=255)
    nationality = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    objects = CustomUserManager()

    def __str__(self):
        return self.email

