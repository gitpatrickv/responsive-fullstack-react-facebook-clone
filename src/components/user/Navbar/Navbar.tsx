import {
  Box,
  Card,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaFacebook, FaHome, FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoClose, IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarRight from "./NavbarRight";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const ref = useRef<HTMLInputElement>(null);

  const [showInput, setShowInput] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(
    location.pathname
  );

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location.pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = ref.current?.value || "";
    navigate(`/search?keyword=${encodeURIComponent(text)}`);
  };

  return (
    <Card
      borderRadius="none"
      position="fixed"
      top="0"
      width="100%"
      zIndex={100}
      as="header"
      padding={2}
    >
      <Grid
        templateColumns="0.5fr 0.5fr 0.5fr"
        templateAreas={`"asideLeft content1 asideRight"`}
        alignItems="center"
        mt="5px"
      >
        {isSmallScreen && (
          <GridItem area="content1">
            <Box w="35px"></Box>
          </GridItem>
        )}
        <Show above="md">
          <GridItem
            area="content1"
            display="flex"
            justifyContent="space-around"
            flexDirection="row"
            alignItems="center"
          >
            <Link to="/home">
              <Box color={selectedPage === "/home" ? "#1877F2" : "white.500"}>
                <FaHome size="35px" />
              </Box>
            </Link>
            <Link to="/friends">
              <Box
                color={selectedPage === "/friends" ? "#1877F2" : "white.500"}
              >
                <FaUserFriends size="35px" />
              </Box>
            </Link>
            <Link to="/watch">
              <Box color={selectedPage === "/watch" ? "#1877F2" : "white.500"}>
                <MdOndemandVideo size="35px" />
              </Box>
            </Link>
            <Link to="/marketplace">
              <Box
                color={
                  selectedPage === "/marketplace" ? "#1877F2" : "white.500"
                }
              >
                <IoStorefrontSharp size="35px" />
              </Box>
            </Link>
            <Link to="/games">
              <Box color={selectedPage === "/games" ? "#1877F2" : "white.500"}>
                <IoLogoGameControllerA size="35px" />
              </Box>
            </Link>
          </GridItem>
        </Show>
        <GridItem
          area="asideLeft"
          display="flex"
          justifyContent="start"
          ml="10px"
          alignItems="center"
        >
          <Link to="/home">
            <Box
              color="#1877F2"
              cursor="pointer"
              mr={{ base: "5px", md: "10px" }}
            >
              <FaFacebook size="35px" />
            </Box>
          </Link>
          {isSmallScreen ? (
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              type="submit"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              border="1px solid"
              borderRadius="20px"
              size="sm"
              onClick={() => setShowInput(!showInput)}
            />
          ) : (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
                <Input
                  ref={ref}
                  borderRadius={20}
                  placeholder="Search Facebook"
                  variant="filled"
                  textAlign={{ base: "center", md: "left" }}
                  fontSize={{ base: "sm", lg: "lg" }}
                  w={{ base: "100%", md: "90%", lg: "80%", xl: "50%" }}
                />
                <InputLeftElement>
                  <IconButton
                    aria-label="Search"
                    icon={<BsSearch />}
                    type="submit"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  />
                </InputLeftElement>
              </InputGroup>
            </form>
          )}
          {isSmallScreen && showInput && (
            <Card
              position="absolute"
              // top="60px"
              top="0"
              left="0"
              right="0"
              p="4"
              zIndex="dropdown"
              borderRadius="none"
            >
              <Box display="flex">
                <Box
                  position="absolute"
                  right="0"
                  top="5px"
                  onClick={() => setShowInput(!showInput)}
                >
                  <IoClose size="20px" />
                </Box>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <InputGroup>
                    <Input
                      ref={ref}
                      borderRadius={20}
                      placeholder="Search Facebook"
                      variant="filled"
                      fontSize={{ base: "sm", md: "md" }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="Search"
                        icon={<BsSearch />}
                        type="submit"
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </form>
              </Box>
            </Card>
          )}
        </GridItem>
        <GridItem area="asideRight">
          <NavbarRight />
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Navbar;
