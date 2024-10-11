import express from 'express';
import { router } from './src/routes'
import { databaseConnection } from './src/database'

const app = express();

databaseConnection()
app.use(express.json())
app.use('', router)

app.listen(3000, () => console.log(`App running on port ::3000`))
