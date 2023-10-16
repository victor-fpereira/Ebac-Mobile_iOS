class StoreScreen {

    #waitTime = 20000

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async #clickSearchIcon() {
        try {
            let searchIconLocator = await driver.$("//XCUIElementTypeApplication[@name=\"Loja EBAC\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]");
            searchIconLocator.waitForEnabled({ timeout: this.#waitTime })
            await searchIconLocator.click();
        } catch (error) {
            console.error('Click search icon details error:', error);
            throw error;
        } finally {
            console.log('Click search icon')
        }
    }

    async #searchProduct(product) {
        try {
            let searchInputText = await driver.$("XCUIElementTypeTextField");
            searchInputText.waitForEnabled({ timeout: this.#waitTime })
            await searchInputText.click();
            await searchInputText.setValue(product);
        } catch (error) {
            console.error('Search product error:', error);
            throw error;
        } finally {
            console.log('Click search product')
        }
    }

    async #clickSearchButton() {
        try {
            // Minimize keyboard
            await driver.$("~done").click();
            // Click on search button
            let searchButton = await driver.$("~Procurar");
            searchButton.waitForEnabled({ timeout: this.#waitTime })
            await searchButton.click();
        } catch (error) {
            console.error('Click search button error:', error);
            throw error;
        } finally {
            console.log('Click search button')
        }
    }

    async #openOneProduct() {
        try {
            let openOneProduct = await driver.$("XCUIElementTypeImage");
            openOneProduct.waitForEnabled({ timeout: this.#waitTime })
            await openOneProduct.click();
        } catch (error) {
            console.error('Open one product error:', error);
            throw error;
        } finally {
            console.log('Open one product')
        }
    }

    async #addToChart() {
        try {
            let addToChart = await driver.$("~Adicionar ao carrinho");
            addToChart.waitForEnabled({ timeout: this.#waitTime })
            await addToChart.click();
        } catch (error) {
            console.error('Add to chart error:', error);
            throw error;
        } finally {
            console.log('Add to chart')
        }
    }

    async #chooseSize(size) {

        try {


            const x = 145;  // Adjust this value as needed
            const y = 494;  // Adjust this value as needed
            await driver.touchAction([{ action: 'tap', x, y }]);

            let _size = "~" + size;
            let sizeLocator1 = await driver.$(_size);
            sizeLocator1.waitForEnabled({ timeout: this.#waitTime })
            await sizeLocator1.click();

        } catch (error) {
            console.error('Choose size error:', error);
            throw error;
        } finally {
            console.log('Choose size')
        }
    }

    async #chooseColor(color) {
        try {

            let colorLocator = await driver.$("//XCUIElementTypeApplication[@name='Loja EBAC']/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]")
            colorLocator.waitForEnabled({ timeout: this.#waitTime })
            await colorLocator.click();

            let _color = "~" + color;
            await driver.$(_color).click();

        } catch (error) {
            console.error('Choose color error:', error);
            throw error;
        } finally {
            console.log('Choose color')
        }
    }

    async #clickCartIcon() {
        try {
            let cartIconLocator = await driver.$("//XCUIElementTypeButton[@name=\"1\"]");
            cartIconLocator.waitForEnabled({ timeout: this.#waitTime })
            await cartIconLocator.click();
        } catch (error) {
            console.error('Click cart icon error:', error);
            throw error;
        } finally {
            console.log('Click cart icon')
        }
    }

    async searchProducts(product) {
        await this.#clickSearchIcon()
        await this.#searchProduct(product)
        await this.#clickSearchButton()
        await this.#openOneProduct()
    }

    async addToChart(size, color) {
        await this.#addToChart()
        await this.#chooseColor(color)
        await this.#chooseSize(size)
        await this.#addToChart()
    }

    async checkout() {
        await this.#clickCartIcon()
    }

    async assertPrice(price) {
        let _price = "~RS " + price
        let priceLocator = await driver.$(_price);
        priceLocator.waitForEnabled({ timeout: this.#waitTime })
        await priceLocator.toBeDisplayed();
    }
}

module.exports = new StoreScreen()