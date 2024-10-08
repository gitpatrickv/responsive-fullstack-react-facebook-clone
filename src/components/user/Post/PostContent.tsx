import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import useDeletePost from "../../../hooks/user/useDeletePost";
import { useUserStore } from "../../../store/user-store";
import { PostProps } from "./Posts";
import PostUserProfileCard from "./PostUserProfileCard";

const PostContent = ({ posts }: PostProps) => {
  const time = new Date(posts.timestamp);
  const { mutate: deletePost } = useDeletePost();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/profile/${posts.userId}`);
  };

  const handleDeletePostClick = () => {
    deletePost(posts.postId);
  };

  const { userId } = useUserStore();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {isHovered && (
        <PostUserProfileCard
          posts={posts}
          setIsHovered={setIsHovered}
          handleNavigateClick={handleNavigateClick}
        />
      )}
      <Box display="flex" alignItems="center">
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Avatar
            src={posts.profilePicture || pic}
            size="sm"
            mr="10px"
            cursor="pointer"
            onClick={handleNavigateClick}
          />
        </Box>
        <Box
          flexDirection="column"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text
            fontSize="sm"
            textTransform="capitalize"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleNavigateClick}
          >
            {posts.firstName} {posts.lastName}
          </Text>
          <Text fontSize="xs" color="gray.500" fontWeight="semibold">
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Box>
        <Spacer />
        {userId === posts.userId && (
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiOutlineDotsHorizontal size="25px" />}
                variant="ghost"
                borderRadius="full"
                aria-label="menu"
              />
              <MenuList>
                <MenuItem padding={2} onClick={handleDeletePostClick}>
                  <IoTrashOutline size="25px" />
                  <Text ml="10px" fontSize="lg" fontWeight="semibold">
                    Delete Post
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Box>
      <Text mt="5px" mb="5px">
        {posts.content}
      </Text>
    </>
  );
};

export default PostContent;
