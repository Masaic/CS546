const bcrypt = require('bcrypt');
const users = [
    { _id: `1245325124124`, username: `masterdetective123`, hashedPassword: `$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.`, firstName: `Sherlock`, lastName: `holmes` },
    { _id: `723445325124123`, username: `lemon`, hashedPassword: `$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm`, firstName: `Elizabeth`, lastName: `Lemon` },
    { _id: `723445325124124`, username: `theboywholived`, hashedPassword: `$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK`, firstName: `Harry`, lastName: `Potter` }
]


module.exports = {
    getUserById: (id) => {
        for (let i = 0; i < users.length; i++) {
            if (id == users[i]._id) {
                return users[i].username;
            }
        }
        return `userid not exist`
    },

    check: async (provideName, providePassword) => {
        for (let i = 0; i < users.length; i++) {
            if (provideName == users[i].username) {
                // if(bcrypt.compareSync(providePassword, users[i].hashedPassword)) {
                //     // Passwords match
                //     return users[i]._id;
                //    } else {
                //     // Passwords don't match
                //     return `password not match`
                //    }
                try {
                    await bcrypt.compare(providePassword, users[i].hashedPassword, function (err, res) {
                        if (res) {
                            // Passwords match
                            return users[i]._id;
                        } else {
                            // Passwords don't match
                            return `password not match`
                        }
                    });
                } catch (e) {

                }
            }
        }
        return `user not exist`
    }
}