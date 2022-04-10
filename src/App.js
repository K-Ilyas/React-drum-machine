// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Drum from './component/Drum';
import Display from './component/Display';
import Volume from './component/Volume';
import { DRUMS_FIRST } from './DrumsData';
import './css/styles.css';

const offStyle = {
  transform: 'translateX(100%)',
  backgroundColor: 'rgb(245, 40, 40)'
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 20,
      display: "",
      event: null,
      power: true
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePlayAudio = this.handlePlayAudio.bind(this);
    this.handlePower = this.handlePower.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  handleDisplayChange = () => {
    this.setState({ display: "" });
  }

  handleVolumeChange = (event) => {
    clearTimeout(this.state.event);
    this.setState({ volume: event.target.value });
    this.setState((prevState) => ({
      display: `volume: ${prevState.volume}`
    }));
    this.setState({
      event: setTimeout(this.handleDisplayChange
        , 1500)
    });
  }

  handlePlayAudio = (target, name, volume) => {
    let tragetNode = document.getElementById(target);
    this.setState({ display: name });
    tragetNode.currentTime = 0;
    tragetNode.volume = volume !== 0 ? Number((volume / 100)) : 0.0;
    tragetNode.play();
  }

  handleKeyPress(event) {
    if (this.state.power) {
      let result = DRUMS_FIRST.filter((e) => (e.keyCode === event.keyCode || e.keyCode === event.keyCode - 32));
      let element = null;
      if (result.length > 0) {
        this.handlePlayAudio(result[0].targetKey, result[0].name, this.state.volume);
        document.getElementById(result[0].name).style.opacity = 0.8;
        element = document.getElementById(result[0].name).style;
        element.opacity = 0.8;
        element.transform = 'scale(1.1)';
        setTimeout(() => {
          element.opacity = 1;
          element.transform = 'scale(1)';
        }, 100);
      }
    }
  }

  handlePower = () => {
    this.setState((pervState) => ({
      power: !pervState.power,
      display: ""
    }));
    document.getElementById("volume").disabled = this.state.power;
  }

  render() {
    const DATA = DRUMS_FIRST.map((e) => {
      return <Drum key={e.keyCode} idName={e.targetKey} name={e.name} src={e.url} volume={Number(this.state.volume)} play={this.state.power ? this.handlePlayAudio : null} power={this.state.power} />;
    });
    return (
      <div id="drum-machine">
        <h1 id="title">Drum Machine</h1>
        <Display value={this.state.display} />
        <div id="drums">
          {
            DATA
          }
        </div>
        <div className="volume-power">
          <Volume volume={this.state.volume} handleVolumeChange={this.handleVolumeChange} />
          <div id="power" onClick={this.handlePower}>
            <div id="state" style={!this.state.power ? offStyle : null}>
              {
                this.state.power ? "ON" : "OFF"
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default App;