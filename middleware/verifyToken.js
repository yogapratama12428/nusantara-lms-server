import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { TOKEN_WEB } = process.env

    console.log(token)
    console.log(TOKEN_WEB)

    if ( token === null)  return res.status(401).json({ err: 'Invalid token'})

    if ( token !== TOKEN_WEB)  return res.status(401).json({ err: 'Invalid token'})
    
    if (token === TOKEN_WEB ){ 
        next();
    } 
}