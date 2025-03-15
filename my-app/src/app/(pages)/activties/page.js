"use client"
import React, { useState, useEffect } from 'react';
import './page.css';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('');
  const eventsPerPage = 15;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/main_activities`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.details || 'Failed to fetch activities');
        }

        if (result.success) {
          setData(result.activities);
        } else {
          throw new Error(result.error || 'Failed to fetch data');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Frontend error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle year selection change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1); // Reset to first page when changing year
  };

  // Filter data based on search query and selected year
  const filteredData = data.filter(event => {
    const matchesYear = !selectedYear || event['Year'] === selectedYear;
    const matchesSearch = Object.values(event).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesYear && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredData.slice(indexOfFirstEvent, indexOfLastEvent);

  // Extract unique years from the data
  const years = Array.from(new Set(data.map(event => event['Year']))).sort();

  // Calculate totals
  const TOTAL_EVENTS = filteredData.length;
  const TOTAL_STUDENTS = filteredData.reduce((sum, event) => 
    sum + Number(event["Number of students participated in such activities"] || 0), 0);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="activities-component">
      <div className="activities-component-in">
        <div className="activities-component-in-header">
          <div className="activites-component-in-header-one">
            <Link href="/">
              <button>
                <i className="fa-solid fa-arrow-left"></i>
                Back Home
              </button>
            </Link>
            <select 
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="activites-component-in-header-two">
            <h1>Activities</h1>
          </div>
          <div className="activites-component-in-header-three">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="activities-component-in-body">
          <div className="activites-component-in-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Domain</th>
                  <th>Number of students</th>
                  <th>Reports</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event, index) => (
                  <tr key={event.id || index}>
                    <td>{event["Date of the activity \nDD-MM-YYYY"]}</td>
                    <td>{event["Name of the activity"]}</td>
                    <td>{event["Domain"]}</td>
                    <td>{event["Number of students participated in such activities"]}</td>
                    <td>
                      {event["Web Links"] ? (
                        <a href={event["Web Links"]} target="_blank" rel="noopener noreferrer" className='report-link'>
                          <FaEye />
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="activites-component-in-table-pagination">
            <div className="activites-component-in-table-pagination-left">
              <button>
                Events Count: {TOTAL_EVENTS}
              </button>
              <button>
                Total Students: {TOTAL_STUDENTS}
              </button>
            </div>
            <div className="activites-component-in-table-pagination-right">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  style={{
                    backgroundColor: currentPage === number ? '#006400' : '#008000'
                  }}
                >
                  {number}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;