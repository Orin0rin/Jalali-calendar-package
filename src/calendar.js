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
  
    const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  
    // ایجاد 7 ردیف برای جدول
    for (let i = 0; i < 7; i++) {
      const row = document.createElement('div');
      row.classList.add('calendar-row');
  
      for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
  
        // پر کردن ردیف اول با روزهای هفته
        if (i === 0) {
          dayCell.innerText = weekdays[j]; // روزهای هفته از چپ به راست
          dayCell.classList.add('calendar-day-header');
        } else {
          // ردیف‌های دیگر با مقدار خالی
          if (j === 0) {
            dayCell.classList.add('empty'); // ستون اول خالی
          } else {
            dayCell.classList.add('empty'); // بقیه سلول‌ها هم خالی
          }
        }
  
        row.appendChild(dayCell);
      }
  
      daysContainer.appendChild(row);
    }
  
    return daysContainer;
  }
  
  
  
}
