from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login

from course_homes.models import CourseHome
from courses.models import Course
from roles.serializers import RoleSerializer
from roles.models import Role
from profiles.serializers import ProfileSerializer, ProfileMinSerializer


class CourseProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'icon', 'status', 'expected_date',
        ]


class CourseHomeProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # course = serializers.PrimaryKeyRelatedField(read_only=True)
    teacher = serializers.StringRelatedField(read_only=True)
    course = CourseProfileSerializer(read_only=True)

    class Meta:
        model = CourseHome
        fields = [
            'id', 'course', 'status', 'slug', 'full_name', 'teacher'
        ]


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, read_only=True)
    role = RoleSerializer(many=False, read_only=True)
    user_profile = ProfileSerializer(read_only=True)
    public_info = serializers.SerializerMethodField(read_only=True)
    classes = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_classes(obj):
        if obj.role.code == 'TC':
            course_homes = CourseHome.objects.filter(teacher_id=obj.id)
            return CourseHomeProfileSerializer(instance=course_homes, many=True).data

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password', 'is_social_account','classes', 'user_profile',
                  'date_joined', 'is_active', 'role', 'public_info', 'last_login')
        extra_kwargs = {'password': {'write_only': True}, }
        read_only_fields = ('id', 'date_joined', 'is_active',)

    def update(self, instance, validated_data):
        role = validated_data.pop('role', False)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if role:
            role = Role.objects.filter(code=role.get('code')).first()
            instance.role = role
        instance.save()

        return instance

    @staticmethod
    def get_public_info(obj):
        return obj.user_profile.public_info


class UserMinSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user_profile = ProfileMinSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'user_profile')


class UserDataSerializer(serializers.ModelSerializer):
    user_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'is_social_account', 'is_active', 'last_login',
                  'is_staff', 'date_joined', 'role_id', 'user_profile']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'username')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        user = get_user_model().objects.create_student(email, password, username)

        return user


class TeacherRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'username')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        user = get_user_model().objects.create_teacher(email, password, username)

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user:
            update_last_login(sender=None, user=user)
            return user
        raise serializers.ValidationError('Incorrect email or password')


class HandleSocialAccount(serializers.Serializer):
    email = serializers.CharField()
    username = serializers.CharField(required=False)
    uid = serializers.CharField(required=True)


class UpdateAccountSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    old_password = serializers.CharField(required=True)
    password = serializers.CharField()

    def update(self, instance, validated_data):
        role = validated_data.pop('role', False)
        new_password = validated_data.get('password')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if new_password:
            instance.set_password(new_password)
        if role:
            role = Role.objects.filter(code=role.get('code')).first()
            instance.role = role
        instance.save()

        return instance
