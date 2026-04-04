import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00')
    expect(formatCurrency(2500.5)).toBe('$2,500.50')
  })

  it('formats COP correctly', () => {
    // Note: the exact output depends on Node's Intl implementation for 'en-US' locale with COP
    const cop = formatCurrency(50000, 'COP')
    expect(cop).toContain('COP')
    expect(cop).toContain('50,000')
  })

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})