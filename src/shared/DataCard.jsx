import React from 'react';

const Table = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-4">No data available</p>;
  }

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
      <thead>
        <tr className="bg-friezOrange-500 text-gray-700 rounded-lg dark:bg-friezOrange-600 dark:text-gray-200 text-sm">
          {columns.map((col) => (
            <th key={col.key} className="py-2 px-3 text-left font-semibold">
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
                className="py-2 px-3 text-gray-900 dark:text-gray-200"
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

const DataCard = ({ orders, columns, title, showOrderCount = true }) => {
  const orderCount = orders.length;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-left w-full text-lg font-semibold mb-4 uppercase text-gray-900 dark:text-gray-200">
          {title} {showOrderCount && <span className="text-green-600 dark:text-green-400">{`(${orderCount})`}</span>}
        </h1>
      </header>

      <div className="w-full overflow-x-auto">
        <Table data={orders} columns={columns} />
      </div>
    </div>
  );
};

export default DataCard;
