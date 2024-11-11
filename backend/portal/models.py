from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=100)
    profile = models.ImageField(null=True, blank=True)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    phone = models.CharField(max_length=12)
    email = models.EmailField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY = (
        ('Head', 'Head'),
        ('Block', 'Block'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Out for delivery', 'Out for delivery'),
        ('Delivered', 'Delivered'),
    )
    STATUS_PAYMENT = (
        ('Pending', 'Pending'),
        ('Payed', 'Payed'),
        ('Cancelled', 'Cancelled'),
    )
    order_number = models.CharField(max_length=100)
    customerId = models.ForeignKey(
        Customer, related_name='orders', on_delete=models.CASCADE)
    date_of_order = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS)
    status_payment = models.CharField(max_length=50, choices=STATUS_PAYMENT)
    amount = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    def __str__(self):
        return (self.customerId.name + "'s order:" + self.order_number)


class ProductQuantity(models.Model):
    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderId = models.ForeignKey(Order, on_delete=models.CASCADE)
    qty = models.PositiveSmallIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['productId', 'orderId'], name='unique_order_product'
            )
        ]
