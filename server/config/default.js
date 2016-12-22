module.exports = {
    port: 3000,
    session: {
        secret: 'pet',
        key: 'pet',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/pet'
};