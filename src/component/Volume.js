import React from 'react'
import PropTypes from 'prop-types'


function Volume({ volume, handleVolumeChange }) {
    return (
        <div><input type="range" name="volume" value={volume} id="volume" min="0" max="100" onChange={handleVolumeChange} /></div>
    )
}

Volume.propTypes = {
    volume: PropTypes.number.isRequired,
    handleVolumeChange: PropTypes.func.isRequired
}
export default Volume