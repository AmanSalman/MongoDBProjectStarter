import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';

export const initApp = (app,express)=>{
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.json({message:'welcome'})
    })
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('*', (req,res)=>{
        return res.json ({message:'page not found'})
    })
}