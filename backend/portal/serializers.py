from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from drf_extra_fields.fields import Base64ImageField



class OrderSerializer(serializers.ModelSerializer):

    num_items = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = '__all__'

    def get_num_items(self, obj):
        products = obj.productquantity_set.all()
        return sum([product.qty for product in products])

class CustomerSerializer(serializers.ModelSerializer):

    count_total_orders = serializers.SerializerMethodField()
    count_total_spent = serializers.SerializerMethodField()
    profile = Base64ImageField(required=False)


    class Meta:
        model = Customer
        fields = '__all__'

    def get_count_total_orders(self, obj):
        return obj.orders.count()

    def get_count_total_spent(self, obj):
        orders = obj.orders.filter(status_payment='Payed')
        return sum([order.amount for order in orders])


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductQuantity
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields= '__all__'