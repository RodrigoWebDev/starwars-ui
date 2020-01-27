import React from "react"
import user from "../images/user-icon.png"
import "../styles/char.css"

const Char = ({ info }) => (
    <div className="char">
        <img src={user} />
        <div>
            <h2 className="char-name">{info.name}</h2>
            <span className="char-birth">{info.birth_year}</span>
            <span className="char-gender">{info.birth_year}</span>
            <span className="char-birth">{info.gender}</span>
            <span className="char-species"></span>
            <div className="char-starships">
                <h2>Starships</h2>
            </div>
            <ul>
                <li>Starship 1</li>
                <li>Starship 2</li>
            </ul>
        </div>
    </div>
)

export default Char;