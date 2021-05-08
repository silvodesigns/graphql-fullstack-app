const Query = {
    name() {
        return 'Dan';
    },
    age() {
        return 50;
    },
    isSingle() {
        return null;
    },
    numbers() {
        return [10, 20, 30, 40];
    },
    location() {
        return {
            state: "Massachusetts",
            city: "Lynn"
        };
    },
    users(parent, args, ctx, info) {
        const { users } = ctx;
        return users;
    }
};

module.exports = Query;