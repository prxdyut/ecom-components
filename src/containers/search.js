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
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
} from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  "WO9X3SJZF9",
  "f6a5f8f1be213b772eaef963172b3f64"
);

export default function OrderContainer() {
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState(true);

  function Hit({ hit }) {
    return (
      <article>
        <h1>{hit.name}</h1>
        <p>${hit.price.formatted_with_symbol}</p>
        {JSON.stringify(hit)}
        <hr />
      </article>
    );
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar></Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <InstantSearch searchClient={searchClient} indexName="products">
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </Container>
    </>
  );
}
