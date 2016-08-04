import React from 'react';

export default function Layout(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      {props.children}
    </div>
  );
}

Layout.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.any,
};
