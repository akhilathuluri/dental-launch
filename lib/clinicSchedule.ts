/**
 * Clinic Schedule & Holiday Management
 *
 * Rules:
 * 1. Every Tuesday is a holiday EXCEPT the 3rd Tuesday of that calendar month.
 * 2. Every 2nd Sunday in a calendar month is a holiday.
 * 3. Operating hours: 10:00 AM to 07:30 PM in 30-minute intervals (20 standard slots).
 */

export const STANDARD_TIME_SLOTS: string[] = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
];

export interface ClinicDayInfo {
  isHoliday: boolean;
  reason?: string;
  badgeLabel?: string;
  operatingHours: string;
}

/**
 * Calculates the occurrence of the date's day-of-week within its calendar month (1st, 2nd, 3rd, 4th, or 5th).
 */
export function getWeekdayOccurrenceInMonth(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const targetDay = date.getDay();
  let count = 0;

  for (let d = 1; d <= date.getDate(); d++) {
    const temp = new Date(year, month, d);
    if (temp.getDay() === targetDay) {
      count++;
    }
  }

  return count;
}

/**
 * Checks if a specific date is a clinic holiday based on business rules.
 */
export function getClinicDayInfo(dateInput: Date | string): ClinicDayInfo {
  const date = typeof dateInput === 'string'
    ? new Date(dateInput.includes('T') ? dateInput : `${dateInput}T00:00:00`)
    : dateInput;

  const dayOfWeek = date.getDay(); // 0 = Sunday, 2 = Tuesday
  const occurrence = getWeekdayOccurrenceInMonth(date);

  // Rule 1: Every Tuesday is a holiday EXCEPT the 3rd Tuesday of that month
  if (dayOfWeek === 2) {
    if (occurrence === 3) {
      return {
        isHoliday: false,
        reason: '3rd Tuesday of Month (Open)',
        badgeLabel: 'Special Open (3rd Tue)',
        operatingHours: '10:00 AM – 07:30 PM',
      };
    }
    return {
      isHoliday: true,
      reason: `Tuesday Holiday (${occurrence}${getOrdinalSuffix(occurrence)} Tuesday of month)`,
      badgeLabel: 'Tuesday Holiday',
      operatingHours: 'Closed',
    };
  }

  // Rule 2: Every 2nd Sunday in a calendar month is a holiday
  if (dayOfWeek === 0) {
    if (occurrence === 2) {
      return {
        isHoliday: true,
        reason: '2nd Sunday Holiday of the month',
        badgeLabel: '2nd Sunday Holiday',
        operatingHours: 'Closed',
      };
    }
    return {
      isHoliday: false,
      reason: `${occurrence}${getOrdinalSuffix(occurrence)} Sunday (Open)`,
      badgeLabel: 'Open',
      operatingHours: '10:00 AM – 07:30 PM',
    };
  }

  // All other weekdays (Mon, Wed, Thu, Fri, Sat) are open
  return {
    isHoliday: false,
    badgeLabel: 'Open',
    operatingHours: '10:00 AM – 07:30 PM',
  };
}

function getOrdinalSuffix(n: number): string {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
}
