document.addEventListener('DOMContentLoaded', () => {
  let time = document.getElementById("time");
  let date = document.getElementById("date");
  let submit = document.getElementById('submit');
  let info = document.getElementById('alert');
  let currDate = new Date();

  const curryear = currDate.getFullYear();
  const currmonth = currDate.getMonth() + 1;
  const currday = currDate.getDate();
  const currhour = currDate.getHours();
  const currmin = currDate.getMinutes();
  
  const dat = new Date(`${curryear}-${currmonth}-${currday}`);
  const tim = new Date(`${dat.toISOString().split('T')[0]}T${time.value}`);
  
  date.value = `${curryear}-${currmonth < 10 ? '0' + currmonth : currmonth}-${currday < 10 ? '0' + currday : currday}`;
  time.value = `${currhour < 10 ? '0' + currhour : currhour}:${currmin < 10 ? '0' + currmin : currmin}`;

  submit.addEventListener('click', (event) => {
    const selectedDate = new Date(date.value);
    const selectedTime = new Date(`${date.value}T${time.value}`);

    if (selectedDate < dat || selectedTime < tim) {
      info.innerText = 'Enter valid credentials';
      setTimeout(() => {
        info.innerText = '';
      }, 3000);
      event.preventDefault();
    }
  });
});
