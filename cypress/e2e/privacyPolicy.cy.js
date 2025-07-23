it('testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/privacy.html')
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
  cy.contains('p', 'Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.').should('be.visible')
  cy.contains('p', 'No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.').should('be.visible')
  cy.contains('p', 'Talking About Testing').should('be.visible')
   
})