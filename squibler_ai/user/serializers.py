from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from .models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            # Authenticate the user
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError(_("Invalid email or password"))
            if not user.is_active:
                raise serializers.ValidationError(_("User account is disabled"))
        else:
            raise serializers.ValidationError(_("Both email and password are required"))

        # Attach user instance to the validated data
        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'first_name', 'last_name']

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'first_name', 'last_name']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password since it is not stored
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],  # Password is hashed internally by create_user
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

