import React, { Component } from "react"
import user from "../images/user-icon.png"
import "../styles/char.css"
import axios from "axios"
import Swal from 'sweetalert2'

class Char extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starshipsActive: [],
            onClick: false,
            starshipsHTML: ''
        }
    }

    seeMore = (starships) => {
        return () => {
            this.setState({ starshipsActive: [], onClick: true });
            const accumulator = [];
            let starshipsHTML = ''
            console.log('starships:::', starships);
            if (Array.isArray(starships) && starships.length) {
                starships.map(async (item, i) => {
                    await axios.get(item)
                        .then(data => {
                            accumulator.push(data.data);
                            this.setState({
                                starshipsActive: accumulator,
                            });

                            starshipsHTML += "<li>" + data.data.name + "</li>";

                            if ((starships.length - 1) === i) {
                                Swal.fire({
                                    title: 'Error!',
                                    html: starshipsHTML,
                                    icon: 'error',
                                    confirmButtonText: 'Cool'
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        }).finally(() => {
                            console.log("Finally> ", starshipsHTML);

                        });
                });
            }
        }
    };

    render() {
        return (
            <div className="char">
                <img src={user} />
                <div>
                    <h2 className="char-name">{this.props.info.name}</h2>
                    <span className="char-birth">{this.props.info.birth_year}</span>
                    <span className="char-gender">{this.props.info.birth_year}</span>
                    <span className="char-birth">{this.props.info.gender}</span>
                    <span className="char-species"></span>
                    <div className="char-starships">
                        {this.props.info.starships.length > 0 &&
                            <button className="btn" onClick={this.seeMore(this.props.info.starships)}>Starships</button>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Char;