describe('visitor can access Backyard site', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'articles.json',
    });
    cy.visit('/');
  });

  describe('successfully access backyard', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/backyard', {
        fixture: 'backyardArticles.json',
      });
      cy.get('[data-cy=navbar]').within(() => {
        cy.get('[data-cy=backyard-tab]').click();
      });
    });

    it('is expected to send user to backyard', () => {
      cy.url().should('include', '/backyard');
    });

    it('is expected to show the list of articles', () => {
      cy.get('[data-cy=backyard-article]').should('have.length', 7);
    });

    it('is expected to show the first article', () => {
      cy.get('[data-cy=backyard-article]')
        .first()
        .within(() => {
          cy.get('[data-cy=title]').should(
            'contain',
            'Moderna Chief Medical Officer Confirms mRNA Injection For COVID-19 Can Change Your Genetic Code.'
          );
          cy.get('[data-cy=category]').should('contain', 'Hollywood');
          cy.get('[data-cy=date]').should('contain', '2021-05-19, 15:10');
          cy.get('[data-cy=author]').should('contain', 'Bob Kramer');
          cy.get('[data-cy=rating]').should('be.visible');
          cy.get('[data-cy=view-article-btn]').should('be.visible');
        });
    });
  });
});
