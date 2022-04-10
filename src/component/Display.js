import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function Display({ value }) {
    useEffect(() => {
        document.getElementById("display").innerText = value;
    })
    return (
        <div>
            <p id="display"  ></p>
        </div>
    )
}

Display.propTypes = {
    value: PropTypes.string.isRequired
}


export default Display