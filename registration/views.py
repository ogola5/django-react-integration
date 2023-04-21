import datetime
import jwt

from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes


class CustomUserListCreateView(ListCreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = CustomUser.objects.get(email=serializer.data['email'])
            payload = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def login_user(request):
    try:
        user = CustomUser.objects.get(email=request.data['email'])
        if user.check_password(request.data['password']):
            payload = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

