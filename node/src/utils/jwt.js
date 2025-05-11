import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const generateVerificationToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};


