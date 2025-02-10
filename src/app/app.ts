import express, {  Application, NextFunction, Request, Response   } from 'express';
import cors from 'cors';
import globalErrorHandler from './modules/middlwares/globalErrorHandler';
import notFound from './modules/middlwares/notFound';
import router from './routes';
import { UserRoutes } from './modules/user/user.route';


const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// application router 
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());
// global error Handler 
app.use(globalErrorHandler);
// not found error handler
app.use(notFound);

export default app;
