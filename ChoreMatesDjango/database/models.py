from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Households Table
class Household(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    code = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, name, password=None, household=None):
        if not name:
            raise ValueError('Users must have a name')
        user = self.model(name=name, household=household)
        user.set_password(password)
        user.save(using=self._db)
        return user

# Users Table
class ChoreMatesUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    household = models.ForeignKey(Household, on_delete=models.CASCADE, related_name='users')
    
    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.name


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
    
class CompleteChores(models.Model):
    id = models.IntegerField(primary_key=True)
    choreName = models.CharField(max_length=255)
    timeReset = models.IntegerField()
    description = models.TextField()
    household = models.CharField(max_length=255)
    user = models.CharField(max_length=255)

    class Meta:
        db_table = 'complete_chores'  # Name of the database view
        managed = False  # Django will not create, update, or delete the view
