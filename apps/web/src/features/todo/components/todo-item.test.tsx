import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from './todo-item';
import type { Todo } from '@repo/interfaces';

describe('TodoItem component', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo Item',
    description: 'This is a test description',
    isDone: false,
    createdAt: new Date(),
  };

  const mockToggleDone = vi.fn();
  const mockRemove = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    mockToggleDone.mockClear();
    mockRemove.mockClear();
  });

  it('renders todo title correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={false}
      />
    );
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
  });

  it('calls toggleDone with correct arguments when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={false}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleDone).toHaveBeenCalledTimes(1);
    expect(mockToggleDone).toHaveBeenCalledWith(mockTodo.id, !mockTodo.isDone);
  });

  it('calls remove with correct arguments when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={false}
      />
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(mockTodo.id);
  });

  it('disables controls when isLoading is true', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={true}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(checkbox).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });

  it('checkbox reflects the isDone state of the todo', () => {
    const todoDone: Todo = { ...mockTodo, isDone: true };
    render(
      <TodoItem
        todo={todoDone}
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={false}
      />
    );
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // Render with isDone: false
    render(
      <TodoItem
        todo={mockTodo} // isDone is false
        toggleDone={mockToggleDone}
        remove={mockRemove}
        isLoading={false}
      />
    );
    const checkboxNotDone = screen.getByRole('checkbox', { name: '' }) as HTMLInputElement; // Re-query
    expect(checkboxNotDone.checked).toBe(false);
  });
});
