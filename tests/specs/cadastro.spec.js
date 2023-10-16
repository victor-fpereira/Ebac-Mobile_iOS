const productViewScreen = require('../screens/store.screen');

describe('Carrinho de compras', () => {

    it('Deve adicionar um produto ao carrinho com sucesso', async () => {
        await productViewScreen.searchProducts("Josie Yoga Jacket")
        await productViewScreen.addToChart("S", "Black")
        await productViewScreen.checkout()
        await productViewScreen.assertPrice("56.25")
    });
});