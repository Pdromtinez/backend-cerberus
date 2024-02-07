import UserModel from '../models/UserModel.js';
import { hashPassword } from '../utils/bcrypt.js'; 
import dotenv from 'dotenv';
import Accounts from '../models/AccountModel.js';
import { decodeToken } from '../utils/jwt.js';
import verifyToken from '../middlewares/jwtMiddleware.js';

dotenv.config();


//POST - CREATE OF CRUD

export const createUser = async (req, res) => {
    try{
        console.log('req.body:', req.body);
        await UserModel.create(req.body)
        res.status(200).json({message: "This User has been added successfully!"})
    }catch (error){
        console.error('Error:', error);
        res.status(500).json({message: error})
    }
}

// GET - REVIEW OF CRUD

export const getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.findAll()
        res.json(users);
    }catch (error){
        res.status(500).json({
            message: error.messge})
    }
};

export const getUserRole = async (req, res) => {
    try {
        const { token } = req.body || {}; // Utiliza {} como valor por defecto para evitar 'undefined'

        if (!token) {
            return res.status(400).json({ message: "Token not provided in the request body" });
        }

        const user = decodeToken(token);

        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//GET ONE ADMIN - REVIEW OF CRUD
export const getUser = async (req, res) => {
    try {
      
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        await UserModel.update(req.body, {where: {id:req.params.id}} );
        res.status(201).json({ message: 'The User has been found successfully!', user });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//PUT - UPDATE OF CRUD


export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }

        
        if (req.body.user_password) {
            
            req.body.user_password = await hashPassword(req.body.user_password);
        }

        await UserModel.update(req.body, { where: { id: req.params.id } });

        res.status(201).json({ message: 'The User has been updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.errors });
    }
};

//DELETE - DELETE OF CRUD

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({where:{id:req.params.id}});
        console.log(user)
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        await UserModel.destroy({where: {id:req.params.id}} );
        res.status(203).json({ message: 'This user has been deleted successfully!' });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};





export const getUserByAccountId = async (req, res) => {
    try {
        const accountId = req.params.id;

        const account = await Accounts.findByPk(accountId, { include: 'user' });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        return res.json(account.user);
    } catch (error) {
        console.error('Error getting user by account ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
