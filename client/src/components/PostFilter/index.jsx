import React, { useState } from 'react';

const PostFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filter-bar" style={{ display: 'flex', gap: '10px' }}>
      <button
        className={`filter-item ${activeFilter === 'All' ? 'active' : ''}`}
        onClick={() => handleClick('All')}
        style={{ padding: '5px 10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
      >
        All
      </button>
      <button
        className={`filter-item ${activeFilter === 'News' ? 'active' : ''}`}
        onClick={() => handleClick('NEWS')}
        style={{ padding: '5px 10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
      >
        News
      </button>
      <button
        className={`filter-item ${activeFilter === 'For Sale' ? 'active' : ''}`}
        onClick={() => handleClick('FOR_SALE')}
        style={{ padding: '5px 10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
      >
        For Sale
      </button>
      <button
        className={`filter-item ${activeFilter === 'Crime' ? 'active' : ''}`}
        onClick={() => handleClick('CRIME')}
        style={{ padding: '5px 10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
      >
        Crime
      </button>
      <button
        className={`filter-item ${activeFilter === 'Infrastructure' ? 'active' : ''}`}
        onClick={() => handleClick('INFRASTRUCTURE')}
        style={{ padding: '5px 10px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
      >
        Infrastructure
      </button>
    </div>
  );
};

export default PostFilter;
