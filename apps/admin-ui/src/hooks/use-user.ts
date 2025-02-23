import { RoleEnum } from '@admin-ui/types/role';

export function useUser() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = {
    data: {
      name: 'Prashanth',
      email: 'prashanth@takeaway.com',
      picture: '',
      locale: '',
      given_name: '',
      family_name: '',
      email_verified: false,
      isActive: true,
      role: RoleEnum.SuperAdmin,
      profileImage: 'https://avatar.iran.liara.run/public/12',
    },
    isLoading: false,
    isError: false,
    error: null,
  };
  const { isAccessTokenValid } = { isAccessTokenValid: true };

  const isSuperAdmin = (function () {
    if (!user || !user?.isActive) {
      return false;
    }
    return user?.role === RoleEnum.SuperAdmin;
  })();

  const isAdmin = (function () {
    if (!user || !user?.isActive) {
      return false;
    }
    return user?.role === RoleEnum.Admin;
  })();

  return {
    user,
    isLoading,
    isError,
    error,
    isSuperAdmin,
    isAdmin,
    hasAdminAccess: isAdmin || isSuperAdmin,
    isAccessTokenValid,
  };
}
