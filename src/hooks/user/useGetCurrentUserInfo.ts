import { useQuery } from "@tanstack/react-query";
import { User } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useUserStore } from "../../store/user-store";

const apiClient = axiosInstance;

const useGetCurrentUserInfo = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const {
    setFirstName,
    setLastName,
    setProfilePicture,
    setCoverPhoto,
    setDateOfBirth,
    setGender,
  } = useUserStore();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/user`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDateOfBirth(data.dateOfBirth);
      setGender(data.gender);
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }
      if (data.coverPhoto) {
        setCoverPhoto(data.coverPhoto);
      }
    },
    enabled: !!jwtToken,
  });
};

export default useGetCurrentUserInfo;