import React from "react"
import Visuals from '../components/Visuals.js'

class MainContainer extends React.Component {
    state = { isMounted: true };
  
    render() {
      const { isMounted = true } = this.state;
      return (
        <div id="main-container" >
          <button
            onClick={() =>
              this.setState(state => ({ isMounted: !state.isMounted }))
            }
          >
            {isMounted ? "Unmount" : "Mount"}
          </button>
          {isMounted && <Visuals />}
        </div>
      );
    }
  }
  
export default MainContainer 