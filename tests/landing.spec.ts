import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('copy, navigation and FAQ work without browser errors', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/Agência V3/)
  await expect(page.locator('h1')).toHaveText(
    'Pare de gerar curiosos. Comece a gerar vendas para o seu negócio.',
  )
  await expect(
    page.getByRole('heading', { name: 'O que fazemos pela sua empresa' }),
  ).toBeVisible()
  await page
    .getByRole('link', { name: 'Quero meu diagnóstico gratuito', exact: true })
    .click()
  await expect(page).toHaveURL(/#diagnostico$/)
  await expect(page.getByLabel('Nome', { exact: true })).toBeInViewport()
  await page
    .getByRole('button', { name: 'Tem contrato de fidelidade?' })
    .click()
  await expect(
    page.getByRole('region', { name: 'Tem contrato de fidelidade?' }),
  ).toBeVisible()
  await expect(
    page.getByText(
      'O contrato inicial é de 3 meses. Depois disso, a renovação é mensal.',
    ),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Em quanto tempo vejo resultado?' }),
  ).toHaveAttribute('aria-expanded', 'false')
  await page
    .getByRole('button', { name: 'Tem contrato de fidelidade?' })
    .click()
  await expect(
    page.getByRole('region', { name: 'Tem contrato de fidelidade?' }),
  ).not.toBeVisible()
  expect(errors).toEqual([])
})

for (const width of [320, 390, 768, 1440]) {
  test(`responsive content has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(async () => {
      await document.fonts.ready
      window.scrollTo(0, document.body.scrollHeight)
    })
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const badElements = await page
      .locator('h1, h2, .button, .field input')
      .evaluateAll((els) =>
        els
          .filter((el) => {
            const r = el.getBoundingClientRect()
            return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1)
          })
          .map((el) => el.textContent),
      )
    expect(badElements).toEqual([])
  })
}

test('mobile menu opens, closes with Escape and follows section links', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const open = page.getByRole('button', { name: 'Abrir menu' })
  await open.click()
  await expect(
    page.getByRole('button', { name: 'Fechar menu' }),
  ).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(open).toHaveAttribute('aria-expanded', 'false')
  await open.click()
  await page
    .getByRole('navigation', { name: 'Navegação mobile' })
    .getByRole('link', { name: 'Soluções' })
    .click()
  await expect(page).toHaveURL(/#solucoes$/)
  await expect(open).toHaveAttribute('aria-expanded', 'false')
})

test('unconfigured form never claims to have submitted a lead', async ({
  page,
}) => {
  await page.goto('/#diagnostico')
  await expect(
    page.getByRole('button', { name: 'Quero agendar meu diagnóstico' }),
  ).toBeDisabled()
  await expect(
    page.getByText('Formulário em configuração.', { exact: false }),
  ).toBeVisible()
  await expect(page.locator('.form-note a')).toHaveAttribute(
    'href',
    'mailto:contato@agenciav3.com.br',
  )
  await expect(page.locator('.form-status')).toBeEmpty()
})

async function configureForm(page: import('@playwright/test').Page) {
  await page.route('**/form-config.js', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: 'window.V3_CONFIG = { formEndpoint: "https://forms.example.test/lead" };',
    }),
  )
  await page.goto('/#diagnostico')
  await page.getByLabel('Nome', { exact: true }).fill('Teste V3')
  await page.getByLabel('E-mail profissional').fill('teste@empresa.com.br')
  await page.getByLabel('WhatsApp').fill('(11) 99999-9999')
  await page.getByLabel('Empresa', { exact: true }).fill('Empresa Teste')
}

test('configured form validates and sends the expected payload', async ({
  page,
}) => {
  let payload: unknown
  await page.route('https://forms.example.test/lead', async (route) => {
    payload = route.request().postDataJSON()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"ok":true}',
    })
  })
  await configureForm(page)
  await page
    .getByRole('button', { name: 'Quero agendar meu diagnóstico' })
    .click()
  await expect(page.getByRole('status')).toContainText(
    'Recebemos sua solicitação',
  )
  expect(payload).toEqual({
    name: 'Teste V3',
    email: 'teste@empresa.com.br',
    phone: '(11) 99999-9999',
    company: 'Empresa Teste',
  })
  await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('')
})

test('configured form reports a server error and allows retry', async ({
  page,
}) => {
  await page.route('https://forms.example.test/lead', (route) =>
    route.fulfill({ status: 503, body: 'Unavailable' }),
  )
  await configureForm(page)
  const submit = page.getByRole('button', {
    name: 'Quero agendar meu diagnóstico',
  })
  await submit.click()
  await expect(page.getByRole('status')).toContainText(
    'Não foi possível enviar',
  )
  await expect(submit).toBeEnabled()
  await expect(page.getByLabel('Nome', { exact: true })).toHaveValue('Teste V3')
})

for (const width of [390, 1440]) {
  test(`accessibility scan at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    // Reveal all below-fold sections before checking text contrast.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 25))
      }
    })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}

test('reduced motion keeps all sections visible and stops ambient animations', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.metal-emblem')).toHaveCSS(
    'animation-name',
    'none',
  )
  const headings = await page
    .locator('h2')
    .evaluateAll((els) =>
      els.map((el) => getComputedStyle(el.parentElement!).opacity),
    )
  expect(headings.every((opacity) => opacity === '1')).toBe(true)
})

test('invalid form fields prevent any submission', async ({ page }) => {
  let requests = 0
  await page.route('https://forms.example.test/lead', (route) => {
    requests++
    return route.fulfill({ status: 200, body: '{}' })
  })
  await configureForm(page)
  await page.getByLabel('E-mail profissional').fill('email-invalido')
  await page
    .getByRole('button', { name: 'Quero agendar meu diagnóstico' })
    .click()
  expect(
    await page
      .getByLabel('E-mail profissional')
      .evaluate((el: HTMLInputElement) => el.validity.typeMismatch),
  ).toBe(true)
  expect(requests).toBe(0)
})
