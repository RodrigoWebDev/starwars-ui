//Libs
import React, { Component } from "react"
import axios from "axios"

//Components

import Pagination from "../components/Pagination"
import Char from "../components/Char"
import Loader from "../components/Loader"

//Images
import logo from "../images/Starwars.png"


class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      nextPage: null,
      prevPage: null,
      isFetching: false
    }
  }

  componentDidMount() {
    axios.get("https://swapi.co/api/people/")
      .then(data => {
        this.setState({
          isFetching: true
        })
        let _data = data.data.results;

        this.setState({
          info: _data,
          nextPage: data.data.next,
          prevPage: data.data.previous
        })

        /*this.state.info.map( e => {
          ili
        })

        this.state.info.map( (e , i) => {

          let starships = e.starships;
          //console.log("STARSHIPS > ", starships);
          if(starships.length > 0){
            starships.map( j => {
              axios.get(j)
                .then( k => {
                  //console.log("StarShip GET >>>", k.data.name);
                  //console.log(this.state.info);
                })
            })
          }
        })*/
      })
      .catch(error => {
        console.log(error);
      })

      this.setState({
        isFetching: false
      })
  }

  handlePagination = (url) => {
    //Colocando return, evita da função ser invocada na view sem o evento de click
    return (e) => {
      console.log("handlePagination");
      axios.get(url)
        .then(data => {
          this.setState({
            isFetching: true
          })

          let _data = data.data.results
          let _next = data.data.next
          let _prev = data.data.previous

          console.log("DATA >>>", data.data);
          console.log("NEXT >>>", _next);
          console.log("PREV >>>", _prev);

          this.setState({
            info: _data,
            nextPage: _next,
            prevPage: _prev,
          })

        })
        .catch(error => {
          console.error(error);
        })

        this.setState({
          isFetching: false
        })
    }
  }

  render() {

    const nextPage = this.state.nextPage
    const prevPage = this.state.prevPage
    const isFetching = this.state.isFetching

    return (
      <>


        <div className="container">
          <img className="logo" src={logo} />
          <h2 className="subtitle">Characters</h2>
          {!isFetching && <Loader />}
          {isFetching &&
            <ul>
              {
                this.state.info.map(i => (
                  <li key={i.name}>
                    <Char info={i} />
                  </li>
                ))
              }

            </ul>
          }

          <Pagination
            handleNextPage={this.handlePagination(nextPage)}
            handlePrevPage={this.handlePagination(prevPage)}
            btnPrevState={prevPage}
            btnNextState={nextPage}
            currentPage={this.state.currentPage}
          />
          {/*<div className="pagination">
            <button onClick={this.handlePrevPage} className="btn">&lt; Previous Page</button>
            <button onClick={this.handleNextPage} className="btn">Next Page ></button>
          </div>*/}

          <footer>
            Developed by <a href="http://rqueiroz.netlify.com/" target="_blank"> me </a> :)
          </footer>


        </div>
      </>
    )
  }
}

export default IndexPage