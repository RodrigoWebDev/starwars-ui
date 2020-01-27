import React from "react"
import "../styles/loader.css"

const Loader = () => (
    <div className="loader-container">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
)

export default Loader;