import React from 'react';

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
                className="py-3 px-4 text-gray-900 dark:text-gray-200"
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
      rank: 1,
      rankIcon: <span className="text-yellow-500 text-3xl">🏆</span>,
      product: 'Zsuper Mini',
      totalOrders: '14,891',
      status: 'Sold Out',
    },
    {
      rank: 2,
      rankIcon: <span className="text-orange-400 text-3xl">🥈</span>,
      product: 'Mini',
      totalOrders: '12,891',
      status: 'In Stock',
    },
    {
      rank: 3,
      rankIcon: <span className="text-gray-500 text-3xl">🥉</span>,
      product: 'Midi',
      totalOrders: '10,832',
      status: 'In Stock',
    },
    {
      rank: 4,
      rankIcon: <span className="text-gray-700 text-3xl">⭐</span>,
      product: 'Maxi',
      totalOrders: '8,771',
      status: 'In Stock',
    },
  ];

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (row) => (
        <span className="flex items-center">
          {row.rankIcon}
          <span className="ml-2">{row.rank}</span>
        </span>
      ),
    },
    {
      key: 'product',
      label: 'Product',
    },
    {
      key: 'totalOrders',
      label: 'Total Orders',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`font-semibold ${
            row.status === 'Sold Out' ? 'text-red-500' : 'text-green-600'
          }`}
        >
          {row.status}
        </span>
      ),
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
