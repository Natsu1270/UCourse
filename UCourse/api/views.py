from django.db.models import Q

from rest_framework import views, status
from rest_framework.response import Response

from api.utils import uc_response, create_search_keyword
from courses.models import Course
from programs.models import Program
from courses.serializers import CourseSearchSerializer
from programs.serializers import ProgramSearchSerializer


class SearchAPI(views.APIView):

    def get(self, request):
        query = request.query_params.get('query', None)
        courses = Course.objects.all()
        programs = Program.objects.all()
        query = query.strip()
        create_search_keyword(query)
        if query:
            courses = courses.filter(Q(title__icontains=query))
            programs = programs.filter(name__icontains=query)
        data = {
            "courses": CourseSearchSerializer(instance=courses, many=True).data,
            "programs": ProgramSearchSerializer(instance=programs, many=True).data
        }

        return Response(
            uc_response(data=data, result=True, error=None, message='OK', status_code=200),
            status=status.HTTP_200_OK)


class AdvancedSearch(views.APIView):

    def get(self, request):
        keyword = request.query_params.get('keyword', "")
        can_register = request.query_params.get('canRegister', False)
        from_date = request.query_params.get('fromDate', None)
        to_date = request.query_params.get('toDate', None)
        keyword = keyword.strip()
        create_search_keyword(keyword)

        courses = Course.objects.filter(
            Q(title__icontains=keyword)
        )
        programs = None
        if from_date is None and not can_register:
            programs = Program.objects.filter(name__icontains=keyword)

        if from_date:
            courses = courses.filter(c_homes__expected_date__range=[from_date, to_date])

        if can_register:
            courses = [course for course in courses if course.can_register_class]

        return Response({
            "courses": CourseSearchSerializer(instance=courses, many=True).data,
            "programs":ProgramSearchSerializer(instance=programs, many=True).data,
            "result": True
        }, status=status.HTTP_200_OK)




