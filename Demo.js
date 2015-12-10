import React from "react";
const { Component } = React;
import { Surface } from "gl-react-dom";
import VRView from "./VRView";
class Demo extends Component {

  constructor () {
    super();
    this.state = {
      time: 0.02,
      frames: 1
    };
  }

  componentDidMount () {
    let startTime;
    const loop = t => {
      requestAnimationFrame(loop);
      if (!startTime) startTime = t;
      const time = (t - startTime) / 1000;
      this.setState({ time: time, frames: this.state.frames + 1 });
    };
    requestAnimationFrame(loop);
  }

  render () {
    const {time} = this.state;
    return <div>
      <Surface width={480} height={260}>
        <VRView time={time}>
          <video autoPlay loop>
            <source type="video/mp4" src="video.mp4" />
          </video>
        </VRView>
      </Surface>

    </div>;
  }

}

export default Demo;
