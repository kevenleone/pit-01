import React from 'react';

export default function Header({ title, subtitle, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <p>
        {children}
      </p>
    </div>
  );
}
