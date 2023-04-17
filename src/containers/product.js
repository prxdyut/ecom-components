import * as React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Container,
  AppBar,
  Toolbar,
  Stack,
  Card,
  Button,
  CardActionArea,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Fade,
  ButtonGroup,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Alert,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { BsPlus, BsDash } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper";

import { useRouter } from "next/router";
import commerce from "../lib/commerce";
import * as API from "../api";

export default function HomeContainer(props) {
  const router = useRouter();
  const pageURL = router.asPath;
  const { id } = router.query;

  const [quantity, setQuantity] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  const resetQuantity = () => {
    setQuantity(1);
  };
  React.useEffect(() => {
    quantity < 1 && setQuantity(1);
  }, [quantity]);
  console.log(quantity);

  // const addToCart = () => {
  //   commerce.cart.add(data.id, quantity).then((response) => {
  //     console.log(response);
  //     setOpen(true);
  //   });
  //   resetQuantity();
  // };

  React.useEffect(() => {
    API.getProduct(id).then((response) => setData(response));
  }, [id]);

  return (
    <>
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: transparent;
        }
      `}</style>
      <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ py: 2 }}>
        {!!data && (
          <Stack gap={2.5}>
            <Paper>
              <Swiper
                style={{ width: "100%", height: "100%" }}
                scrollbar={{
                  hide: true,
                }}
                grabCursor={true}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Scrollbar]}
                className="mySwiper"
              >
                {data.assets.map((asset, index) => (
                  <SwiperSlide key={index}>
                    <Link href={`${pageURL}/gallery?currentIndex=${index}`}>
                      <AspectRatio
                        ratio="1/1"
                        sx={{
                          width: "100%",
                          borderRadius: "inherit",
                          "& .MuiAspectRatio-content": { background: "black" },
                        }}
                        objectFit="contain"
                      >
                        <img
                          src={asset.url}
                          srcSet={asset.url}
                          alt="A beautiful landscape."
                        />
                      </AspectRatio>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Paper>
            <Box>
              <Typography variant="h5" fontWeight="500" sx={{}}>
                {data.name}
              </Typography>
              <Typography variant="subtitle1">
                {data.categories.map((category) => category.name)}
              </Typography>
              <Typography variant="subtitle1">
                {data.price.formatted_with_symbol}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ border: 1 }}
                size="small"
                onClick={increaseQuantity}
              >
                <BsPlus />
              </IconButton>
              <Typography variant="h5" sx={{ px: 2 }}>
                {quantity}
              </Typography>
              <IconButton
                sx={{ border: 1 }}
                size="small"
                onClick={decreaseQuantity}
              >
                <BsDash />
              </IconButton>
            </Box>
            <Box>Description</Box>
          </Stack>
        )}
      </Container>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          bottom: "0",
          background: "white",
          zIndex: "1",
        }}
      >
        <Container sx={{ py: 2 }}>
          <ButtonGroup fullWidth>
            <Button
              variant="outlined"
              // onClick={addToCart}
            >
              Add to Tray
            </Button>
            <Button variant="contained">Order Now</Button>
          </ButtonGroup>
        </Container>
      </Box>
      {open && (
        <Box
          sx={{ width: "100%", position: "fixed", bottom: "0", zIndex: "1" }}
        >
          <Fade in sx={{ mx: 1, my: 2 }}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <MdOutlineCancel fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <Typography>Added to Tray</Typography>
            </Alert>
          </Fade>
        </Box>
      )}
      <Box sx={{ height: 68.5 }} />
    </>
  );
}
