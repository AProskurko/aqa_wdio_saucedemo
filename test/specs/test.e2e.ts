// import { expect } from '@wdio/globals'
import LoginPage from '../pageObjects/login.page'
import ProductsPage from "../pageObjects/products.page";
import CartPage from "../pageObjects/cart.page.ts";
import CheckoutFormPage from '../pageObjects/checkoutForm.page.ts';
import CheckoutOverviewPage from '../pageObjects/checkoutOverview.page.ts';
import CheckoutCompletePage from "../pageObjects/checkoutComplete.page.ts";
import SideMenu from '../pageObjects/components/sideMenu.component.ts'

describe('Test suit:', () => {
    let itemPrice: number;
    const itemList: string[] = [
        "Sauce Labs Backpack", 
        "Sauce Labs Bike light", 
        "Sauce Labs Fleece Jacket"
    ];

    it('Precondition - Login', async () => {
        await LoginPage.open()
        await LoginPage.pageVerification()
        await LoginPage.login("standard_user", "secret_sauce");
        await ProductsPage.pageVerification();
    })

    //* Required tests 
  it("Test 1 - Add item to cart", async () => {
    await ProductsPage.pageVerification();
    await ProductsPage.addItemToCart(itemList[0]);
    await ProductsPage.shoppingCartBadgeCheck(1)
  });

  it("Test 2 - Check item in cart", async () => {
    await ProductsPage.pageVerification();
    itemPrice = await Number((await ProductsPage.getPrice()).replace("$", ""));
    await ProductsPage.clickCart();

    await CartPage.pageVerification();
    await CartPage.CheckItem(itemList[0]);
  });

  it("Test 3 - Checkout Form: Open", async () => {
    await CartPage.pageVerification();
    await CartPage.clickCheckOutButton();

    await CheckoutFormPage.pageVerification()
  });

  it("Test 4 - Checkout Form: First Name", async () => {
    await CheckoutFormPage.pageVerification();
    await CheckoutFormPage.fillFirstName("Peter")
  });

  it("Test 5 - Checkout Form: Second Name", async () => {
    await CheckoutFormPage.pageVerification();
    await CheckoutFormPage.fillLastName("Bull");

  });

  it("Test 6 - Checkout Form: Postal Code", async () => {
    await CheckoutFormPage.pageVerification();
    await CheckoutFormPage.fillPostalCode(12345)
  });

  it("Test 7 - Checkout Form: Submit", async () => {
    await CheckoutFormPage.pageVerification();
    await CheckoutFormPage.submitCheckoutForm();
    
    await CheckoutOverviewPage.pageVerification();
    await CheckoutOverviewPage.checkItemPrice(itemPrice);
    await CheckoutOverviewPage.checkItemTotalPrice(itemPrice);
  });

  it("Test 8 - Checkout Form: Complete", async () => {
    await CheckoutOverviewPage.pageVerification();
    await CheckoutOverviewPage.submit();

    await CheckoutCompletePage.pageVerification();
    await CheckoutCompletePage.checkCompleteMessage();
  });

  it("Test 9 - Checkout Form: Back Home", async () => {
    await CheckoutCompletePage.pageVerification();
    await CheckoutCompletePage.clickBackHomeButton();

    await ProductsPage.pageVerification();
    await ProductsPage.shoppingCartBadgeCheck(0);
  });


//* 5 additional tests   
//? Check how product page reacting on adding  multiple items to cart
it("Test 10 - Select multiple items", async () => {
  await ProductsPage.pageVerification();
  await ProductsPage.addItemToCart(itemList[0]);
  await ProductsPage.shoppingCartBadgeCheck(1);
  await ProductsPage.addItemToCart(itemList[1]);
  await ProductsPage.shoppingCartBadgeCheck(2);
  await ProductsPage.addItemToCart(itemList[2]);
  await ProductsPage.shoppingCartBadgeCheck(3);
});

//? Checking remove item from cart feature
it("Test 11 - Remove one item from multiple items", async () => {
  await ProductsPage.pageVerification();
  await ProductsPage.removeItemFromCart(itemList[1]);
  await ProductsPage.shoppingCartBadgeCheck(2);
});

//? Side Menu functionality. 
//? About page. 
it("Test 12 - Side Menu: About", async () => {
  await ProductsPage.pageVerification();
  await SideMenu.openSideMenu();
  await SideMenu.selectAbout();

  await SideMenu.verifyAboutUrl();
  await LoginPage.openPage("inventory.html");

  await ProductsPage.pageVerification();
  await ProductsPage.shoppingCartBadgeCheck(2);
});

//? Reset app function
it("Test 13 - Side Menu: Reset App", async () => {
  await browser.pause(3000);
  await ProductsPage.pageVerification();
  await SideMenu.openSideMenu();
  await SideMenu.selectResetApp()
  await ProductsPage.shoppingCartBadgeCheck(0);

//! Bug: After app reset, "Remove" buttons stay visible. Remove comments if you willing to check it yourself.  
//   await ProductsPage.checkAllRemoveButtonsAreNotVisible(itemList)
});

//? Logout function
it("Test 14 - Logout", async () => {
  await ProductsPage.pageVerification();
  await SideMenu.openSideMenu();
  await SideMenu.selectLogout();

  await LoginPage.pageVerification();
});
});

