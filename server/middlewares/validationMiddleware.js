// validationMiddleware.js

const validateUserInput = (req, res, next) => {
    const { user_name, user_email } = req.body;
    //Necessary steps to Validate user input fields
    // Define regular expressions for allowed characters
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^[a-zA-Z0-9_@.]+$/;

    // Check if the provided user_name and user_email match the allowed patterns
if (!usernameRegex.test(user_name) || !emailRegex.test(user_email)) {
    return res.status(400).json({ error: 'Invalid characters in username or email.' });
    }

    // Continue to the next middleware or controller if validation passes
    //next();
  };
  
  export default validateUserInput;
  