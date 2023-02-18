from rest_framework.authtoken.models import Token
from database.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['username'] = user.username
            token = Token.objects.get(user=user)
            data['token'] = token.key
        else:
            data['errors'] = serializer.errors
        return Response(data)