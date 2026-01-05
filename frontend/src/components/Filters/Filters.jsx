import React from 'react';
import { 
  PRICE_RANGES, 
  MATERIALS, 
  GENDER_OPTIONS, 
  INNERWEAR_SIZES 
} from '../../utils/constants';
import './Filters.css';

const Filters = ({ filters, onFilterChange, productCount }) => {
  const handlePriceChange = (rangeId) => {
    const newPriceRanges = filters.priceRange.includes(rangeId)
      ? filters.priceRange.filter(id => id !== rangeId)
      : [...filters.priceRange, rangeId];
    
    onFilterChange({ ...filters, priceRange: newPriceRanges });
  };

  const handleMaterialChange = (materialId) => {
    const newMaterials = filters.materials.includes(materialId)
      ? filters.materials.filter(id => id !== materialId)
      : [...filters.materials, materialId];
    
    onFilterChange({ ...filters, materials: newMaterials });
  };

  const handleSizeChange = (sizeId) => {
    const newSizes = filters.sizes.includes(sizeId)
      ? filters.sizes.filter(id => id !== sizeId)
      : [...filters.sizes, sizeId];
    
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleGenderChange = (genderId) => {
    onFilterChange({ ...filters, gender: genderId });
  };

  const clearFilters = () => {
    onFilterChange({
      priceRange: [],
      materials: [],
      sizes: [],
      gender: 'all',
      sortBy: 'featured'
    });
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <span className="product-count">{productCount} products</span>
      </div>

      {/* Gender Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Gender</h4>
        <div className="gender-filters">
          {GENDER_OPTIONS.map(gender => (
            <button
              key={gender.id}
              className={`gender-btn ${filters.gender === gender.id ? 'active' : ''}`}
              onClick={() => handleGenderChange(gender.id)}
            >
              <span className="gender-icon">{gender.icon}</span>
              {gender.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <div className="price-filters">
          {PRICE_RANGES.map(range => (
            <label key={range.id} className="price-filter">
              <input
                type="checkbox"
                checked={filters.priceRange.includes(range.id)}
                onChange={() => handlePriceChange(range.id)}
              />
              <span className="checkmark"></span>
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Material</h4>
        <div className="material-filters">
          {MATERIALS.map(material => (
            <label key={material.id} className="material-filter">
              <input
                type="checkbox"
                checked={filters.materials.includes(material.id)}
                onChange={() => handleMaterialChange(material.id)}
              />
              <span className="checkmark"></span>
              <span className="material-icon">{material.icon}</span>
              {material.name}
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Size</h4>
        <div className="size-filters">
          {INNERWEAR_SIZES.map(size => (
            <button
              key={size.id}
              className={`size-btn ${filters.sizes.includes(size.id) ? 'active' : ''}`}
              onClick={() => handleSizeChange(size.id)}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="filter-actions">
        <button 
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;