import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

const weekDays = [
    { day: "Sunday", message: "Hey, it is the Weekend!", advice: "Relax and recharge for the week ahead!", notes: [] },
    { day: "Monday", message: "It's Monday!", advice: "Start your week with a positive mindset!", notes: [] },
    { day: "Tuesday", message: "It's Tuesday!", advice: "Keep the momentum going!", notes: [] },
    { day: "Wednesday", message: "It's Wednesday!", advice: "You're halfway through the week!", notes: [] },
    { day: "Thursday", message: "It's Thursday!", advice: "Almost there, keep pushing!", notes: [] },
    { day: "Friday", message: "It's Friday!", advice: "Finish strong and get ready for the weekend!", notes: [] },
    { day: "Saturday", message: "Hey, it is the Weekend!", advice: "Enjoy your Saturday!", notes: [] }
];

app.get('/', (req, res) => {
    const today = new Date();
    const dayIndex = today.getDay();
    const todayInfo = weekDays[dayIndex];
    const name = req.session.name || null;

    res.render('index', { message: todayInfo.message, advice: todayInfo.advice, weekDays: weekDays, todayIndex: dayIndex, name: name });
});

app.post('/set-name', (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
});

app.post('/add-note', (req, res) => {
    const { dayIndex, note } = req.body;
    weekDays[dayIndex].notes.push({ text: note, important: false });
    res.redirect('/');
});

app.post('/delete-note', (req, res) => {
    const { dayIndex, noteIndex } = req.body;
    weekDays[dayIndex].notes.splice(noteIndex, 1);
    res.redirect('/');
});

app.post('/edit-note', (req, res) => {
    const { dayIndex, noteIndex, note } = req.body;
    weekDays[dayIndex].notes[noteIndex] = { text: note, important: weekDays[dayIndex].notes[noteIndex].important };
    res.redirect('/');
});

app.post('/toggle-important', (req, res) => {
    const { dayIndex, noteIndex } = req.body;
    weekDays[dayIndex].notes[noteIndex].important = !weekDays[dayIndex].notes[noteIndex].important;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
