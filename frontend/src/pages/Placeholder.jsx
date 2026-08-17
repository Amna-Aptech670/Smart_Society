import React from 'react'

const Placeholder = ({ title }) => {
  return (
    <div>
      <h2 className="font-heading text-2xl mb-2">{title}</h2>
      <p className="text-muted-foreground">this page isnt built yet, coming in a later step</p>
    </div>
  );
};

export default Placeholder;