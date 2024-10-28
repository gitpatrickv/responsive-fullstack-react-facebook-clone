import {
  Avatar,
  Box,
  Button,
  Card,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useUserStore } from "../../../store/user-store";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";

interface Props {
  request: UserDataModelList;
  isFriendRequest: boolean;
}

const FriendRequestCard = ({ request, isFriendRequest }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const { userId } = useUserStore();

  const {
    mutation: deleteRequest,
    isLoading: deleteRequestIsLoading,
    setIsLoading: setDeleteRequestIsLoading,
  } = useDeleteFriendRequest(userId ?? 0);

  const handleDeleteFriendRequestClick = () => {
    deleteRequest.mutate(request.userId);
    setDeleteRequestIsLoading(true);
  };

  const handleNavigateClick = () => {
    navigate(`/profile/${request.userId}`);
  };

  const { data: friendshipStatus } = useGetFriendshipStatus(request.userId);

  return (
    <Card overflow="hidden">
      <Box
        display={isSmallScreen ? "flex" : undefined}
        alignItems="center"
        padding={isSmallScreen ? 2 : 0}
      >
        {isSmallScreen ? (
          <Avatar
            src={request.profilePicture || pic}
            size="xl"
            onClick={handleNavigateClick}
            cursor="pointer"
          />
        ) : (
          <Image
            src={request.profilePicture || pic}
            width="100%"
            height="100%"
            objectFit="cover"
            boxSize="220px"
            onClick={handleNavigateClick}
            cursor="pointer"
          />
        )}
        <Box padding={2}>
          <Text
            isTruncated={true}
            fontWeight="semibold"
            textTransform="capitalize"
            fontSize="lg"
            onClick={handleNavigateClick}
            cursor="pointer"
          >
            {request.firstName} {request.lastName}
          </Text>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "row" : "column"}
            mt="5px"
          >
            {isFriendRequest ? (
              <AcceptFriendRequestButton
                userId={request.userId}
                mb={{ base: "0px", md: "10px" }}
                mr={{ base: "10px", md: "0" }}
                width="100%"
              >
                <Text>Confirm</Text>
              </AcceptFriendRequestButton>
            ) : (
              <>
                <AddFriendButton
                  userId={request.userId}
                  friendshipStatus={friendshipStatus?.status}
                >
                  {friendshipStatus &&
                  friendshipStatus?.status === "PENDING" ? (
                    <>
                      <FaUserXmark size="20px" />
                      <Text ml="10px">Cancel request</Text>
                    </>
                  ) : (
                    <>
                      <FaUserPlus size="20px" />
                      <Text ml="10px">Add friend</Text>
                    </>
                  )}
                </AddFriendButton>
              </>
            )}

            {isFriendRequest && (
              <Button
                onClick={handleDeleteFriendRequestClick}
                isLoading={deleteRequestIsLoading}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FriendRequestCard;
