'use client';

import { useState } from 'react';

function FilterProduct() {
  const colorOption = [
    {
      name: 'White',
      value: 'white',
    },
    {
      name: 'Black',
      value: 'black',
    },
    {
      name: 'Red',
      value: 'red',
    },
    {
      name: 'Green',
      value: 'green',
    },
    {
      name: 'Blue',
      value: 'blue',
    },
    {
      name: 'Yellow',
      value: 'yellow',
    },
  ];

  const sizeOption = [
    {
      name: 'XS',
      value: 'XS',
    },
    {
      name: 'S',
      value: 'S',
    },
    {
      name: 'M',
      value: 'M',
    },
    {
      name: 'L',
      value: 'L',
    },
    {
      name: 'XL',
      value: 'XL',
    },
  ];

  const sortProductOption = [
    {
      name: 'Price (asc)',
      value: 'price (asc)',
    },
    {
      name: 'Price (desc)',
      value: 'price (desc)',
    },
  ];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  console.log(filters);

  return (
    <form className='my-5 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <h3 className='text-lg font-semibold'>Filter products</h3>
        <select name='color' onChange={handleFilters}>
          <option disabled value=''>
            Color
          </option>
          {colorOption.map(item => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <select name='size' onChange={handleFilters}>
          <option disabled value=''>
            Size
          </option>
          {sizeOption.map(item => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center gap-3'>
        <h3 className='text-lg font-medium'>Sort products:</h3>
        <select>
          <option value=''>Newest</option>
          {sortProductOption.map(item => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
export default FilterProduct;
