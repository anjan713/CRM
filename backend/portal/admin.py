from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group
admin.site.site_header = 'Marketing Admin'
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(ProductQuantity)
admin.site.register(Order)
admin.site.unregister(Group)
