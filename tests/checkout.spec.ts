
import { test, expect } from "@playwright/test";

test("realiza compra simulada de NFT com sucesso", async ({ page }) => {
  // 1. Acessar o marketplace
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Explore nossos NFTs",
    })
  ).toBeVisible();

  // 2. Abrir os detalhes do NFT
  await page.getByText("Emerald Ape #042").first().click();

  await expect(page).toHaveURL(/\/nft\/.+/);

  await expect(
    page.getByRole("heading", {
      name: "Emerald Ape #042",
    })
  ).toBeVisible();

  // 3. Selecionar duas unidades
  await page
    .getByRole("button", { name: "Aumentar quantidade" })
    .click();

  // 4. Adicionar ao carrinho
  await page
    .getByRole("button", { name: "Adicionar ao carrinho" })
    .click();

  await expect(
    page.getByRole("status")
  ).toContainText("NFT adicionado ao carrinho!");

  // 5. Abrir o carrinho
  await page
    .getByRole("link", { name: "Ver carrinho" })
    .click();

  await expect(page).toHaveURL(/\/cart$/);

  await expect(
    page.getByRole("heading", { name: "Meu carrinho" })
  ).toBeVisible();

  await expect(
    page.getByText("Quantidade: 2")
  ).toBeVisible();

  // 6. Avançar para o checkout
  await page
    .getByRole("link", { name: "Finalizar compra" })
    .click();

  await expect(page).toHaveURL(/\/checkout$/);

  await expect(
    page.getByRole("heading", {
      name: "Selecionar carteira",
    })
  ).toBeVisible();

  // 7. Selecionar carteira simulada
  await page
    .getByRole("radio", { name: "MetaMask (simulada)" })
    .check();

  // 8. Aguardar a resposta da API MSW
  const orderResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/orders") &&
      response.request().method() === "POST"
  );

  await page
    .getByRole("button", { name: "Confirmar compra" })
    .click();

  const orderResponse = await orderResponsePromise;

  expect(orderResponse.status()).toBe(201);

  // 9. Verificar confirmação do pedido
  await expect(page).toHaveURL(/\/orders\/[^/]+$/);

  await expect(
    page.getByText("Compra simulada concluída")
  ).toBeVisible();

  // 10. Verificar carrinho vazio após a compra
  await page.goto("/cart");

  await expect(
    page.getByText("Seu carrinho está vazio.")
  ).toBeVisible();
});

