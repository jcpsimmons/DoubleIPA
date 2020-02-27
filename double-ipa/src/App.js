import React, { Component } from "react";
import ResultsBlock from "./Components/ResultsBlock";
import { Container, Button, TextField, Grid } from "@material-ui/core";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      searchedSkus: []
    };
  }

  onInputChange = e => {
    this.setState({ textInput: e.target.value });
  };

  updateSkus = e => {
    e.preventDefault();
    this.setState({
      searchedSkus: this.state.textInput.replace(/ /g, "").split(",")
    });
  };

  render() {
    return (
      <div>
        <Container
          maxWidth="md"
          style={{ textAlign: "center", paddingTop: "1rem" }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                type="text"
                label="SKU(s)"
                id="SkuInput"
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.updateSkus}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md">
          {this.state.searchedSkus.length
            ? this.state.searchedSkus.map(sku => {
                return <ResultsBlock key={sku} sku={sku} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}

export default App;
