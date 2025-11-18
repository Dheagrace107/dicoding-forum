describe('Login Flow', () => {
  it('should login successfully and redirect to homepage', () => {
    cy.visit('http://localhost:5173/login');

    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'test-token-123',
        },
      },
    });

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { user: { id: '1', name: 'Test User' } },
      },
    });

    cy.get('#email').type('user@example.com');
    cy.get('#password').type('secret');
    cy.contains(/masuk/i).click();

    cy.url().should('eq', 'http://localhost:5173/');
  });
});
