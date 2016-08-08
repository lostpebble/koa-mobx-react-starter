import React from 'react';

export default function Layout(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}
/*

Layout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.any,
};
*/
