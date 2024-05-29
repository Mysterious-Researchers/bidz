import StorageUtil from '@/lib/api/utils/storage';

export const getAuthorizationHeader = () => {
  return {
    headers: { Authorization: `Bearer ${StorageUtil.getAccessToken()}` },
  };
};
