from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Allows access only to users with the admin role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


class IsEditor(BasePermission):
    """
    Allows access only to users with the editor role or higher (admin).
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            request.user.role in ['admin', 'editor']
        )


class IsViewer(BasePermission):
    """
    Allows access only to users with the viewer role or higher.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated
