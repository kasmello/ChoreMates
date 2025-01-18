from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class ChoreMatesUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)




# Households Table
class Household(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    code = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name



class ChoreMatesUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True, null=False)
    password = models.CharField(max_length=255, null=False)
    is_staff = models.BooleanField(default=False)  # Required for the admin interface
    is_superuser = models.BooleanField(default=False)  # Required for superuser status
    household = models.ForeignKey(
        Household, 
        on_delete=models.CASCADE, 
        related_name='users', 
        blank=True, 
        null=True
    )

    objects = ChoreMatesUserManager()

    USERNAME_FIELD = 'username'  # This specifies the field to be used for authentication
    REQUIRED_FIELDS = []  # Password is handled by AbstractBaseUser

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        # Simplified: Customize this method if you need specific permission logic
        return self.is_superuser

    def has_module_perms(self, app_label):
        # Simplified: Adjust this logic if needed
        return self.is_superuser



# Chores Table
class Chore(models.Model):
    id = models.AutoField(primary_key=True)
    household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='chores', null=False)
    completedBy = models.ForeignKey(ChoreMatesUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='completed_chores')
    choreName = models.CharField(max_length=255, null=False)
    timeReset = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.choreName




