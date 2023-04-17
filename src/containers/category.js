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
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { GiChickenOven } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import * as API from "../api";

function Products(props) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    API.getProducts(props.slug).then((response) => setData(response));
  }, [props.slug]);

  return (
    !!data &&
    data.map((product, index) => (
      <React.Fragment>
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
                    {product.name}
                  </Typography>
                  <Typography variant="body2">Chicken Dum Biryani</Typography>
                  <GiChickenOven style={{ color: "red" }} />
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Link>
      </React.Fragment>
    ))
  );
}

export default function HomeContainer(props) {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const { slug } = router.query;

  React.useEffect(() => {
    API.getCategory(slug).then((response) => setData(response));
  }, [slug]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar />
      </AppBar>
      <Container sx={{ py: 2 }}>
        <Stack gap={2}>
          {!!data &&
            data.children.map((subCategory) => (
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                >
                  <AspectRatio
                    ratio="2.5/1"
                    sx={{ width: "100%" }}
                  ></AspectRatio>
                  <Typography variant="body1" fontWeight="600" sx={{ pt: 2 }}>
                    {subCategory.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ pt: 1 }}>
                    $200 - $300
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pb: 1, px: 1 }}>
                  <Products slug={subCategory.slug} />
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
      </Container>
    </>
  );
}
