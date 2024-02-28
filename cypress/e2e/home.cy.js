//Verificar página inicial de compras


describe('Plano de teste da página inicial', () => {

  let searchValidItem = "Apple"
  let searchInvalidItem = "Zebra"

  it('Acessar home page', () => {

    cy.visit('/')

    cy.get('div [data-pb-style=LE9F1BT]')
      .contains("Cellshop Importados Paraguay")
      .should('exist')
  })

  it('Deve permitir realizar buscas por nome do item existente apresentando lista de itens', () => {

    cy.intercept('POST','/productrecommendations/render/product')
    .as("productList")
    cy.visit('/')
    cy.wait("@productList") 

    cy.get('input[id="search"]')
      .type(searchValidItem)    
    cy.get('div[class*="livesearch popover-container"]')
      .should('be.visible')
      .as("popup")

    cy.get("@popup")
    .should('have.length.greaterThan',0)

  })


  it('Deve permitir realizar buscas por nome e me direcionar a página com a listagem de itens', () => {

    cy.visit('/')

    cy.intercept('GET' , '/catalogsearch/result/?q=Apple')
      .as("searchPage")
    cy.get('input[id="search"]')
      .type('Apple{enter}')
    
    cy.wait("@searchPage")

    cy.get('[data-ui-id="page-title-wrapper"]')
      .should('be.visible')
      .as("spanValue")

    cy.get("@spanValue")
      .should('include.text','Resultados da busca por:')
   
  })
})

