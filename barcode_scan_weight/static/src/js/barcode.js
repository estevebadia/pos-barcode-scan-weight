odoo.define('barcode_scan_weight.new_barcode', function (require) {
    'use strict';

    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    const { useBarcodeReader } = require('point_of_sale.custom_hooks');
    const { useListener } = require('web.custom_hooks');
    const { useContext } = owl.hooks;

    const PosBarcodeProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            _barcodeProductAction(code) {
               var self = this;
	            const product = this.env.pos.db.get_product_by_barcode(code.code);
                if(product.to_weight && this.env.pos.config.iface_electronic_scale){
                    const { confirmed, payload } = this.showTempScreen('ScaleScreen', {product:product});
                }
                if (!this.env.pos.scan_product(code)) {
                    this._barcodeErrorAction(code);
                }
            }
        };

    Registries.Component.extend(ProductScreen, PosBarcodeProductScreen);

    return ProductScreen;
});
