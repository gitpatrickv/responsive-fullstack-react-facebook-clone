import { useQuery } from "@tanstack/react-query";
import { useAuthQueryStore } from "../../store/auth-store";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  postCommentCount: number;
}

const useGetPostCommentCount = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postCommentCount", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/post/${postId}/comment/count`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostCommentCount;