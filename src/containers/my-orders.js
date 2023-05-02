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
import Link from "next/link";

export default function OrderContainer() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    fetch("/api/orders?user=cstmr_VKXmwDEyzqorgD")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
  console.log(data);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>
      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          {/* <Stack gap={2}>
            {!!data &&
              data.order.line_items.map((product, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Box sx={{ my: 1 }} />}
                  <Link href={`/product/${product.id}`}>
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
                              {product.name}
                            </Typography>
                            <Typography variant="body2">
                              Chicken Dum Biryani
                            </Typography>
                            <GiChickenOven style={{ color: "red" }} />
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Link>
                </React.Fragment>
              ))}
          </Stack> */}
          {!!data &&
            data.map((orders) => (
              <React.Fragment>
                <Link href={"./orders/" + orders.id + "/"}>
                  {orders.id}
                  <br />
                  {orders.order.line_items.map((product) => (
                    <React.Fragment>
                      {product.product_name} :
                      {product.price.formatted_with_symbol}
                      
                      <br />
                    </React.Fragment>
                  ))}
                  {orders.order_value.formatted_with_symbol}
                </Link>
                <hr />
              </React.Fragment>
            ))}
        </Stack>
      </Container>
    </>
  );
}
