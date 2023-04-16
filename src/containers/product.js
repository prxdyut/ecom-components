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
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { BsPlus, BsDash } from "react-icons/bs";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper";

import { useRouter } from "next/router";

export default function HomeContainer(props) {
  const pageURL = useRouter().asPath;
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
              {[
                "https://wallpaperaccess.com/full/4622434.jpg",
                "https://swiperjs.com/demos/images/nature-2.jpg",
                "https://swiperjs.com/demos/images/nature-3.jpg",
                "https://swiperjs.com/demos/images/nature-4.jpg",
                "https://swiperjs.com/demos/images/nature-5.jpg",
                "https://swiperjs.com/demos/images/nature-6.jpg",
                "https://swiperjs.com/demos/images/nature-7.jpg",
              ].map((url, index) => (
                <SwiperSlide>
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
                        src={url}
                        srcSet={url}
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
              Chicken Dum Biryani
            </Typography>
            <Typography variant="subtitle1">category</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ border: 1 }} size="small">
              <BsPlus />
            </IconButton>
            <Typography variant="h5" sx={{ px: 2 }}>
              3
            </Typography>
            <IconButton sx={{ border: 1 }} size="small">
              <BsDash />
            </IconButton>
          </Box>
          <Stack gap={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Variant</InputLabel>
              <Select label="Variant" size="small" value="10">
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Variant</InputLabel>
              <Select label="Variant" size="small" value="10">
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Box>Description</Box>
        </Stack>
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
            <Button variant="outlined">Add to Tray</Button>
            <Button variant="contained">Order Now</Button>
          </ButtonGroup>
        </Container>
      </Box>
      <Box sx={{ height: 68.5 }} />
    </>
  );
}
