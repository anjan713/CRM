from django.shortcuts import render, get_list_or_404
from .serializers import *
from rest_framework import viewsets, mixins, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from .models import *
from rest_framework.decorators import action
import datetime
from django.contrib.auth import get_user_model
import calendar
import openai

# openai.api_key = 


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    ordering_fields = ['company', 'location', 'date_created']
    filterset_fields = ['name', 'company',
                        'location', 'email', 'phone', 'position']

    @action(detail=False, methods=['GET'])
    def get_total_customers(self, request, pk=None):
        total = Customer.objects.all().count()
        return Response({'total': total})

    @action(detail=False, methods=['GET'])
    def get_new_customers(self, request, pk=None):
        date_today = datetime.date.today()
        month_range = calendar.monthrange(date_today.year, date_today.month)
        first_date = datetime.date(date_today.year, date_today.month, 1)
        last_date = datetime.date(
            date_today.year, date_today.month, month_range[1])
        total = Customer.objects.filter(
            date_created__range=[first_date, last_date]).count()
        return Response({'total': total})


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    ordering_fields = '__all__'
    filterset_fields = [
        'order_number',
        'customerId',
        'date_of_order',
        'status',
        'status_payment',
    ]

    @action(detail=False, methods=['GET'])
    def get_total_orders(self, request, pk=None):
        total = Order.objects.all().count()
        return Response({'total': total})

    @action(detail=False, methods=['GET'])
    def get_out_orders(self, request, pk=None):
        total = Order.objects.filter(status='Out for delivery').count()
        return Response({'total': total})

    @action(detail=False, methods=['GET'])
    def get_completed_orders(self, request, pk=None):
        completedTotal = Order.objects.filter(status='Delivered').count()
        return Response({'total': completedTotal})

    @action(detail=False, methods=['GET'])
    def get_pending_orders(self, request, pk=None):
        pendingTotal = Order.objects.filter(status='Pending').count()
        return Response({'total': pendingTotal})

    @action(detail=False, methods=['GET'])
    def get_monthly_revenue(self, request, pk=None):
        date_today = datetime.date.today()
        month_range = calendar.monthrange(date_today.year, date_today.month)
        first_date = datetime.date(date_today.year, date_today.month, 1)
        last_date = datetime.date(
            date_today.year, date_today.month, month_range[1])
        orders = Order.objects.filter(status_payment='Payed', date_of_order__range=[
                                      first_date, last_date])
        monthly_revenue = sum([order.amount for order in orders])
        return Response({'total': monthly_revenue})

    @action(detail=False, methods=['GET'])
    def get_monthly_revenue_history(self, request, pk=None):
        year = datetime.date.today().year  # Set the current year
        # Get the history for requested month
        month = int(request.query_params.get('month'))
        month_range = calendar.monthrange(year, month)

        start_date = datetime.date(year, month, 1)
        end_date = datetime.date(year, month, month_range[1])

        orders = Order.objects.filter(status_payment='Payed', date_of_order__range=[
            start_date, end_date])

        delta = end_date - start_date
        revenue_history = []
        for i in range(delta.days+1):
            date_now = start_date+datetime.timedelta(days=i)
            orders_date_now = orders.filter(date_of_order=date_now)
            revenue_history_item = {}
            revenue_history_item['date'] = date_now.strftime('%d-%m-%Y')

            if orders_date_now:
                revenue_history_item['total'] = sum(
                    [order.amount for order in orders_date_now])
            else:
                revenue_history_item['total'] = 0
            revenue_history.append(revenue_history_item)

        return Response({'revenue_history': revenue_history})



    @action(detail=False, methods=['GET'])
    def get_revenue_prediction(self,request, pk=None):
        try:
            # Extract revenue history from the request body
            year = datetime.date.today().year  # Set the current year
            # Get the history for requested month
            print(request.query_params,year)
            month = int(request.query_params.get('month'))

            start_date = datetime.date(year, month, 1)
            end_date = datetime.date.today()
            print(start_date, end_date)

            orders = Order.objects.filter(status_payment='Payed', date_of_order__range=[
                start_date, end_date])

            delta = end_date - start_date
            revenue_history = []
            for i in range(delta.days+1):
                date_now = start_date+datetime.timedelta(days=i)
                orders_date_now = orders.filter(date_of_order=date_now)
                revenue_history_item = {}
                revenue_history_item['date'] = date_now.strftime('%d-%m-%Y')

                if orders_date_now:
                    revenue_history_item['total'] = sum(
                        [order.amount for order in orders_date_now])
                else:
                    revenue_history_item['total'] = 0
                revenue_history.append(revenue_history_item)
            print(revenue_history)
            # Extract month from the request body
            # year = datetime.date.today().year
            # month = int(request.data.get('month'))
            # month = 11
            # Get the revenue history by calling the helper function
            if not revenue_history:
                return Response({"error": "revenue_history is required"}, status=400)

            # Prepare input for OpenAI API
            # input_text = "Given the following daily revenue data, predict daily revenue for the next month:\n"
            input_text = ( "Based on the following daily revenue data from the first day of the month to today's date, "
                "predict the total revenue for the entire month. Only return the total revenue, not a daily breakdown.\n" )
            for item in revenue_history:
                input_text += f"Date: {item['date']}, Total: {item['total']}\n"

            # Call OpenAI API for predictions
            response = openai.chat.completions.create(
            # response = openai.completions.create(
                # engine="text-davinci-003",
                model = "gpt-4-turbo",
                messages=[
        {
            "role": "system", 
         "content": (
"You are a helpful assistant. Based on the provided daily revenue history, "
                            "predict the total monthly revenue and return only the total predicted revenue, "
                            "not a daily breakdown."
                        ),
         },
        {"role": "user", "content": input_text}
    ],
                # prompt=input_text,
                max_tokens=500,
                temperature=0.7
            )

            print(response.choices[0].message.content)
            # prediction_json = response['choices'][0]['message']['content'].strip()

            # prediction_json = response['choices'][0]['message']['content']
            prediction_json = response.choices[0].message.content.strip()
            print("prediction json",prediction_json)
            # revenue_prediction = []


            # Format OpenAI response into a list
            # for line in prediction_text.split('\n'):
            #     if "Date" in line and "Total" in line:
            #         parts = line.split(", ")
            #         date = parts[0].split(": ")[1]
            #         total = int(parts[1].split(": ")[1])
            #         revenue_prediction.append({"date": date, "total": total})

            # Return the original history and predictions
            return Response({
                "predicted_total_monthly_revenue": prediction_json
            })
            # return Response({
            #     "revenue_history": revenue_history,
            #     "revenue_prediction": prediction_json
            # })

        except Exception as e:
            return Response({"error": str(e)}, status=500)

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    ordering_fields = ['name', 'category']
    filterset_fields = ['name', 'category']


class ProductQuantityView(viewsets.ModelViewSet):
    serializer_class = ProductQuantitySerializer
    queryset = ProductQuantity.objects.all()
    filterset_fields = ['orderId']
    ordering_fields = '__all__'


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
