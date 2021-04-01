/// <reference types="cypress" />

describe("Open Pokecommerce application", () => {
  it("Visit homepage", () => {
    cy.visit("http://localhost:3000/auth");
  });

  it("Create an account", () => {
    cy.get(".app-title").contains("Login");
    cy.get("button.btn.btn-primary").should("be.disabled");
    cy.get("button.btn.btn-secondary").click();
    cy.get(".app-title").contains("Create Account");

    cy.get('input[name="name"]')
      .should("not.have.value")
      .type("Keven Leone")
      .should("have.value", "Keven Leone");

    cy.get('input[name="email"]')
      .type("keven.leone1@hotmail.com")
      .should("have.value", "keven.leone1@hotmail.com");

    cy.get('input[name="password"]')
      .type("123456")
      .should("have.value", "123456");

    cy.get("button.btn.btn-primary").should("be.enabled");

    cy.get("button.btn.btn-primary").click();
    cy.get("button.btn.btn-primary").click();
  });
});
