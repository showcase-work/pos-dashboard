module.exports = {
    domains: {
        userAuth: process.env.USER_AUTH,
        appApis: process.env.APP_APIS,
        walletApis : process.env.WALLET_APIS,
        deliveryApis : process.env.DELIVERY_APIS

    },
    secret: {
        key: process.env.KEY
    }
};