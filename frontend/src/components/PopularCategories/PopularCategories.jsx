import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Men', path: '/category/men' },
  { name: 'Women', path: '/category/women' },
  { name: 'Kids', path: '/category/kids' },
  { name: 'Winter', path: '/category/winter' },
  { name: 'Accessories', path: '/category/accessories' },
  { name: 'Shoes', path: '/category/shoes' },
];

function PopularCategories() {
  return (
    <section className="popular-categories-container w-full flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
      <div className="category-grid grid grid-cols-2 md:grid-cols-3 gap-6 w-11/12 max-w-6xl">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="category-card bg-white rounded-lg shadow p-6 text-center font-semibold hover:scale-105 transition-transform"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularCategories;
