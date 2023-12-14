import React, { memo } from 'react';

interface SearchHistoryProps {
  history: any[];
  onItemSearch: (city: string, country: string) => void;
  onItemDelete: (index: number) => void;
}

function SearchHistory({
  history,
  onItemDelete,
  onItemSearch,
}: SearchHistoryProps) {
  const noDataMarkup = history.length === 0 && (
    <p className="text-center text-secondary fw-bold h5">No record</p>
  );

  const searchHistoryMarkup = history.length > 0 && (
    <ul className="ps-0">
      {/* @ts-ignore */}
      {history.toReversed().map(({ city, country, time }, i) => {
        const order = i + 1;
        const timeLabel = new Date(time).toLocaleTimeString();
        return (
          <li key={time.toString()} className="d-flex justify-content-between mt-2 border-bottom">
            <div>
              <span>{order}.</span>
              <span>
                {city}, {country}
              </span>
            </div>

            <div>
              <span className="me-2">{timeLabel}</span>
              <span className="me-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    onItemSearch(city, country);
                  }}
                >
                  <span className="bi-search"></span>
                </button>
              </span>
              <span>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onItemDelete(i);
                  }}
                >
                  <span className="bi-trash"></span>
                </button>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="d-flex flex-column mt-4">
      {noDataMarkup}
      {searchHistoryMarkup}
    </div>
  );
}

export default memo(SearchHistory);
