import { HashLoader } from "react-spinners";
import React from 'react';

const Loader = (props) => {
    return(
        <div className="sweet-loading">
            <HashLoader
              className="loader"
              size={100}
              color={"#000"}
              loading={props.loading}
        />
      </div>
    )
}

export default Loader;