import bcrypt from "bcrypt"


const saltRounds = 10;

export const hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        
        return hashed;

    } catch (error) {
        console.error('Error generating hash:', error.message);
        throw error;
    }
};



export const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.error('Error comparing password:', error.message);
        throw error;
    }
};
