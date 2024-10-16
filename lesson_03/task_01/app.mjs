import express from 'express';

const app = express();

app.get('/season', (req, res) => {
  const season = getSeason();
  res.send(`Current season is: ${season}`);
});
app.get('/day', (req, res) => {
  const dayOfWeek = getDayOfWeek();
  res.send(`Today is: ${dayOfWeek}`);
});
app.get('/time', (req, res) => {
  const timeOfDay = getTimeOfDay();
  res.send(`It is: ${timeOfDay}`);
});
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server started.');
})

function getSeason() {
  const currentMonth = new Date().getMonth();

  let season;
  if (currentMonth >= 2 && currentMonth <= 4) {
    season = 'Spring';
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    season = 'Summer';
  } else if (currentMonth >= 8 && currentMonth <= 10) {
    season = 'Autumn';
  } else {
    season = 'Winter';
  }

  return season;
}

function getDayOfWeek() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];
  return currentDay;
}

function getTimeOfDay() {
  const currentHour = new Date().getHours();

  let timeOfDay;
  if (currentHour >= 6 && currentHour < 12) {
    timeOfDay = 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = 'afternoon';
  } else if (currentHour >= 18 && currentHour < 22) {
    timeOfDay = 'evening';
  } else {
    timeOfDay = 'night';
  }

  return timeOfDay;
}