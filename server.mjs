import express from 'express';
import cors from 'cors';
import membersRouter from './server/routes/member.mjs';
import photos from './server/routes/photos.mjs';
import timetable from './server/routes/timetable.mjs'


const PORT = process.env.PORT || 5050;
const app = express();
//console.log(Photo); 
app.use(cors());
app.use(express.json());
app.use('/members', membersRouter);
app.use('/photos', photos);
app.use('/timetable', timetable);
app.get("/", async (req, res) => {
  res.send("Hello world ").status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
