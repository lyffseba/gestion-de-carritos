import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-500');
    expect(button).toHaveClass('h-11');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="outline">Outline</Button>);
    let button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-neutral-200');

    rerender(<Button variant="accent">Accent</Button>);
    button = screen.getByRole('button', { name: /accent/i });
    expect(button).toHaveClass('bg-accent-500');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('hover:bg-neutral-100');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-3');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('h-12');
    expect(button).toHaveClass('px-8');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button', { name: /icon/i });
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('w-11');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('bg-primary-500');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
