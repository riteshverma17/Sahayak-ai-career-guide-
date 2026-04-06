import React, { useState, useMemo } from 'react';
import { colleges } from '../data/collegesData.js';
import SEO from '../components/SEO';

const STREAM_CATEGORIES = ["All", "Engineering", "Medical", "Management", "Science/Arts", "Law"];
const INST_TYPES = ["All", "Government", "Private", "Deemed"];

export default function CollegeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredColleges = useMemo(() => {
    return colleges.filter(c => {
      const term = searchTerm.toLowerCase();

      // Global Text Search (Name, Location, Programs arrays)
      const matchesName = Boolean(c.name && c.name.toLowerCase().includes(term));
      const matchesLocation = Boolean(c.location && c.location.toLowerCase().includes(term));
      const matchesProgram = Boolean(c.programs && c.programs.some(p => p.toLowerCase().includes(term)));

      const textMatch = matchesName || matchesLocation || matchesProgram;       

      // Institution Type Match (Government, Private, Deemed)
      let typeMatch = true;
      if (selectedType !== "All") {
        typeMatch = c.type === selectedType;
      }
      // Category / Stream mapping
      const programsStr = c.programs ? c.programs.join(' ').toLowerCase() : '';
      const nameStr = c.name ? c.name.toLowerCase() : '';
      let categoryMatch = true;

      if (selectedCategory === "Engineering") {
        categoryMatch = programsStr.includes('tech') || programsStr.includes('b.e') || programsStr.includes('m.e') || nameStr.includes('technology') || nameStr.includes('engineering');
      } else if (selectedCategory === "Medical") {
        categoryMatch = programsStr.includes('mbbs') || programsStr.includes('md') || programsStr.includes('ms') || programsStr.includes('bds') || programsStr.includes('nursing') || nameStr.includes('medical') || nameStr.includes('science');
      } else if (selectedCategory === "Management") {
        categoryMatch = programsStr.includes('mba') || programsStr.includes('bba') || programsStr.includes('pgdm') || nameStr.includes('management');
      } else if (selectedCategory === "Science/Arts") {
        categoryMatch = programsStr.includes('b.sc') || programsStr.includes('m.sc') || programsStr.includes('ba') || programsStr.includes('ma') || programsStr.includes('b.com') || nameStr.includes('social') || nameStr.includes('art');
      } else if (selectedCategory === "Law") {
        categoryMatch = programsStr.includes('llb') || programsStr.includes('llm') || nameStr.includes('law') || nameStr.includes('juridical');
      }

      return textMatch && categoryMatch && typeMatch;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <div className="p-6">
      <SEO 
        title="College Directory & Rankings Toolkit - Sahayak"
        description="Search through India's top Engineering, Medical, Management, and Arts universities. View placement data, fees structures, and reviews on Sahayak."
        url="https://sahayak.live/college-directory"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Top Colleges Directory</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Explore top-ranked government and private colleges across India. Find programs, locations, and rankings to help you make informed decisions about your higher education journey.</p>

      {/* Two-Tier Filters */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 p-1 rounded">📚</span> Filter by Stream:
          </h3>
          <div className="flex flex-wrap gap-2">
            {STREAM_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition border shadow-sm \${
                  selectedCategory === category 
                  ? 'bg-indigo-600 text-black border-indigo-600 shadow-md transform scale-105' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100 hover:-translate-y-0.5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 p-1 rounded">🏛️</span> Filter by Institution Type:
          </h3>
          <div className="flex flex-wrap gap-2">
            {INST_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition border shadow-sm \${
                  selectedType === type 
                  ? 'bg-green-600 text-black border-green-600 shadow-md transform scale-105' 
                  : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:-translate-y-0.5'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search colleges by name, location, or stream/program (e.g. 'B.Tech', 'Delhi')..."
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4 text-sm text-gray-600 font-medium">
        Showing results for: 
        <span className="font-bold text-indigo-700 ml-1">
          {selectedCategory === 'All' ? 'All Streams' : selectedCategory}
        </span> 
        <span className="mx-2">in</span>
        <span className="font-bold text-green-700">
          {selectedType === 'All' ? 'All Institution Types' : `${selectedType} Institutions`}
        </span>
        {searchTerm && (
          <>
            <span className="mx-2">matching</span>
            <span className="font-bold text-gray-800">"{searchTerm}"</span>
          </>
        )}
      </div>

      {filteredColleges.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No colleges found matching your criteria. Try adjusting your search term or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map(college => (
            <div key={college.id} className="bg-white rounded-xl shadow p-6 border border-gray-100 hover:shadow-lg transition flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{college.name}</h2>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold whitespace-nowrap">{college.type}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">📍 {college.location}</p>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Available Programs:</h3>
                <div className="flex flex-wrap gap-2">
                  {college.programs.map(prog => (
                    <span key={prog} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full">{prog}</span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm mt-auto">
                <span className="text-gray-600">Ranking: <span className="font-bold text-gray-900">{college.ranking}</span></span>
                {college.website ? (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">Official Website &rarr;</a>
                ) : (
                  <span className="text-gray-400 italic">Website N/A</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
