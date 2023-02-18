from django.urls import path, include

from . import views

from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name="register"),
    path('login/', obtain_auth_token, name="login"),
    path('logout/', views.LogoutUser.as_view(), name="logout"),
    path('create-wallet/', views.createWallet.as_view(), name="create-wallet"),
    path('get-balance/', views.getBalance.as_view(), name="get-balance"),
    path('find-wallet-transfer/', views.GetUserInfoByPhoneTransfer.as_view(), name="find-wallet-by-phone"),
    path('find-wallet/', views.findWalletByPhoneNumber.as_view(), name="find-wallet"),
    path('transferbynumber/', views.TransferMoney.as_view(), name="transfer-money"),
    path('create-qr-transaction/', views.QrTransactionReq.as_view(), name="qr-transfer"),
    path('get-qr-transaction/<int:pk>/', views.GetQrTransaction.as_view(), name="get-qr-transfer"),
    path('delete-qr-transaction/<int:pk>/', views.DeleteQrTransaction.as_view(), name="delete-qr-transfer"),
    path('get-transactions/', views.GetTransactions.as_view(), name="get-transactions"),

    path('', include(router.urls)),
]
