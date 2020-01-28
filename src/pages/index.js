//Libs
import React, { Component } from "react"
import axios from "axios"
import Pagination from "../components/Pagination"
import Char from "../components/Char"
import Loader from "../components/Loader"
import Helmet from 'react-helmet'

//Images
import logo from "../images/Starwars.png"

class IndexPage extends Component {

    setLoader = (action) => this.setState({ isFetching: action });

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
        this.setLoader(true);
        axios.get("https://swapi.co/api/people/")
            .then(data => {
                let _data = data.data.results;
                this.setState({
                    info: _data,
                    nextPage: data.data.next,
                    prevPage: data.data.previous
                });
                this.setLoader(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePagination = (url) => {
        //Colocando return, evita da função ser invocada na view sem o evento de click
        return (e) => {
            this.setLoader(true);
            axios.get(url)
                .then(data => {

                    let _data = data.data.results;
                    let _next = data.data.next;
                    let _prev = data.data.previous;

                    this.setState({
                        info: _data,
                        nextPage: _next,
                        prevPage: _prev,
                    })

                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    this.setLoader(false);
                })
        }
    };

    render() {

        const nextPage = this.state.nextPage;
        const prevPage = this.state.prevPage;
        const isFetching = this.state.isFetching;

        return (
            <>
                <Helmet>
                    <title>Star Wars App</title>
                </Helmet>
                <div className="container">
                    <img className="logo" src={logo} />
                    {isFetching && <Loader />}
                    {!isFetching &&
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
                    <footer>
                        Developed by <a href="http://rqueiroz.netlify.com/" target="_blank"> me </a> :)
                    </footer>
                </div>
            </>
        )
    }
}

export default IndexPage