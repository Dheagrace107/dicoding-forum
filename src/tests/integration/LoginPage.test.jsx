import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import configureStore from 'redux-mock-store';

import LoginPage from '../../pages/LoginPage';

const mockStore = configureStore([]);

describe('LoginPage integration test', () => {
  it('should show loading when state.loading = true', () => {
    const store = mockStore({
      loading: true,
      authUser: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/sedang login/i)).toBeInTheDocument();
  });

  it('should dispatch asyncSetAuthUser on form submit', () => {
    const store = mockStore({
      loading: false,
      authUser: null,
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /masuk/i }));

    expect(store.dispatch).toHaveBeenCalled();
  });
});
