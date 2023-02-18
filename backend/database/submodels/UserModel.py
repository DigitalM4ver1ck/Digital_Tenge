from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class UserManager(BaseUserManager):
    def create_user(self, email, username, phone_number, password=None, is_staff=False, is_superuser=False):
        if not username:
            raise ValueError('User must have username')
        if not email:
            raise ValueError('User must have email')
        if not phone_number:
            raise ValueError('User must have phone number')
        
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, phone_number, password=None):
        if not username:
            raise ValueError('User must have username')
        if not email:
            raise ValueError('User must have email')
        if not phone_number:
            raise ValueError('User must have phone number')

        user = self.model(
            email=self.normalize_email(email)
        )
        user.username = username
        user.phone_number = phone_number
        user.set_password(password)
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)

    phone_number_regex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(validators = [phone_number_regex], max_length = 16, unique = True)
    
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD="phone_number"
    REQUIRED_FIELDS=['email', 'username']

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)