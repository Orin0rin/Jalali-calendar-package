import moment from 'moment-jalaali';

export default class Calendar {
  constructor(selector) {
    this.selector = selector; // The DOM element where the calendar will be rendered
    moment.loadPersian({ dialect: 'persian-modern' }); // Load Persian localization
    this.currentDate = moment().locale('fa'); // Initialize with the current Jalali date in Farsi
    console.log('Current Jalali Date:', this.currentDate.format('jYYYY/jMM/jDD')); // Log the current Jalali date
    this.events = []; // Initialize an empty array to store calendar events
  }
  
  initializeCalendar() {
    console.log('Initializing calendar...');
    const container = document.querySelector(this.selector);
    if (!container) {
      console.error(`No element found with selector: ${this.selector}`);
      return;
    }
    container.innerHTML = '';
    const calendarHeader = this.createHeader();
    container.appendChild(calendarHeader);
    const calendarDays = this.createDays();
    container.appendChild(calendarDays);
  }

  createHeader() {
    const header = document.createElement('div');
    header.classList.add('calendar-header');
  
    // Create the "previous" button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&larr;';
    prevButton.addEventListener('click', () => {
      this.currentDate = this.currentDate.subtract(1, 'jMonth');
      this.initializeCalendar(); // Re-initialize the calendar to update it
    });
  
    // Create the "next" button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&rarr;';
    nextButton.addEventListener('click', () => {
      this.currentDate = this.currentDate.add(1, 'jMonth');
      this.initializeCalendar(); // Re-initialize the calendar to update it
    });
  
    // Create the month and year display
    const monthYearDisplay = document.createElement('span');
    monthYearDisplay.classList.add('month-year');
    monthYearDisplay.innerText = this.currentDate.format('jMMMM jYYYY'); // Display Jalali month and year
  
    // Append the buttons and display to the header
    header.appendChild(prevButton);
    header.appendChild(monthYearDisplay);
    header.appendChild(nextButton);

    return header;
  }
  
  createDays() {
    const daysContainer = document.createElement('div');
    daysContainer.classList.add('calendar-days');

    const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day-header');
        dayElement.innerText = day; // Add the weekday name
        daysContainer.appendChild(dayElement); // Append each day to the container
    });

    // Get the first day of the current Jalali month
    const firstDayOfMonth = this.currentDate.clone().startOf('jMonth');
    console.log('first:' , firstDayOfMonth.format('jYYYY,jMM,jDD'));
    const lastDayOfMonth = this.currentDate.clone().endOf('jMonth');
    console.log('last:' , lastDayOfMonth.format('jYYYY,jMM,jDD'));
    // Determine the weekday of the first day of the month
    let firstDayOfWeek = firstDayOfMonth.day();
    if (firstDayOfWeek < 6) {
        firstDayOfWeek = firstDayOfWeek + 1;
    } else if (firstDayOfWeek === 6) {
        firstDayOfWeek = 0;
    }


    // Create a 7x6 grid (42 cells)
    let dayCounter = 1;
    for (let i = 0; i < 42; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');

        if (i < firstDayOfWeek) {
            // Fill with previous month's days
            const prevMonthDay = firstDayOfMonth.clone().subtract(firstDayOfWeek - i, 'days');
            dayElement.innerText = prevMonthDay.format('jD');
            dayElement.classList.add('prev-month');
        } else if (dayCounter <= lastDayOfMonth.format('jD')) {
            // Fill with current month's days
            dayElement.innerText = dayCounter;
            if (dayCounter === this.currentDate.format('jD')) {
                dayElement.classList.add('current-day'); // Highlight the current day
            }
            dayCounter++;
        } else {
            // Fill with next month's days
            const nextMonthDay = lastDayOfMonth.clone().add(i - firstDayOfWeek - lastDayOfMonth.format('jD') + 1, 'days');
            dayElement.innerText = nextMonthDay.format('jD');
            dayElement.classList.add('next-month');
        }

        daysContainer.appendChild(dayElement);
    }

    return daysContainer;
}

  
}
