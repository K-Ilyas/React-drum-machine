import React from 'react'
import PropTypes from 'prop-types'


function Drum({ idName, name, src, volume, play, power }) {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className='drum-pad' id={name} onClick={play !== null ? play.bind(null, idName, name, volume) : null}>
            <audio className='clip' id={idName} src={src} type="audio/mpeg"  >
            </audio>
            <button type='button' className={power ? "button" : null}>{idName}</button>
        </a>
    )
}

Drum.propTypes = {
    idName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
    play: PropTypes.func.isRequired,
    power: PropTypes.bool.isRequired
}

export default Drum;