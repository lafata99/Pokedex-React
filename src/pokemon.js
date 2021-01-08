import React, { useEffect, useState } from "react";
import { Grid, Typography, Link, CircularProgress, Button, Card, Table, TableBody, TableRow, TableHead, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles({
  pokemonContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "20px",
    alignItems: "center"
  },
  pokemonContent: {
    alignItems: "center",
    textAlign: "center"
  },
  tableContent: {
    textAlign: "center"
  },
});

const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Grid className={classes.pokemonContainer} >
          <Card>

            <Typography variant="h1" className={classes.pokemonContent}>
              {`${id}.`} {toFirstCharUppercase(name)}

            </Typography>
            <div className={classes.pokemonContent} >
            <img  style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.tableContent} variant="h3" >Pokemon Info</Typography>
                  </TableCell>
                  <TableCell>
                    <img src={front_default} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                <TableCell>
                    {"Species: "}
                    </TableCell>
                    <TableCell>
                    <Link href={species.url}>{species.name} </Link>
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Height: </TableCell>
                  <TableCell> {height} m </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weight: </TableCell>
                  <TableCell>{weight} kg </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Types:</TableCell>
                  <TableCell>
                    {types.map((typeInfo) => {
                      const { type } = typeInfo;
                      const { name } = type;
                      return <Typography key={name}> {`${name}`}</Typography>;
                    })}
                  </TableCell>
                </TableRow>

              </TableBody>




            </Table>
          </Card>
        </Grid>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Grid container justify="center">
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
        </Grid>
      )}
    </>
  );
};

export default Pokemon;