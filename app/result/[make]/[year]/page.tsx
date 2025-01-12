import React from 'react';

interface Result {
  Make_ID: number;
  Model_ID: number;
  Make_Name: string;
  Model_Name: string;
}

interface Props {
  params: {
    make: string;
    year: string;
  }
}

async function ResultPage({ params }: Props) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${params.make}/modelyear/${params.year}?format=json`
  );
  const data = await response.json();
  const results = data.Results || [];

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Available Models
      </h2>
      <ul className="space-y-4">
        {results.map((result: Result, index: number) => (
          <li
            key={`${result.Make_ID}-${result.Model_ID}-${index}`}
            className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-4 shadow-sm"
          >
            <div className="text-gray-700 text-lg font-medium">
              {result.Make_Name}
            </div>
            <span className="ml-auto text-gray-500">
              {result.Model_Name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultPage;
