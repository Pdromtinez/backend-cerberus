import PreAccounts from "../models/PreAccountModel.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: error.message });
};

export const getPreAccounts = async (req, res) => {
    try {
        const preaccounts = await PreAccounts.findAll();
        res.json(preaccounts);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const createPreAccount = async (req, res) => {
    try {
        const { app_img, ...otherData } = req.body;

        const result = await uploadImage(`data:image/jpeg;base64,${app_img}`);
        
        if (!result) {
            return res.status(500).json({ error: 'Error uploading image' });
        }

        const { public_id, secure_url } = result;

        await PreAccounts.create({ ...otherData, app_img: { public_id, secure_url } });
        
        return res.status(200).json({ message: "This account has been added successfully!" });
    } catch (error) {
        console.error('Error in createPreAccount:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getPreAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const preaccount = await PreAccounts.findByPk(id);

        if (!preaccount) {
            return res.status(404).json({ message: "PreAccount does not exist" });
        }

        res.json(preaccount);
    } catch (error) {
        handleServerError(res, error);
    }
};


export const deletePreAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const preaccount = await PreAccounts.findByPk(id);

        if (!preaccount) {
            return res.status(404).json({ message: 'PreAccount not found' });
        }

        if (preaccount.image?.public_id) {
            await deleteImage(preaccount.image.public_id);
        }

        await preaccount.destroy();

        res.status(204).json({ message: 'PreAccount deleted successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};

