from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from portal import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'customers', views.CustomerView, 'customer')
router.register(r'products', views.ProductView, 'product')
router.register(r'product-quantity',
                views.ProductQuantityView, 'product quantity')
router.register(r'orders', views.OrderView, 'order')
router.register(r'users', views.UserViewSet, 'user')
urlpatterns = [
    path('grappelli/', include('grappelli.urls')), # grappelli URLS    
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
