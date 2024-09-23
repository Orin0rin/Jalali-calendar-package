declare module 'moment-jalaali' {
    import { Moment, MomentFormatSpecification, MomentInput } from 'moment';
  
    function moment(input?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
  
    namespace moment {
      function loadPersian(options?: { usePersianDigits?: boolean; dialect?: 'persian-modern' }): void;
      function jDaysInMonth(year: number, month: number): number;
      function jIsLeapYear(year: number): boolean;
      function jConvertToGregorian(year: number, month: number, day: number): [number, number, number];
      function jConvertToJalali(year: number, month: number, day: number): [number, number, number];
    }
  
    export = moment;
  }
  