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
import { useRouter } from "next/router";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { BsPlus, BsDash } from "react-icons/bs";
import * as API from "../api";
import Link from "next/link";

const Product = (props) => {
  const item = props;
  const [quantity, setQuantity] = React.useState();

  React.useEffect(() => setQuantity(props.quantity), []);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    API.updateCartProductQuantity(props.id, quantity + 1).then((response) =>
      console.log(response)
    );
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
    API.updateCartProductQuantity(props.id, quantity - 1).then((response) =>
      console.log(response)
    );
  };

  return (
    <React.Fragment>
      <Card elevation={0}>
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <AspectRatio ratio="1/1" sx={{ minWidth: "33.3%" }}></AspectRatio>
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
                {item.name}
              </Typography>
              <Typography variant="body2">Chicken Dum Biryani</Typography>
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
            <IconButton
              sx={{ border: 1 }}
              size="small"
              onClick={increaseQuantity}
            >
              <BsPlus />
            </IconButton>
            <Typography variant="body1" sx={{ px: 2 }}>
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
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default function TrayContainer() {
  const router = useRouter();
  const [data, setData] = React.useState(null);

  API.getCart().then((response) => setData(response));

  console.log(data);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          {!!data &&
            data.line_items.map((item, index) => (
              <Product {...item} key={index} />
            ))}
          <Box></Box>
        </Stack>
        <Box sx={{ pt: 2 }}>
          {!!data && (
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
                  {data.subtotal.formatted_with_symbol}
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
                  0
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ pt: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    API.getCheckoutId(data.id).then((checkoutID) =>
                      router.push(`/order/${checkoutID}`)
                    )
                  }
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
