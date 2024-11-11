import React from 'react';

const Table = ({ data, columns }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-friezOrange-500 text-gray-700 text-sm">
          {columns.map((col) => (
            <th key={col.key} className="py-2 px-3 text-left font-semibold">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b hover:bg-gray-50 text-sm">
            {columns.map((col) => (
              <td key={col.key} className="py-2 px-3">
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
      <div className="bg-white">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-left w-full text-lg font-semibold mb-4 uppercase">
            {title} {showOrderCount && <span className="text-green-600">({orderCount})</span>}
          </h1>
        </header>
  
        <div className="w-full overflow-x-auto">
          <Table data={orders} columns={columns} />
        </div>
      </div>
    );
  };
  

export default DataCard;
