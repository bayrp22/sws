import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSection from '../components/ProblemSection';

describe('ProblemSection', () => {
  it('renders the main heading', () => {
    render(<ProblemSection />);
    
    const heading = screen.getByRole('heading', { 
      name: /invisible online = losing business/i,
      level: 2 
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('renders both column headings', () => {
    render(<ProblemSection />);
    
    const withSiteHeading = screen.getByText(/with a professional site/i);
    const withoutSiteHeading = screen.getByText(/without a website/i);
    
    expect(withSiteHeading).toBeInTheDocument();
    expect(withoutSiteHeading).toBeInTheDocument();
  });

  it('renders the problem section with correct id', () => {
    render(<ProblemSection />);
    
    const section = document.getElementById('problem');
    expect(section).toBeInTheDocument();
  });

  it('renders bullet points for both columns', () => {
    render(<ProblemSection />);
    
    // Check for specific bullet points
    expect(screen.getByText(/customers find you 24\/7/i)).toBeInTheDocument();
    expect(screen.getByText(/potential customers can't find you/i)).toBeInTheDocument();
  });
}); 