import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const weekDays = [
    { day: "Sunday", message: "Hey, it is the Weekend!", advice: "Relax and recharge for the week ahead!" },
    { day: "Monday", message: "It's Monday!", advice: "Start your week with a positive mindset!" },
    { day: "Tuesday", message: "It's Tuesday!", advice: "Keep the momentum going!" },
    { day: "Wednesday", message: "It's Wednesday!", advice: "You're halfway through the week!" },
    { day: "Thursday", message: "It's Thursday!", advice: "Almost there, keep pushing!" },
    { day: "Friday", message: "It's Friday!", advice: "Finish strong and get ready for the weekend!" },
    { day: "Saturday", message: "Hey, it is the Weekend!", advice: "Enjoy your Saturday!" }
];

app.get('/', (req, res) => {
    const today = new Date();
    const dayIndex = today.getDay();
    const todayInfo = weekDays[dayIndex];

    res.render('index', { message: todayInfo.message, advice: todayInfo.advice, weekDays: weekDays });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
