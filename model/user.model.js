
const textService = require('../text-service');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');

class User {
    constructor(id, username, password, type) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = type
    }
}

class UserModel {

    registerUser(body) {
        return new Promise((resolve, rejects) => {

            const dbData = textService.readDataFromDb('db/users.json');
            const parsedData = JSON.parse(dbData);
            const exists = parsedData.users.some(u => u.username === body.username);

            if (exists) {
                return resolve({ message: 'User already exists in db!' })
            }
            const newUser = new User(
                uuidv4(),
                body.username,
                body.password,
                body.type
            )
            parsedData.users.push(newUser);
            const stringifiedData = JSON.stringify(parsedData);
            textService.writeDataToDb('db/users.json', stringifiedData);

            const { password, ...cleanUser } = newUser;

            resolve(cleanUser);

        })
    }

    loginUser(body) {
        return new Promise(async (resolve, reject) => {
            const dbData = textService.readDataFromDb('db/users.json');
            const parsedData = JSON.parse(dbData);
            const user = parsedData.users.find(u => u.username === body.username);


            if (!user) {
                return resolve({ message: `User doesn't exist in db!` })
            }

            if (user) {

                const validatePassword = await bcrypt.compare(body.password, user.password);
                if (!validatePassword) {
                    return resolve({ message: 'Wrong password' });
                }
                const { password, ...cleanUser } = user
                resolve(cleanUser);
            }

        })
    }


}


module.exports = UserModel;