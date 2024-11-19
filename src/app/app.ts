import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/students/student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// application router 
app.use('/api/v1/student', StudentRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());
export default app;
