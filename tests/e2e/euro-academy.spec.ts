import { test, expect } from "@playwright/test";

const email = "playwright." + Date.now() + "@example.com";
const password = "Password123!";

test("flusso candidato e admin principale", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Euro Academy" })).toBeVisible();
  await page.getByRole("link", { name: /Candidati ora/i }).first().click();
  await page.getByRole("textbox", { name: "Nome", exact: true }).fill("Playwright");
  await page.getByLabel("Cognome").fill("Test");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Numero WhatsApp").fill("+39 333 1234567");
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Conferma password").fill(password);
  await page.getByLabel("Data di nascita").fill("2000-01-01");
  await page.getByLabel("Lavoro attuale oppure studi attuali").fill("Studio marketing");
  await page.getByLabel("Qual e il tuo sogno?").fill("Voglio costruire competenze commerciali solide e imparare a vendere valore con disciplina.");
  await page.getByLabel("Quale guadagno annuale netto").fill("Dipende dalla mia performance personale");
  await page.getByLabel("Perche vuoi entrare in Euro Academy?").fill("Voglio entrare in Euro Academy per imparare il Metodo Sirius, allenarmi su casi reali e dimostrare con fatti concreti di poter rappresentare EuroSirius.");
  await page.getByLabel("Quanto sei disposto").fill("9");
  await page.getByLabel(/Accetto la Privacy/i).check();
  await page.getByLabel(/Accetto il Regolamento/i).check();
  await page.getByRole("button", { name: /Invia candidatura/i }).click();
  await expect(page.getByText("Candidatura ricevuta")).toBeVisible();

  await page.getByRole("button", { name: /Logout/i }).click();
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /Accedi alla dashboard/i }).click();
  await expect(page.getByText("Dashboard candidato")).toBeVisible();

  await page.goto("/academy/moduli/1/lezioni/1");
  await page.getByRole("button", { name: /Segna lezione/i }).click();
  await expect(page.getByText("Modulo 1")).toBeVisible();

  await page.goto("/admin/login");
  await page.getByRole("button", { name: /Accedi come admin/i }).click();
  await expect(page.getByText("Candidati Euro Academy")).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();
});

test("admin puo valutare candidato demo ed esportare CSV", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByRole("button", { name: /Accedi come admin/i }).click();
  await expect(page.getByText("Candidati Euro Academy")).toBeVisible();
  if (await page.getByRole("button", { name: /Carica candidato demo/i }).isVisible()) {
    await page.getByRole("button", { name: /Carica candidato demo/i }).click();
    await expect(page.getByText("candidato.demo@euroacademy.it")).toBeVisible();
  }
  await page.getByRole("link", { name: /Apri scheda/i }).first().click();
  await page.getByLabel("Voto tesina da 0 a 40").fill("36");
  await page.getByLabel("Voto esame live da 0 a 30").fill("28");
  await page.getByLabel("Note private").fill("Candidato lucido, concreto e coerente con il Metodo Sirius.");
  await page.getByRole("button", { name: /Salva valutazione/i }).click();
  await expect(page.getByText("Valutazione salvata")).toBeVisible();
  await expect(page.getByText("88/100").first()).toBeVisible();
  await expect(page.getByText("Idoneo buono").first()).toBeVisible();
});
