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
  InputBase,
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
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";

export default function OrderContainer() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [inputData, setInputData] = React.useState("");
  const [checkoutData, setCheckoutData] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    commerce.checkout
      .checkDiscount(id, {
        code: "AD7A8DC75B",
      })
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
  }, [id]);

  // Converting Cart Items Array to Line Items Object
  React.useEffect(() => {
    var localObj = {};
    console.log(id);
    commerce.checkout.getToken(id).then((token) =>
      token.line_items.map((item) => {
        localObj[item.id] = { quantity: item.quantity };
        setCheckoutData({
          ...checkoutData,
          ...localObj,
        });
      })
    );
  }, [id]);

  const capture = () => {
    setLoading(true);
    commerce.checkout
      .capture(id, {
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
        extra_fields: { extr_bO6J5aMgP5EjpK: inputData },
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
        setLoading(false);
        router.push("./" + response.id + "/success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(checkoutData);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "5rem" }}
            // placeholder="A00"
            value={inputData}
            onChange={(event) => {
              setInputData(event.target.value);
            }}
            inputProps={{
              maxLength: 3,
              style: { textAlign: "center" },
            }}
          />
          <Button variant="contained" fullWidth onClick={capture}>
            Place Order
          </Button>
          {loading && "loading"}
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setInputData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            constraints={{ facingMode: "environment" }}
            style={{ width: "40%", height: "40%" }}
          />
        </Stack>
      </Container>
    </>
  );
}
