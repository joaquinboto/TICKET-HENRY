module.exports = {
    secret: process.env.AUTH_SECRET || "henry",
    expires: process.env.AUTH_EXPIRES || "24hs",
    rounds: process.env.AUTH_ROUNDS || 10
}