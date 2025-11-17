import React from 'react';

const PagePlaceholder = ({ title, description }) => {
  return (
    <section className="page-placeholder">
      <div className="page-placeholder__content">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
};

export default PagePlaceholder;

