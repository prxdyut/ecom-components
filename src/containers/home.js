import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "next/link";

export default function HomeContainer() {
  const categories = [];
  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>
      <Container sx={{ py: 2 }}>
        <Grid container>
          {categories.map((category, index) => (
            <Grid item xs={3} key={index}>
              <Link
                href={`/category/${category.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <AspectRatio
                  ratio="1/1"
                  sx={{
                    width: "calc(100% - 24px)",
                    py: 1,
                    borderRadius: "50%",
                  }}
                >
                  <Paper sx={{}}></Paper>
                </AspectRatio>
                <Typography variant="body2" textAlign="center" sx={{ p: 0.5 }}>
                  {category.name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
