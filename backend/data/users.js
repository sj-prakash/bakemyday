import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },

    {
        name: 'Ash',
        email: 'ash@gmail.com',
        password: bcrypt.hashSync('123456',10)
    },

    {
        name: 'quintus',
        email: 'quintus@gmail.com',
        password: bcrypt.hashSync('123456',10)
    }
]

export default users