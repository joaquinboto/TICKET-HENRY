const { mercadopago } = require('../helpers/mercadopago')

const mercadopagoPayment = async (req, res) => {
    const { summary } = req.body

    try {
        let preference = {
            items: [
                {
                    "title": "Realizar la compra",
                    "description": "Con esta compra eres capaz de unirte a los eventos",
                    "category_id": "categoria123",
                    "quantity": 1,
                    "unit_price": summary
                }
            ],
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "https://ecommerce-pg-nine.vercel.app/private/payment/success",
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json(response.body.init_point);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    mercadopagoPayment
}