import LoginPage from "../pageObjects/login.page.ts";
import ProductsPage from "../pageObjects/products.page.ts";
import CartPage from "../pageObjects/cart.page.ts";
import CheckoutFormPage from "../pageObjects/checkoutForm.page.ts";
import CheckoutOverviewPage from "../pageObjects/checkoutOverview.page.ts";
import CheckoutCompletePage from "../pageObjects/checkoutComplete.page.ts";
import SideMenu from "../pageObjects/components/sideMenu.component.ts";
import Footer from "../pageObjects/components/footer.components.ts";
import { credentials } from "../utils/credentials.ts";
import { itemList, userData } from "../utils/fixtures.ts";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutFormPage = new CheckoutFormPage();
const checkoutOverviewPage = new CheckoutOverviewPage();
const checkoutCompletePage = new CheckoutCompletePage();
const sideMenu = new SideMenu();
const footer = new Footer();

describe("", () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it("Test 1 - Valid Login", async () => {
    await loginPage.pageVerification();
    await loginPage.login(credentials.username, credentials.password);
    await productsPage.pageVerification();
  });

  it("Test 2 - Login with invalid password", async () => {
    await loginPage.pageVerification();
    await loginPage.login(credentials.username, credentials.password[0]);
    await loginPage.errorLoginCheck("mismatch");
  });

  it("Test 3 - Login with invalid login", async () => {
    await loginPage.pageVerification();
    await loginPage.login(credentials.username[0], credentials.password);
    await loginPage.errorLoginCheck("mismatch");
  });
});

describe("Test workflow:", () => {
  let itemPrice: number;

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.pageVerification();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.pageVerification();
    await productsPage.checkMultipleProductsVisibility(itemList);
  });

  it("Test 4 - Logout", async () => {
    await sideMenu.openSideMenu();
    await sideMenu.selectLogout();
    await loginPage.pageVerification();

    await loginPage.formIsEmpty();
  });

  it("Test 5 - Saving the card after logout ", async () => {
    const product: string = itemList[0];

    //* Step 1
    await productsPage.addItemToCart(product);
    await productsPage.shoppingCartBadgeCheck(1);

    //* Step 2
    await sideMenu.openSideMenu();

    //* Step 3
    await sideMenu.selectLogout();
    await loginPage.pageVerification();

    //* Step 4
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.pageVerification();
    await productsPage.checkMultipleProductsVisibility(itemList);
    await productsPage.shoppingCartBadgeCheck(1);

    //* Step 5
    await productsPage.clickCart();
    await cartPage.pageVerification();
    await cartPage.checkItem(product);
  });

  it("Test 6 - Sorting", async () => {
    await footer.linksCheck();
  });

  it("Test 8 - Valid Checkout", async () => {
    //* Step 1 - Add item to cart
    await productsPage.addItemToCart(itemList[0]);
    await productsPage.shoppingCartBadgeCheck(1);
    itemPrice = await Number((await productsPage.getPrice()).replace("$", ""));

    //* Step 2 - Check item in cart
    await productsPage.clickCart();
    await cartPage.pageVerification();
    await cartPage.checkItem(itemList[0]);

    //* Step 3 - Checkout Form: Open
    await cartPage.clickCheckOutButton();
    await checkoutFormPage.pageVerification();

    //* Step 4 - Checkout Form: First Name
    await checkoutFormPage.fillFirstName(userData.firstName);

    //* Step 5 - Checkout Form: Second Name");
    await checkoutFormPage.fillLastName(userData.lastName);

    //* Step 6 - Checkout Form: Postal Code
    await checkoutFormPage.fillPostalCode(userData.postalCode);

    //* Step 7 - Checkout Form: Submit
    await checkoutFormPage.submitCheckoutForm();
    await checkoutOverviewPage.pageVerification();
    await checkoutOverviewPage.checkItemPrice(itemPrice);
    await checkoutOverviewPage.checkItemTotalPrice(itemPrice);

    //* Step 8 - Checkout Form: Complete
    await checkoutOverviewPage.submit();
    await checkoutCompletePage.pageVerification();
    await checkoutCompletePage.checkCompleteMessage();

    //* Step 9 - Checkout Form: Back Home
    await checkoutCompletePage.clickBackHomeButton();
    await productsPage.pageVerification();
    await productsPage.shoppingCartBadgeCheck(0);
    await productsPage.checkMultipleProductsVisibility(itemList);
  });

  it("Test 9 - Checkout without products", async () => {
    await productsPage.clickCart();
    await cartPage.pageVerification();
    await cartPage.checkNoItemVisible();
    await cartPage.clickCheckOutButton();
    await cartPage.verifyFailedCheckout();
  });

  it("Test 10 - Select multiple items", async () => {
    await productsPage.addListOfItemsToCart(itemList);
    await productsPage.shoppingCartBadgeCheck(itemList.length);
  });

  it("Test 11 - Remove one item from multiple items", async () => {
    await productsPage.addListOfItemsToCart(itemList);
    await productsPage.removeItemFromCart(itemList[0]);
    await productsPage.shoppingCartBadgeCheck(itemList.length - 1);
  });

  it("Test 12 - Side Menu: About", async () => {
    await sideMenu.openSideMenu();
    await sideMenu.verifyAboutHref();
  });

  it("Test 13 - Side Menu: Reset App", async () => {
    await sideMenu.openSideMenu();
    await productsPage.addListOfItemsToCart(itemList);
    await sideMenu.selectResetApp();
    await productsPage.shoppingCartBadgeCheck(0);
    await productsPage.checkAllRemoveButtonsAreNotVisible(itemList);
  });
});

afterEach(async () => {
  await browser.deleteCookies();
  await browser.execute(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});
