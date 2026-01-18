import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { MetricCards } from '../components/dashboard/MetricCards';

describe('MetricCards', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider>
        {component}
      </ThemeProvider>
    );
  };

  it('should render all metric cards', () => {
    renderWithTheme(<MetricCards />);

    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
  });

  it('should display metric values', () => {
    renderWithTheme(<MetricCards />);

    expect(screen.getByText('3,781')).toBeInTheDocument();
    expect(screen.getByText('1,219')).toBeInTheDocument();
    expect(screen.getByText('$695')).toBeInTheDocument();
    expect(screen.getByText('30.1%')).toBeInTheDocument();
  });

  it('should display trend indicators', () => {
    renderWithTheme(<MetricCards />);

    expect(screen.getByText('+11.01%')).toBeInTheDocument();
    expect(screen.getByText('-0.03%')).toBeInTheDocument();
    expect(screen.getByText('+15.03%')).toBeInTheDocument();
    expect(screen.getByText('+6.08%')).toBeInTheDocument();
  });
});
