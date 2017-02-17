"use strict";

module.exports = app => {
    let loginController = app.controllers.loginController;

    app.use("/api/orders", app.routes.orders);
    app.use("/api/allorders", app.routes.allorders);
    app.use("/api/locations", app.routes.locations);
    app.use("/api/order-details", app.routes.orderDetails);

    app.use("/api/wallet", app.routes.wallet);
    app.use("/api/walletSubscriptions", app.routes.walletSubscriptions);
    app.use("/api/walletTransactions",app.routes.walletTransactions);
    app.use("/api/deliveryHome", app.routes.deliveryHome);
    app.use("/api/deliveryGraph",app.routes.deliveryGraph);
    app.use("/api/deliveryOrder",app.routes.deliveryOrder);
    app.use("/login", app.routes.login);

    app.get("/", (req, res, next) => {
        return loginController.handleRoute(req, res, next);
    });

};