const bcrypt = require('bcrypt');
const { UserModel } = require('../MongoSchemas/User');

const RegisterUser = async (username, password, role) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, role });
    await newUser.save();

    return { userID: newUser._id, username: newUser.username, role: newUser.role };
};

const LoginUser = async (req, username, password) => {
    const user = await UserModel.findOne({ username });
    if (!user) {
       return {message: 'Invalid credentials'}
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) 
    {
        return {message: 'Invalid credentials'}
    }

    return { message: 'Login successful', userID: user._id };
};

const GetUserById = async (userID) => {
    try{
        const user = await UserModel.findById({_id: userID});
    

        return { message: 'User found', user };
    }
    catch(err)
    {
        return {message: 'User not found'}
    }
   
};
module.exports = {
    RegisterUser,
    LoginUser,
    GetUserById
};
