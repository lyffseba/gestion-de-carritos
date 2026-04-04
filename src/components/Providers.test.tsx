import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Providers } from './Providers';

// Mock next-auth to avoid fetch errors in test
vi.mock('next-auth/react', () => {
  return {
    SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useSession: vi.fn(() => {
      return { data: null, status: 'unauthenticated' };
    }),
  };
});

describe('Providers component', () => {
  it('renders children correctly', () => {
    render(
      <Providers>
        <div data-testid="child">Test Child</div>
      </Providers>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
