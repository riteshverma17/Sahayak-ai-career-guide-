import React, { useState } from 'react';

const CATEGORIES = ["School/Board Exams", "Competitive Exams", "Skill Development"];

const resourceLinks = [
  {
    category: "School/Board Exams",
    title: "NCERT Official E-Books",
    description: "Free digital versions of all NCERT textbooks from class 1 to 12.",
    link: "https://ncert.nic.in/textbook.php",
    type: "PDF",
    tags: ["Books", "CBSE", "Class 1-12"]
  },
  {
    category: "School/Board Exams",
    title: "Physics Wallah Foundation (YouTube)",
    description: "Top curated playlists covering Science, Math, and SST for Class 9 and 10 board exams.",
    link: "https://www.youtube.com/@PW-Foundation/playlists",
    type: "YouTube Playlist",
    tags: ["Class 9", "Class 10", "CBSE"]
  },
  {
    category: "School/Board Exams",
    title: "Magnet Brains (YouTube)",
    description: "100% free high-quality video courses for all classes from Kindergarten to Class 12.",
    link: "https://www.youtube.com/@MagnetBrainsEducation/playlists",
    type: "YouTube Playlist",
    tags: ["All Classes", "Science", "Commerce", "Arts"]
  },
  {
    category: "School/Board Exams",
    title: "DIKSHA Platform",
    description: "National Digital Infrastructure for Teachers and Students by Govt. of India.",
    link: "https://diksha.gov.in/",
    type: "Video & PDF",
    tags: ["Videos", "Interactive", "All Boards"]
  },
  {
    category: "Competitive Exams",
    title: "NTA Abhyas (JEE/NEET)",
    description: "Official mock tests provided by the National Testing Agency for JEE and NEET.",
    link: "https://www.nta.ac.in/Abhyas",
    type: "Mock Tests",
    tags: ["JEE Main", "NEET", "Practice"]
  },
  {
    category: "Competitive Exams",
    title: "JEE Wallah (YouTube)",
    description: "Comprehensive physics, chemistry, and math playlists structured specifically for JEE Mains & Advanced.",
    link: "https://www.youtube.com/@PW-JEEWallah/playlists",
    type: "YouTube Playlist",
    tags: ["Engineering", "JEE", "Physics", "Math"]
  },
  {
    category: "Competitive Exams",
    title: "Competition Wallah (YouTube)",
    description: "Detailed, free full-length lecture playlists for cracking NEET exams.",
    link: "https://www.youtube.com/@PW-NEETWallah/playlists",
    type: "YouTube Playlist",
    tags: ["Medical", "NEET", "Biology"]
  },
  {
    category: "Competitive Exams",
    title: "SWAYAM Free Online Courses",
    description: "Govt. of India initiative providing free online courses for higher education and competitive prep.",
    link: "https://swayam.gov.in/",
    type: "Course",
    tags: ["UPSC", "GATE", "Engineering"]
  },
  {
    category: "Skill Development",
    title: "CodeWithHarry (YouTube)",
    description: "Huge library of programming playlists in Hindi (Python, Web Dev, C++, Java, Machine Learning).",
    link: "https://www.youtube.com/@CodeWithHarry/playlists",
    type: "YouTube Playlist",
    tags: ["Programming", "Hindi", "Web Dev"]
  },
  {
    category: "Skill Development",
    title: "Apna College - DSA & Web Dev (YouTube)",
    description: "Structured roadmaps and detailed playlists covering Data Structures, Algorithms, and Placement Prep.",
    link: "https://www.youtube.com/@ApnaCollegeOfficial/playlists",
    type: "YouTube Playlist",
    tags: ["DSA", "Placements", "C++", "Java"]
  },
  {
    category: "Skill Development",
    title: "freeCodeCamp (YouTube)",
    description: "World-class 10 to 20-hour long full courses on every imaginable tech stack and language.",
    link: "https://www.youtube.com/@freecodecamp/playlists",
    type: "YouTube Playlist",
    tags: ["Programming", "IT", "English"]
  },
  {
    category: "Skill Development",
    title: "Coursera Financial Aid / Free Courses",
    description: "Audit courses from top universities for free or apply for financial aid.",
    link: "https://www.coursera.org/",
    type: "Course",
    tags: ["Business", "Tech", "Language"]
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("School/Board Exams");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resourceLinks.filter(res => {
    const matchesCategory = res.category === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Learning Resources</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Explore a curated list of high-quality, completely free resources to help you study for your school board exams, prepare for competitive tests like JEE/NEET, or learn a new technical skill.</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-3 font-semibold text-sm whitespace-nowrap transition \${
              activeTab === category
                ? 'border-b-2 border-indigo-600 text-indigo-700'
                : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search resources by name, topic, or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No resources found matching your search term in this category.
          </div>
        ) : (
          filteredResources.map((res, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800">{res.title}</h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded font-bold whitespace-nowrap border border-indigo-100">
                  {res.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-1">{res.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {res.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 mt-auto">
                <a 
                  href={res.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block w-full text-center bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Visit Resource
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
