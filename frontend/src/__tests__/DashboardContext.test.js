import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

// Test component that uses the dashboard context
function TestComponent() {
  const {
    orders,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    currentPage,
    setCurrentPage,
    toggleSort,
    sortConfig,
  } = useDashboard();

  return (
    <div>
      <div data-testid="orders-count">{orders.length}</div>
      <div data-testid="current-page">{currentPage}</div>
      <div data-testid="filter-status">{filterStatus}</div>
      <div data-testid="sort-key">{sortConfig.key || 'none'}</div>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => setFilterStatus('Complete')}>Filter Complete</button>
      <button onClick={() => toggleSort('id')}>Sort by ID</button>
      <button onClick={() => setCurrentPage(2)}>Next Page</button>
    </div>
  );
}

describe('DashboardContext', () => {
  it('should provide orders data', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId('orders-count')).toHaveTextContent('10');
  });

  it('should filter orders by search query', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'CM9801' } });

    expect(screen.getByTestId('orders-count')).toHaveTextContent('1');
  });

  it('should filter orders by status', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    const filterButton = screen.getByText('Filter Complete');
    fireEvent.click(filterButton);

    expect(screen.getByTestId('filter-status')).toHaveTextContent('Complete');
  });

  it('should sort orders', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    const sortButton = screen.getByText('Sort by ID');
    fireEvent.click(sortButton);

    expect(screen.getByTestId('sort-key')).toHaveTextContent('id');
  });

  it('should handle pagination', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    const nextPageButton = screen.getByText('Next Page');
    fireEvent.click(nextPageButton);

    expect(screen.getByTestId('current-page')).toHaveTextContent('2');
  });
});
