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
  CardActions,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Fade,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { BsPlus, BsDash } from "react-icons/bs";

export default function TrayContainer() {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    head: null,
    price: null,
    firstRender: true,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => handleOpen(), [modalContent]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          {["", "", ""].map((item, index) => (
            <React.Fragment>
              <Card elevation={0}>
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <AspectRatio
                    ratio="1/1"
                    sx={{ minWidth: "33.3%" }}
                  ></AspectRatio>
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="500">
                        Chicken Dum Biryani
                      </Typography>
                      <Typography variant="body2">
                        Chicken Dum Biryani
                      </Typography>
                      <GiChickenOven style={{ color: "red" }} />
                    </Box>
                  </Box>
                </CardActionArea>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "end",
                    }}
                  >
                    <IconButton sx={{ border: 1 }} size="small">
                      <BsPlus />
                    </IconButton>
                    <Typography variant="body1" sx={{ px: 2 }}>
                      3
                    </Typography>
                    <IconButton sx={{ border: 1 }} size="small">
                      <BsDash />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </React.Fragment>
          ))}
          <Box></Box>
        </Stack>
        <Box sx={{ pt: 2 }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1">Total:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                fontWeight="500"
                sx={{ textAlign: "end" }}
              >
                $200
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="400">
                Discount:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                fontWeight="500"
                sx={{ textAlign: "end" }}
              >
                -$10
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ pt: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained">
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
