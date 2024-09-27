import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface Props {
  liked: boolean;
}

const apiClient = axiosInstance;

const useGetPostLike = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postLike", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(`/post/${postId}/like`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostLike;