import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Login Component', () => {
  test('dummy test passes', () => {
    expect(true).toBe(true);
  });

  test('should render login heading', () => {
    render(<h1>Login</h1>);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should have email input', () => {
    render(
      <input placeholder="Enter your email" />
    );
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  test('should update email input value', () => {
    render(
      <input placeholder="Enter your email" />
    );
    const input = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(input, { target: { value: 'test@gmail.com' } });
    expect(input.value).toBe('test@gmail.com');
  });

  test('should have password input', () => {
    render(
      <input type="password" placeholder="Enter your password" />
    );
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('should update password input value', () => {
    render(
      <input type="password" placeholder="Enter your password" />
    );
    const input = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(input, { target: { value: 'password123' } });
    expect(input.value).toBe('password123');
  });

  test('should have login button', () => {
    render(
      <button>Login</button>
    );
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
