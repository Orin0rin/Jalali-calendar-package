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
    header.appendChild(nextButton);
    header.appendChild(monthYearDisplay);
    header.appendChild(prevButton);

    return header;
  }
  
  createDays() {
    const daysContainer = document.createElement('div');
    daysContainer.classList.add('calendar-days');

    const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day-header');
        dayElement.innerText = day; // Add the weekday name
        daysContainer.appendChild(dayElement); // Append each day to the container
    });

    // Get the first day of the current Jalali month
    const firstDayOfMonth = this.currentDate.clone().startOf('jMonth');
    const lastDayOfMonth = this.currentDate.clone().endOf('jMonth');
    let firstDayOfWeek = firstDayOfMonth.day();
    if (firstDayOfWeek < 6) {
        firstDayOfWeek += 1;
    } else if (firstDayOfWeek === 6) {
        firstDayOfWeek = 0;
    }

    let dayCounter = 1;
    for (let i = 0; i < 42; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');

        let dateInfo;

        if (i < firstDayOfWeek) {
            // Fill with previous month's days
            dateInfo = firstDayOfMonth.clone().subtract(firstDayOfWeek - i, 'days');
            dayElement.innerText = dateInfo.format('jD');
            dayElement.classList.add('prev-month');
        } else if (dayCounter <= lastDayOfMonth.format('jD')) {
            // Fill with current month's days
            dateInfo = firstDayOfMonth.clone().add(dayCounter - 1, 'days');
            dayElement.innerText = dayCounter;
            if (dayCounter === parseInt(this.currentDate.format('jD'))) {
                dayElement.classList.add('current-day'); // Highlight the current day
            }

            // Add event listeners
            this.addMouseActions(dayElement, dayCounter, dateInfo); // Attach event listeners
            dayCounter++;
        } else {
            // Fill with next month's days
            dateInfo = lastDayOfMonth.clone().add(i - firstDayOfWeek - lastDayOfMonth.format('jD') + 1, 'days');
            dayElement.innerText = dateInfo.format('jD');
            dayElement.classList.add('next-month');
        }

        // Ensure dateInfo is passed into the mouse actions
        this.addMouseActions(dayElement, dayElement.innerText, dateInfo);
        daysContainer.appendChild(dayElement);
    }

    return daysContainer;
}


  addMouseActions(dayElement, day, dateInfo) {
    // Mouse enter event
    dayElement.addEventListener('mouseenter', (event) => {
        console.log(`Mouse entered on day: ${day}, Full Date: ${dateInfo.format('jYYYY/jMM/jDD')}`);
        dayElement.style.backgroundColor = '#d1e7ff'; // Highlight the cell on hover
    });

    // Mouse leave event
    dayElement.addEventListener('mouseleave', (event) => {
        console.log(`Mouse left on day: ${day}, Full Date: ${dateInfo.format('jYYYY/jMM/jDD')}`);
        dayElement.style.backgroundColor = ''; // Reset background color on leave
    });

    // Left-click event
    dayElement.addEventListener('click', (event) => {
        console.log(`Clicked on day: ${day}, Full Date: ${dateInfo.format('jYYYY/jMM/jDD')}`);
        dayElement.style.backgroundColor = '#ffdd57'; // Set background color on click
    });

    // Right-click event (context menu)
    dayElement.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent default right-click behavior
        console.log(`Right-clicked on day: ${day}, Full Date: ${dateInfo.format('jYYYY/jMM/jDD')}`);
        dayElement.style.backgroundColor = '#ff6666'; // Set a different background color on right-click
    });
  }

  
}
