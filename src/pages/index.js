import React, { Component } from "react"
import axios from "axios"
import api from "../services/api"

import logo from "../images/Starwars.png"
import user from "../images/user-icon.png"

//https://swapi.co/api/people/

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: []
    }
  }

  componentDidMount() {
    axios.get("https://swapi.co/api/people/")
      .then(data => {
        let _data = data.data.results;

        console.log(" DATA > ", _data);

        this.setState({
          info: _data
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

        console.log(">>>>", this.state.info);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .then(() => {
      });
  }

  render() {

    return (
      <>
        <div className="container">
          <img className="logo" src={logo} />
          <h2 className="subtitle">Characters</h2>
          <ul>
            {
              this.state.info.map(i => (
                <li key={i.name}>
                  <div className="char">
                    <img src={user} />
                    <div>
                      <h1 className="char-name">{i.name}</h1>
                      <span className="char-birth">{i.birth_year}</span>
                      <span className="char-gender">{i.birth_year}</span>
                      <span className="char-birth">{i.gender}</span>
                      <span className="char-species"></span>
                    </div>
                  </div>
                </li>
              ))
            }

          </ul>
        </div>

        <footer>
          Developed by <a href="http://rqueiroz.netlify.com/" target="_blank"> me </a> :)
        </footer>
      </>
    )
  }
}

export default IndexPage