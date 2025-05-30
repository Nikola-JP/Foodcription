import React from 'react';

const NewsletterSection = () => (
  <div className="bg-gray-100 py-12">
    <div className="max-w-xl mx-auto text-center">
      <h3 className="text-xl font-bold mb-2">Pratite naše najnovije jelovnike</h3>
      <p className="text-gray-600 mb-4">Sa našim dnevnim newsletterom</p>
      <div className="flex gap-2 justify-center">
        <input type="email" placeholder="you@example.com" className="border p-2 rounded w-2/3" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  </div>
);

export default NewsletterSection;
