import React, { Component } from 'react';

class App extends Component {
  state = {
    data: [],
    idx: 0,
    quote: "",
    author: ""
  };

  componentDidMount = () => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(res => res.json())
      .then(
        result => {
          let tempIdx = Math.floor(Math.random() * result.quotes.length);
          this.setState({
            isLoaded: true,
            data: result.quotes,
            author: result.quotes[tempIdx].author,
            quote: result.quotes[tempIdx].quote
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  getQuote = () => {
    let { data, idx } = this.state;
    this.setState({
      idx: Math.floor(Math.random() * data.length),
      quote: data[idx].quote,
      author: data[idx].author
    });
  };

  render() {
    let { quote, author } = this.state;

    return (
      <div id="quote-box" className="container">
        <div className="card bg-light">
          <div className="card-header">
            <h1 className="text-center">Quote Generator</h1>
          </div>
          <div className="card-body" style={{ minHeight: 300 }}>
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-8">
                <p
                  id="text"
                  className="text-center"
                  style={{ fontFamily: "'Pacifico', cursive", fontSize: 24 }}
                >
                  <i className="fa fa-quote-left" />{" "}{quote}{" "}
                  <i className="fa fa-quote-right" />
                </p>
              </div>
              <div className="col-sm-2" />
            </div>
            <div className="row">
              <div className="col-sm-8" />
              <div className="col-sm-4">
                <p id="author" className="text-left">
                  - {author} -
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-sm-9" />
              <div className="col-sm-3">
                <button
                  onClick={this.getQuote}
                  id="new-quote"
                  className="btn btn-success mr-2"
                >
                  new quote
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text="${quote}"%20by%20${author}&url=https://gitsushi.github.io/quote-generator/`}
                  rel="noopener noreferrer"
                  target="_blank"
                  id="tweet-quote"
                  className="btn btn-primary"
                >
                  tweet quote
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
