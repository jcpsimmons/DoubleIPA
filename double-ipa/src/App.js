import React, { Component } from "react";
import ResultsBlock from "./Components/ResultsBlock";

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
        <div>
          <form onSubmit={this.updateSkus}>
            <input
              type="text"
              name=""
              id="SkuInput"
              onChange={this.onInputChange}
            />
            <button>Search</button>
          </form>
        </div>
        <div>
          {this.state.searchedSkus.length
            ? this.state.searchedSkus.map(sku => {
                return <ResultsBlock key={sku} sku={sku} />;
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default App;
