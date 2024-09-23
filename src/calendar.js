import moment from 'moment-jalaali';

export default class Calendar {
  constructor(selector) {
    this.selector = selector;
    this.currentDate = moment(); // Core date in Gregorian (no locale change here)
    moment.loadPersian({ dialect: 'persian-modern' }); // For Jalaali display

    console.log('Current Date in Gregorian:', this.currentDate.format('YYYY/MM/DD'));
    console.log('Current Date in Jalaali:', this.currentDate.format('jYYYY/jMMMM/jDD')); // Display in Jalaali
  }

  initializeCalendar() {
    const container = document.querySelector(this.selector);
    if (!container) {
      console.error(`Container with selector ${this.selector} not found`);
      return;
    }

    // Clear the container before rendering the calendar
    container.innerHTML = '';

    const calendarHeader = this.createHeader();
    const calendarDays = this.createDays();

    container.appendChild(calendarHeader);
    container.appendChild(calendarDays);
  }

  // Create the header with month and year display
  createHeader() {
    const header = document.createElement('div');
    header.classList.add('calendar-header');

    // Add Previous Month Button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Prev';
    prevButton.addEventListener('click', () => this.changeMonth(-1)); // We'll adjust this later
    header.appendChild(prevButton);

    // Display the Jalali month and year, but we calculate it using Gregorian dates
    const jalaaliMonth = this.currentDate.format('jMMMM'); // Display the month in Jalaali
    const jalaaliYear = this.currentDate.format('jYYYY');  // Display the year in Jalaali
    header.innerHTML += `<h2>${jalaaliMonth} ${jalaaliYear}</h2>`;

    // Add Next Month Button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => this.changeMonth(1)); // Same for the next month button
    header.appendChild(nextButton);

    return header;
  }
  
  // Create the grid for the days of the month with weekday headers
  createDays() {
    const daysContainer = document.createElement('div');
    daysContainer.classList.add('calendar-days');

    const gregorianOfJalaliStart = this.currentDate.startOf('jMonth').format('YYYY-MM-DD');
    const gregorianOfJalaliEnd = this.currentDate.endOf('jMonth').format('YYYY-MM-DD');
    const firstDayOfWeek = moment(gregorianOfJalaliStart).day();
    const totalJalaliDays = parseInt(this.currentDate.endOf('jMonth').format('jDD'), 10);

    console.log('month length:', totalJalaliDays);

    // Create headers for the days of the week
    const weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    weekDays.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.classList.add('calendar-day', 'calendar-day-header');
      dayHeader.innerText = day;
      daysContainer.appendChild(dayHeader);
    });

    // Get the first day of the current month in Gregorian calendar
    // const firstDayOfMonth = this.currentDate.clone().startOf('month').day(); // First day of the month
    // const totalDays = this.currentDate.clone().endOf('month').date(); // Total days in the month

    const daysInPrevMonth = this.currentDate.clone().subtract(1, 'month').endOf('month').date(); // Days in previous month
    console.log('days in prev month:', daysInPrevMonth);

    // Add empty cells for days before the first day of the current month
    for (let i = firstDayOfWeek; i > 0; i--) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day', 'empty');
      // No innerText set, keeping these cells empty
      daysContainer.appendChild(dayElement);
    }

    // Add the days of the current month, showing Jalaali dates
    for (let day = 1; day <= totalJalaliDays; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');
      
      // Create a date object for the current day
      const gregorianDate = this.currentDate.clone().date(day);
      
      // Display the corresponding Jalaali date
      const jalaaliDay = gregorianDate.format('jD');
      dayElement.innerText = jalaaliDay;

      // Bind 'this' to the event handler
      dayElement.addEventListener('click', () => this.handleDayClick(day));

      daysContainer.appendChild(dayElement);
    }

    // Fill remaining cells to make up 6 rows (42 cells in total)
    const totalCells = firstDayOfWeek + totalJalaliDays;

    console.log('totalCells:', totalCells);
    
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day', 'empty');
      
      // Show the corresponding date from the next month
      const nextMonthDate = this.currentDate.clone().add(1, 'month').date(i);
      const jalaaliNextDay = nextMonthDate.format('jD'); // Convert to Jalaali format
      
      dayElement.innerText = jalaaliNextDay; // Show the Jalaali date
      daysContainer.appendChild(dayElement);
    }

    return daysContainer;
  }
  

  handleDayClick(day) {
    // Get the full Gregorian date for the clicked day
    const fullGregorianDate = this.currentDate.clone().date(day);

    // Display the corresponding Jalaali date to the user
    const fullJalaaliDate = fullGregorianDate.format('jYYYY/jMMMM/jDD');
    alert(`You clicked on: ${fullJalaaliDate}`);
    
    // If you want to log the Gregorian date for internal use
    console.log(`Internal Gregorian Date: ${fullGregorianDate.format('YYYY-MM-DD')}`);
  }

  changeMonth(direction) {
    this.currentDate.add(direction, 'months'); // Adjust the Gregorian month
    this.initializeCalendar(); // Re-render the calendar with the new month
  }
}
