import React from 'react';
import './FilterBar.css';

/**
 * FilterBar Component
 * 
 * Search and filter controls for job listings.
 * 
 * Props:
 * - filters: Object containing current filter values
 * - onFilterChange: Function to handle filter changes
 */
const FilterBar = ({ filters, onFilterChange }) => {
  const locations = ['Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Mumbai', 'Noida', 'Gurgaon', 'Coimbatore', 'Indore'];
  const modes = ['Remote', 'Hybrid', 'Onsite'];
  const experiences = ['Fresher', '0-1', '1-3', '3-5'];
  const sources = ['LinkedIn', 'Naukri', 'Indeed'];
  // Status options with EXACT string literals matching JOB_STATUSES
  const statuses = ['Not Applied', 'Applied', 'Rejected', 'Selected'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'match-score', label: 'Match Score (High to Low)' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
    { value: 'company', label: 'Company (A-Z)' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-bar__search-section">
        <input
          type="text"
          className="filter-bar__search"
          placeholder="Search by title or company..."
          value={filters.keyword}
          onChange={(e) => onFilterChange('keyword', e.target.value)}
        />
      </div>

      <div className="filter-bar__filters">
        <select
          className="filter-bar__select"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.mode}
          onChange={(e) => onFilterChange('mode', e.target.value)}
        >
          <option value="">All Modes</option>
          {modes.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.experience}
          onChange={(e) => onFilterChange('experience', e.target.value)}
        >
          <option value="">All Experience Levels</option>
          {experiences.map((exp) => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.source}
          onChange={(e) => onFilterChange('source', e.target.value)}
        >
          <option value="">All Sources</option>
          {sources.map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="filter-bar__select"
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
