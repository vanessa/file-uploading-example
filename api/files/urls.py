from django.urls import path
from files.endpoints import FileUploadEndpoint, FilesEndpoint

app_name = 'files'

urlpatterns = [
    path('', FilesEndpoint.as_view(), name='files'),
    path('upload/', FileUploadEndpoint.as_view(), name='upload')
]