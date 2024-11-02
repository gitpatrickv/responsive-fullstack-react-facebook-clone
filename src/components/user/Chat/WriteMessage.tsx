import { Box, Flex, IconButton, Input, useColorMode } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
const WriteMessage = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <form>
        <Box position="fixed" bottom="0" width="330px">
          <Flex alignItems="center" padding={2}>
            <IconButton
              aria-label="show"
              icon={<MdAddPhotoAlternate size="22px" />}
              bg="transparent"
              _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
              _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
              isRound
              size="sm"
              mr="10px"
            />
            <input
              type="file"
              accept=".jpeg, .png"
              style={{ display: "none" }}
              // {...register("file")}
              // ref={fileInputRef}
              // onChange={handleFileChange}
            />
            <Input
              placeholder="Aa"
              size="sm"
              borderRadius="20px"
              bg={colorMode === "dark" ? "#303030" : "#F0F0F0"}
              width="100%"
              border="none"
              _focus={{ border: "none", boxShadow: "none" }}
              _hover={{ border: "none" }}
            />
            <IconButton
              aria-label="send"
              icon={<IoMdSend size="20px" />}
              bg="transparent"
              _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
              _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
              // type="submit"
              isRound
              size="sm"
              ml="10px"
            />
          </Flex>
          {/* {imagePreview && (
            <Box mt="10px" ml="40px" display="flex">
              <Image
                src={imagePreview}
                width={{ base: "40%", md: "30%" }}
                height="auto"
              />
              <Box onClick={removeImageClick} ml="5px" cursor="pointer">
                <IoMdCloseCircle size="20px" />
              </Box>
            </Box>
          )} */}
        </Box>
      </form>
    </>
  );
};

export default WriteMessage;
{
  /* </Box>
          {imagePreview && (
            <Box mt="10px" ml="40px" display="flex">
              <Image
                src={imagePreview}
                width={{ base: "40%", md: "30%" }}
                height="auto"
              />
              <Box onClick={removeImageClick} ml="5px" cursor="pointer">
                <IoMdCloseCircle size="20px" />
              </Box>
            </Box>
          )}
        </Box> */
}