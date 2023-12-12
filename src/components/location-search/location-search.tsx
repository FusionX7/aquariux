import React, { memo } from 'react';

interface LocationSearchProps {
  city?: string;
  onChangeCity?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  country?: string;
  onChangeCountry?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  onClear?: () => void;
  loading?: boolean;
}

function LocationSearch({
  city,
  country,
  onChangeCity,
  onChangeCountry,
  onClear,
  onSearch,
  loading,
}: LocationSearchProps) {
  const loadingMarkup = loading && (
    <span
      className="spinner-grow spinner-grow-sm"
      role="status"
      aria-hidden="true"
    ></span>
  );
  
  return (
    <div className="d-block d-md-flex">
      <div className="d-flex mt-2 me-3">
        <label htmlFor="inputEmail3" className="col-form-label me-2 w-15">
          City:
        </label>
        <input
          value={city}
          type="text"
          className="form-control w-auto"
          id="inputEmail3"
          onChange={onChangeCity}
        />
      </div>

      <div className="d-flex mt-2 me-3">
        <label htmlFor="inputPassword3" className="col-form-label me-2">
          Country:
        </label>
        <input
          value={country}
          type="text"
          className="form-control w-auto"
          id="inputPassword3"
          onChange={onChangeCountry}
        />
      </div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-primary me-2 mt-2"
          onClick={onSearch}
          disabled={loading}
        >
          {loadingMarkup}
          Search
        </button>
        <button type="button" className="btn btn-danger mt-2" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default memo(LocationSearch);
