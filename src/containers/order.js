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
  TextField,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { BsPlus, BsDash } from "react-icons/bs";
import * as API from "../api";
import commerce from "../lib/commerce";
export default function OrderContainer() {
  const [data, setData] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  const [inputData, setInputData] = React.useState(null);
  const [checkoutData, setCheckoutData] = React.useState(null);

  React.useEffect(() => {
    API.getCart().then((response) => setData(response));
  }, []);
  console.log(data);

  const order = () =>
    commerce.checkout
      .generateToken(data.id, { type: "cart" })
      .then((checkout) => setCheckout(checkout.id));

  const capture = () =>
    commerce.checkout
      .capture(checkout, {
        checkoutData,
        customer: {
          firstname: "John",
          lastname: "Doe",
          email: "daspradyut516@gmail.com",
        },
        shipping: {
          name: "John Doe",
          street: "123 Fake St",
          town_city: "San Francisco",
          county_state: "IN-MH",
          postal_zip_code: "401107",
          country: "IN",
        },
        fulfillment: {
          shipping_method: "ship_O3bR5XqBplnzdj",
        },
        billing: {
          name: "John Doe",
          street: "234 Fake St",
          town_city: "San Francisco",
          county_state: "IN-MH",
          postal_zip_code: "401107",
          country: "IN",
        },
        extra_fields: { extr_bO6J5aMgP5EjpK: "14A" },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "02",
            expiry_year: "24",
            cvc: "123",
            postal_zip_code: "94107",
          },
        },
      })
      .then((response) => {
        console.log(response);
        commerce.cart.refresh().then((cart) => console.log(cart));
      });

  // Converting Cart Items Array to Line Items Object
  React.useEffect(() => {
    var localObj = {};
    !!data &&
      data.line_items.map((item) => {
        localObj[item.id] = { quantity: item.quantity };
        setCheckoutData({
          ...checkoutData,
          ...localObj,
        });
      });
  }, [data]);

  console.log(checkoutData);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          <TextField
            id="outlined-controlled"
            label="Controlled"
            size="small"
            // value={name}
            // onChange={(event) => {
            //   setName(event.target.value);
            // }}
          />
          <button onClick={order}>order</button>
          <button onClick={capture}>captue</button>
        </Stack>
      </Container>
    </>
  );
}
