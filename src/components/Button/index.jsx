import React from 'react';

export default function index({ children, onClick, ...otherProps }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" onClick={onClick} {...otherProps}>{children}</button>
  );
}
