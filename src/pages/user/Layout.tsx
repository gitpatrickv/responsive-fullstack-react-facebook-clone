import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Navbar/Navbar";

import { useAuthQueryStore } from "../../store/auth-store";
import CreateStoryModal from "../../components/user/HomePage/CreateStoryModal";
import NavbarRight from "../../components/user/Navbar/NavbarRight";

const Layout = () => {
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return (
    <>
      {jwtToken && <Navbar />}
      <Box position="fixed" right="0px" top="0px" zIndex="2000" mt="12px">
        <NavbarRight />
      </Box>
      <Grid
        templateColumns="1fr"
        templateAreas={`"main"`}
        // padding={{ base: 1, md: 10, lg: 15, xl: 2 }}
        mt={{ base: "10px", xl: "60px" }}
      >
        <GridItem area="main" as="main">
          <Box>
            <Outlet />
            {/* <ScrollRestoration /> */}
          </Box>
          <CreateStoryModal />
        </GridItem>
      </Grid>
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
