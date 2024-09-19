
  document.addEventListener('DOMContentLoaded', () => {
    let fname = document.getElementById("fnameInput");
    let lname = document.getElementById("lnameInput");
    let number = document.getElementById("numberInput");
    let email = document.getElementById("emailInput");
    let request = document.getElementById("requestInput").getElementsByTagName('textarea')[0];
    let submit = document.getElementById("submit");
    let info = document.getElementById("info");

    submit.addEventListener('click', (event) => {
      console.log('First Name:', fname.value);
      console.log('Last Name:', lname.value);

      if (
        fname.value === '' ||
        fname.value.length < 4 ||
        !isNaN(fname.value) ||
        lname.value === '' ||
        lname.value.length < 4 ||
        !isNaN(lname.value)
      ) {
        info.innerHTML = 'Enter valid name';
        setTimeout(() => {
          info.innerHTML = '';
        }, 3000);
        event.preventDefault();
      }else if( number.value === '' ||
        !/^(07|01)\d{8}$/.test(number.value) ){ 
          info.innerHTML = 'Enter a valid phone number';
        setTimeout(() => {
          info.innerHTML = '';
        }, 3000);
        event.preventDefault();
      } else if(email.value === '' ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value) ){
          info.innerHTML = 'Enter a valid email';
        setTimeout(() => {
          info.innerHTML = '';
        }, 3000);
        event.preventDefault();
      }
      else {
        // You can add further logic here for processing the form if the names are valid
        // For now, I'll just display a success message in the info div
        info.innerHTML = 'Reservation completed successfully!';
        // Remove this line if you want to submit the form
      }
    });
  });