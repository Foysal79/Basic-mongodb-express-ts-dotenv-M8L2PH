import express, {  Application, NextFunction, Request, Response   } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/students/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './modules/middlwares/globalErrorHandler';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// application router 
app.use('/api/v1/student', StudentRoutes);
app.use('/api/v1/users', UserRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

app.use(globalErrorHandler) 
export default app;
