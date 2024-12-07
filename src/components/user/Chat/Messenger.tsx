import {
  Box,
  Card,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiLogoMessenger } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllUserChats from "../../../hooks/user/useFetchAllUserChats";
import useHandleAddToChatArray from "../../../hooks/user/useHandleAddToChatArray";
import { useChatStore } from "../../../store/chat-store";
import ChatCard from "./ChatCard";
import MessengerChatList from "./MessengerChatList";
import NewMessage from "./NewMessage";
import { usePostStore } from "../../../store/post-store";

interface Props {
  userId: number;
}

const Messenger = ({ userId }: Props) => {
  const { colorMode } = useColorMode();
  const { chatArray, isNewMessageMaximized, setIsNewMessageMaximized } =
    useChatStore();
  const [isHover, setIsHover] = useState<boolean>(false);
  const { handleAddToChatArray } = useHandleAddToChatArray();
  const {
    data: fetchAllChat,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllUserChats({
    userId: userId,
    pageSize: 10,
  });

  const fetchChatData =
    fetchAllChat?.pages.reduce(
      (total, page) => total + page.chatModels.length,
      0
    ) || 0;

  const fetchAllChatLength =
    fetchAllChat?.pages.flatMap((page) => page.chatModels).length || 0;

  const { isPostImageModalOpen } = usePostStore();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Flex justifyContent="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="chats"
            icon={<BiLogoMessenger size="43px" />}
            variant="none"
          />
          <MenuList border="none">
            <Box ml="10px" mb="5px">
              <Text fontWeight="bold" fontSize="x-large" ml="5px">
                Chats
              </Text>
            </Box>
            {fetchAllChatLength < 1 ? (
              <>
                <Box
                  height="150px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="250px"
                >
                  <Flex flexDirection="column" alignItems="center">
                    <Text mt="10px" fontSize="x-large">
                      No chats yet
                    </Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <>
                <Box maxHeight="400px" overflowY="auto" id="scrollable-chat">
                  <InfiniteScroll
                    dataLength={fetchChatData}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner />}
                    scrollableTarget="scrollable-chat"
                  >
                    {fetchAllChat?.pages.map((page) =>
                      page.chatModels.map((chat) => (
                        <MenuItem
                          key={chat.chatId}
                          onClick={() => handleAddToChatArray(chat.chatId)}
                        >
                          <MessengerChatList chat={chat} />
                        </MenuItem>
                      ))
                    )}
                  </InfiniteScroll>
                </Box>
              </>
            )}
          </MenuList>
        </Menu>
        {/* <Box
          h="22px"
          w="22px"
          bg="red"
          borderRadius="full"
          position="absolute"
          top="7px"
          right="103px"
        >
          <Text
            textAlign="center"
            color="white"
            fontSize="sm"
            fontWeight="semibold"
          >
            1
          </Text>
        </Box> */}
      </Flex>

      <Box position="fixed" bottom="0" zIndex={100}>
        {isLargeScreen && (
          <>
            {chatArray.map((chat) => (
              <ChatCard
                key={chat.chatId}
                chatId={chat.chatId}
                index={chat.index}
                userId={userId}
                isMaximized={chat.isMaximized}
              />
            ))}
          </>
        )}
      </Box>
      {(!isPostImageModalOpen ||
        (isPostImageModalOpen && chatArray.length >= 1)) &&
        isLargeScreen && (
          <Box position="fixed" bottom="15px" right="17px">
            <IconButton
              aria-label="message"
              icon={<AiOutlineEdit size="25px" />}
              bg={colorMode === "dark" ? "#303030" : "gray.200"}
              _hover={{
                bg: colorMode === "dark" ? "#484848" : "gray.300",
              }}
              isRound
              size="lg"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() => setIsNewMessageMaximized(!isNewMessageMaximized)}
            />
          </Box>
        )}

      {isHover && (
        <Card
          position="fixed"
          bottom="20px"
          right="70px"
          padding={2}
          zIndex={150}
        >
          <Text
            textTransform="capitalize"
            isTruncated={true}
            maxWidth="200px"
            fontSize="sm"
            fontWeight="semibold"
          >
            New message
          </Text>
        </Card>
      )}
      {isNewMessageMaximized && (
        <Box position="fixed" bottom="0px" right="85px" zIndex={10}>
          <NewMessage />
        </Box>
      )}
    </>
  );
};

export default Messenger;
