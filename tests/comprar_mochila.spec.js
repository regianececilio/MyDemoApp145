// This sample code supports WebdriverIO client >=9.7.0
// (npm i --save webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js
 
const {remote} = require('webdriverio')       // biblioteca
const assert = require('assert')              // biblioteca de comparação para fazer a checagem

async function main () {

  const caps = {

  "platformName": "Android",
  "appium:platformVersion": "13.0",
  "appium:deviceName": "emulator5554",
  "appium:deviceOrientation": "portrait",
  "appium:appPackage": "com.saucelabs.mydemoapp.android",
  "appium:appActivity": "com.saucelabs.mydemoapp.android.view.activities.SplashActivity",
  "appium:automationName": "UiAutomator2",
  "browserName": "",
  "appium:ensureWebviewsHavePages": true,
  "appium:nativeWebScreenshot": true,
  "appium:newCommandTimeout": 3600,
  "appium:connectHardwareKeyboard": true,
  "webSocketUrl": true,
  "unhandledPromptBehavior": "ignore"

}

  const driver = await remote({
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: caps
  });

  // Products
  let lbl_titulo_secao = await driver.$("accessibility id:title")
  let resultado_atual = await lbl_titulo_secao.getText()
  await assert.strictEqual(resultado_atual, "Products")
  // Clicar na mochila
  let btn_avancar = await driver.$("-android uiautomator:new UiSelector().resourceId(\"com.saucelabs.mydemoapp.android:id/productIV\").instance(0)")
  await btn_avancar.click()
  
  // Nome do produto
  let lbl_nome_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV")
  resultado_atual = await lbl_nome_produto.getText()
  await assert.strictEqual(resultado_atual, "Sauce Labs Backpack")
  // Preco do produto
  let lbl_preco_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV")
  resultado_atual = await lbl_preco_produto.getText()
  await assert.strictEqual(resultado_atual, "$ 29.99")
  // Arrasta para cima
  await driver.action('pointer')
    .move({ duration: 0, x: 487, y: 1716 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 504, y: 940 })
    .up({ button: 0 })
    .perform();
  // Adicionar no carrinho
  btn_avancar = await driver.$("accessibility id:Tap to add product to cart")
  await btn_avancar.click()  
  // Quantidade no carrinho
  let lbl_quant_carrinho = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartTV")
  resultado_atual = await lbl_quant_carrinho.getText()
  await assert.strictEqual(resultado_atual, "1")
  // Ir para o carrinho
  btn_avancar = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartIV")
  await btn_avancar.click() 
  
  // Cart
  lbl_quant_carrinho = await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV")
  resultado_atual = await lbl_quant_carrinho.getText()
  await assert.strictEqual(resultado_atual, "My Cart")
  // Nome do produto
  lbl_nome_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/titleTV")
  resultado_atual = await lbl_nome_produto.getText()
  await assert.strictEqual(resultado_atual, "Sauce Labs Backpack")
  // Preco
  lbl_preco_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV")
  resultado_atual = await lbl_preco_produto.getText()
  await assert.strictEqual(resultado_atual, "$ 29.99")
  // Quantidade
  const lbl_quant_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/noTV")
  resultado_atual = await lbl_quant_produto.getText()
  await assert.strictEqual(resultado_atual, "1")
  
  // Termina - apaga a sessao
  await driver.deleteSession()
  
}
 
main().catch(console.log)
  