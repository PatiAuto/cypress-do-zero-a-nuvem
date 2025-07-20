describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
   cy.visit("./src/index.html")})//BeforeEach usado para não precisar repetir este ponto do testes toda vez
      //  que formos executar o teste

})

  it('verifica o título da aplicação', () => { 

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      
})
  //lesson 1
  it('preenche os campos obrigatórios e envia o formulário', () => { 
    cy.get('#firstName').type('Patricia')
    cy.get('#lastName').type('Matos')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Olá, texto maior do que o comum para validar o comando delay, nesta lição extra do curso', { delay:0 })
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
})

  //lesson 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { 
    cy.get('#firstName').type('Patricia')
    cy.get('#lastName').type('Matos')
    cy.get('#email').type('teste@teste,com')
    cy.get('#open-text-area').type('Olá', { delay:0 })
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
})
   //lesson 3
  it('valor não-numérico foi digitado no campo telefone', () => { 
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
})
   //lesson 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Patricia')
    cy.get('#lastName').type('Matos')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Olá')
    cy.get('#phone-checkbox')
      .check()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
})

   //lesson 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Patricia')
      .should('have.value', 'Patricia')
      .clear()
      .should('have.value', '')
    cy.get('#lastName').type('Matos')
      .should('have.value', 'Matos')
      .clear()
      .should('have.value', '')
    cy.get('#email').type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone').type('11951721')
      .should('have.value', '11951721')
      .clear()
      .should('have.value', '')    
       
})
     //lesson 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { 
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

})
     //lesson 7.0
  it('envia o formuário com sucesso usando um comando customizado', () => { 
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

})

  //lesson 7.1

  it('envia o formuário com sucesso usando um comando customizado 2', () => { 
   // Opção para utilizar os dados inseridos diretamente no cenário
   //const data = {
   //    firstName: 'Patricia',
   //    lastName: 'Matos',
   //    email: 'teste@teste.com',
   //    text: 'Teste.'
   //}
 
     // Opção para utilizar os dados inseridos no commands

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
})
    

  it('seleciona um produto (YouTube) por seu texto', () => { 
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

})

  it('seleciona um produto (Mentoria) por seu valor (value)', () => { 
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

})

  it('seleciona um produto (Blog) por seu índice', () => { 
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

})

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
    
})

  it('marca cada tipo de atendimento', () =>{
    cy.get('input[type="radio"]')
      .each(typeOfService=> {
    cy.wrap(typeOfService)
      .check()
      .should('be.checked')
})
 //Exemplo 2
 //cy.get('input[type="radio"][value="ajuda"]')
 // .check()
 // .should('be.checked')
 //cy.get('input[type="radio"][value="elogio"]')
 // .check()
 // .should('be.checked')
 //cy.get('input[type="radio"][value="feedback"]')
 // .check()
 // .should('be.checked')

})

  it(' marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .first()
      .uncheck()
      .should('not.be.checked')  
         
})

  it.only('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
  //console.log(input) //comando para verificar o caminho do arquivo e pegar as pastas/nomes
  //console.log(input[0].files[0].name) //comando para verificar o nome do arquivo
        expect(input[0].files[0].name).to.equal('example.json')
          
    })     
})

      
  it('seleciona um arquivo simulando um drag-and-drop' , () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
 //console.log(input) comando para verificar o caminho do arquivo e pegar as pastas/nomes
 //console.log(input[0].files[0].name) comando para verificar o nome do arquivo
      expect(input[0].files[0].name).to.equal('example.json') })

  //drag-and-drop simula como se o user estivesse arrastando a pasta do arquivo para dentro do imput
})


('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
       expect(input[0].files[0].name).to.equal('example.json') })
})

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')//contains foi usado para pegar um dado mais espeifico, no caso politica...
    .should('have.attr', 'href', 'privacy.html') 
     .and('have.attr', 'target', '_blank') // usa o and para fazer duas vertificações e não precisar usar novamente o should

}) 
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    
})

it('testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/privacy.html')//teste direto no link, mandar para outra swit de teste
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  
 
})









        


 
  