import React, { Component } from "react"
import user from "../images/user-icon.png"
import "../styles/char.css"
import axios from "axios"
import Swal from 'sweetalert2'
import loader from "../images/loader.png"

class Char extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        }
    }

    setLoader = (action) => this.setState({ isFetching: action });

    seeMore = (starships) => {
        return () => {
            this.setLoader(true)

            let starshipsHTML = ''

            if (Array.isArray(starships) && starships.length) {
                starships.map(async (item, i) => {
                    await axios.get(item)
                        .then(data => {
                            starshipsHTML += "<li>" + data.data.name + "</li>";

                            if ((starships.length - 1) === i) {
                                this.setLoader(false);

                                Swal.fire({
                                    imageUrl: 'https://image.flaticon.com/icons/svg/86/86572.svg',
                                    title: `${this.props.info.name} Starships`,
                                    html: starshipsHTML,
                                    confirmButtonText: 'Close'
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                });
            }
        }
    };

    render() {

        const info = this.props.info
        const Loader = <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        return (
            <div className="char">
                <img src={user} />
                <div>
                    <h2 className="char-name">{info.name}</h2>
                    <span className="char-birth">{info.birth_year}</span>
                    <span className="char-gender">{info.birth_year}</span>
                    <span className="char-birth">{info.gender}</span>
                    <span className="char-species"></span>
                    <div className="char-starships">
                        {info.starships.length > 0 &&
                            <button className="btn" onClick={this.seeMore(info.starships)}>
                                Starships {this.state.isFetching && <img className="char-loader" src={loader} />}
                            </button>
                        }
                    </div>

                </div>
            </div>
        )
    }

}

export default Char;