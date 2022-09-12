import React from 'react';
import { getInlineLoader } from '../Helpers';

export default function MainLoader(props) {
  return (
    <div id="mainLoader" className="MainLoader">
      { getInlineLoader({
        width: "50px",
        height:"50px",
      }) }
    </div>
  )
}
