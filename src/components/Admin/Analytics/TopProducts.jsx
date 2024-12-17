import React from 'react';
import rank1 from '../../../assets/rank1.png';
import rank2 from '../../../assets/rank2.png';
import rank3 from '../../../assets/rank3.png';
import rank4 from '../../../assets/rank4.png';

const Table = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-4">No data available</p>;
  }

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-friezOrange-500 text-gray-700 dark:bg-friezOrange-600 dark:text-gray-200 text-sm">
          {columns.map((col) => (
            <th key={col.key} className="py-3 px-4 text-left font-semibold">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 text-sm dark:border-gray-600"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className="py-3 px-4 text-lg font-bold text-gray-900 dark:text-gray-200"
              >
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TopProducts = () => {
  const data = [
    {
      rank: '',
      rankIcon: rank1,
      product: 'Zsuper Mini',
      /* totalOrders: '14,891',
      status: 'Sold Out', */
    },
    {
      rank: '',
      rankIcon: rank2,
      product: 'Mini',
      /* totalOrders: '12,891',
      status: 'In Stock', */
    },
    {
      rank: '',
      rankIcon: rank3,
      product: 'Midi',
      /* totalOrders: '10,832',
      status: 'In Stock', */
    },
    {
      rank: '',
      rankIcon: rank4,
      product: 'Maxi',
      /* totalOrders: '8,771',
      status: 'In Stock', */
    },
  ];

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (row) => (
        <img src={row.rankIcon} className='w-12' />
      ),
    },
    {
      key: 'product',
      label: 'Product',
    },

  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h1 className="text-left text-xl uppercase font-bold mb-4 text-gray-900 dark:text-gray-200">
        Top Products
      </h1>
      <div className="w-full overflow-x-auto">
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default TopProducts;
