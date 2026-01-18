import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { DashboardProvider } from '../context/DashboardContext';
import { OrderListPage } from '../pages/OrderListPage';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <DashboardProvider>
          {component}
        </DashboardProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('OrderListPage', () => {
  it('should render order list page', () => {
    renderWithProviders(<OrderListPage />);

    expect(screen.getByText('Order List')).toBeInTheDocument();
  });

  it('should display orders table', () => {
    renderWithProviders(<OrderListPage />);

    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should filter orders by search query', async () => {
    renderWithProviders(<OrderListPage />);

    const searchInput = screen.getByPlaceholderText('Search orders...');
    fireEvent.change(searchInput, { target: { value: 'CM9801' } });

    await waitFor(() => {
      expect(screen.getByText('#CM9801')).toBeInTheDocument();
    });
  });

  it('should handle pagination', () => {
    renderWithProviders(<OrderListPage />);

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    
    expect(screen.getByLabelText('Go to page 2')).toHaveAttribute('aria-current', 'page');
  });

  it('should handle sorting', () => {
    renderWithProviders(<OrderListPage />);

    const orderIdHeader = screen.getByText('Order ID');
    fireEvent.click(orderIdHeader);

    // After clicking, the sort should be applied
    expect(orderIdHeader).toHaveAttribute('aria-sort');
  });
});
