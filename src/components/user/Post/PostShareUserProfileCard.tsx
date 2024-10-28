import {
  Avatar,
  Box,
  Button,
  Card,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import pic from "../../../assets/profpic.jpeg";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useUserStore } from "../../../store/user-store";
import { ProfileCardProps } from "./PostUserProfileCard";
import UserProfileCardButton from "./UserProfileCardButton";

const PostShareUserProfileCard = ({
  firstName,
  lastName,
  postUserId,
  profilePicture,
  setIsHovered,
  handleNavigateClick,
}: ProfileCardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { userId } = useUserStore();
  const { data: friendshipStatus } = useGetFriendshipStatus(postUserId ?? 0);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(
    postUserId ?? 0
  );

  const {
    mutation: unfriend,
    isLoading: unfriendIsLoading,
    setIsLoading: setUnfriendIsLoading,
  } = useUnfriend(userId ?? 0);

  const handleUnfriendClick = () => {
    unfriend.mutate(postUserId);
    setUnfriendIsLoading(true);
  };

  return (
    <Card
      padding={5}
      position="absolute"
      zIndex={100}
      left="10px"
      bottom="50px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      border="1px solid"
      borderColor="gray.500"
      boxShadow="0 0 5px 0px rgba(160, 160, 160, 0.5)"
    >
      <Box display="flex">
        <Avatar
          src={profilePicture || pic}
          height={{ base: "75px", md: "100px" }}
          width={{ base: "75px", md: "100px" }}
          mr="10px"
          cursor="pointer"
          onClick={handleNavigateClick}
        />
        <Box display="flex" flexDirection="column">
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            textTransform="capitalize"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleNavigateClick}
          >
            {firstName} {lastName}
          </Text>
          <Box display="flex" mt={{ base: "5px", md: "20px" }}>
            {userId === postUserId ? (
              <>
                <Button
                  mr="7px"
                  bg="#1877F2"
                  _hover={{ bg: "#165BB7" }}
                  ml={{ base: "10px", md: "0px" }}
                >
                  <FaPlus size="15px" />
                  {isSmallScreen ? null : <Text ml="5px">Add to Story</Text>}
                </Button>
                <Button mr="7px">
                  <MdModeEdit size="20px" />
                  {isSmallScreen ? null : <Text ml="5px">Edit profile</Text>}
                </Button>
              </>
            ) : (
              <UserProfileCardButton
                friendshipStatus={friendshipStatus}
                postUserId={postUserId}
                handleUnfriendClick={handleUnfriendClick}
                unfriendIsLoading={unfriendIsLoading}
                friendRequestStatus={friendRequestStatus}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostShareUserProfileCard;
