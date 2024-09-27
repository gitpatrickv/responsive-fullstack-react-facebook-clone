import {
  Box,
  Divider,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import useGetPostLike from "../../../hooks/user/useGetPostLike";
import useLikePost from "../../../hooks/user/useLikePost";
import useGetPostLikeCount from "../../../hooks/user/useGetPostLikeCount";

interface Props {
  postId: number;
  onOpen: () => void;
}

const LikeCommentShareButton = ({ postId, onOpen }: Props) => {
  const { data: postLike } = useGetPostLike(postId);
  const { data: postLikeCount } = useGetPostLikeCount(postId);

  const { mutate: likePost } = useLikePost();

  const handleLikePostClick = () => {
    likePost(postId);
  };
  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const boxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    _hover: {
      bg: colorMode === "dark" ? "gray.600" : "gray.100",
    },
    borderRadius: "5px",
  };

  return (
    <>
      <Box display="flex" mt="5px" alignItems="center">
        {postLikeCount && postLikeCount.postLikeCount >= 1 && (
          <>
            <Box
              border="1px solid"
              borderRadius="full"
              width="20px"
              height="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderColor="blue.500"
              bg="blue.500"
              mr="5px"
            >
              <BiSolidLike size="14px" />
            </Box>
            <Text>{postLikeCount?.postLikeCount}</Text>
          </>
        )}

        <Spacer />
        <Box
          display="flex"
          mr="15px"
          alignItems="center"
          onClick={onOpen}
          cursor="pointer"
          userSelect="none"
        >
          <Text mr="3px">99</Text>
          {isSmallScreen ? <FaRegComment /> : <Text>comments</Text>}
        </Box>
        <Box display="flex" alignItems="center">
          <Text mr="3px">50</Text>
          {isSmallScreen ? <PiShareFatLight /> : <Text>shares</Text>}
        </Box>
      </Box>
      <Divider mt="5px" mb="5px" color="gray.500" />
      <Box display="flex" justifyContent="space-around">
        <Box
          {...boxStyles}
          onClick={handleLikePostClick}
          color={postLike?.liked ? "blue.500" : "white"}
        >
          {postLike ? <BiSolidLike size="20px" /> : <BiLike size="20px" />}
          <Text ml="5px">Like</Text>
        </Box>
        <Box {...boxStyles} onClick={onOpen}>
          <FaRegComment size="20px" />
          <Text ml="5px">Comment</Text>
        </Box>
        <Box {...boxStyles}>
          <PiShareFatLight size="20px" />
          <Text ml="5px">Share</Text>
        </Box>
      </Box>
    </>
  );
};

export default LikeCommentShareButton;