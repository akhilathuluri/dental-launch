/**
 * Clinic Schedule & Holiday Management
 *
 * Rules:
 * 1. Default: Every Tuesday is a holiday EXCEPT the 3rd Tuesday of that calendar month.
 * 2. Default: Every 2nd Sunday in a calendar month is a holiday.
 * 3. Operating hours: 10:00 AM to 07:30 PM in 30-minute intervals (20 standard slots).
 * 4. Dynamic Admin Overrides: An admin can declare any date as 'holiday' (clinic closed) or 'working_day' (clinic open).
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
  isOverride?: boolean;
  overrideStatus?: 'holiday' | 'working_day';
}

export interface ScheduleOverrideItem {
  id?: string;
  date: string;
  status: 'holiday' | 'working_day';
  reason?: string | null;
}

/**
 * Formats a Date instance as YYYY-MM-DD in the user's local timezone (avoiding UTC timezone shift bugs).
 */
export function formatLocalDateToYYYYMMDD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's local date string formatted as YYYY-MM-DD.
 */
export function getTodayLocalDateStr(): string {
  return formatLocalDateToYYYYMMDD(new Date());
}

/**
 * Adds or subtracts days from a YYYY-MM-DD date string safely in local time.
 */
export function shiftDateString(dateStr: string, days: number): string {
  if (!dateStr) return getTodayLocalDateStr();
  const parts = dateStr.split('-');
  if (parts.length !== 3) return getTodayLocalDateStr();
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const d = new Date(year, month, day);
  d.setDate(d.getDate() + days);
  return formatLocalDateToYYYYMMDD(d);
}

/**
 * Converts standard 12-hour formatted time string (e.g. "10:00 AM", "01:30 PM", "12:00 PM")
 * into total minutes from midnight for accurate chronological sorting.
 */
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

/**
 * Sorts array of objects containing `time_slot` chronologically (10:00 AM -> 10:30 AM ... -> 07:30 PM).
 */
export function sortSlotsChronologically<T extends { time_slot: string }>(slots: T[]): T[] {
  return [...slots].sort((a, b) => {
    const timeA = parseTimeToMinutes(a.time_slot);
    const timeB = parseTimeToMinutes(b.time_slot);
    return timeA - timeB;
  });
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
 * Checks if a specific date is a clinic holiday based on custom overrides or default business rules.
 */
export function getClinicDayInfo(
  dateInput: Date | string,
  overridesMap?: Record<string, ScheduleOverrideItem | 'holiday' | 'working_day'>
): ClinicDayInfo {
  const dateObj = typeof dateInput === 'string'
    ? new Date(dateInput.includes('T') ? dateInput : `${dateInput}T00:00:00`)
    : dateInput;

  const dateKey = typeof dateInput === 'string'
    ? dateInput.split('T')[0]
    : formatLocalDateToYYYYMMDD(dateObj);

  // 1. Check if an Admin Custom Override exists for this date
  if (overridesMap && overridesMap[dateKey]) {
    const override = overridesMap[dateKey];
    const status = typeof override === 'string' ? override : override.status;
    const reason = typeof override === 'object' && override?.reason ? override.reason : undefined;

    if (status === 'holiday') {
      return {
        isHoliday: true,
        reason: reason || 'Admin Declared Holiday (Clinic Closed)',
        badgeLabel: 'Clinic Closed',
        operatingHours: 'Closed',
        isOverride: true,
        overrideStatus: 'holiday',
      };
    }

    if (status === 'working_day') {
      return {
        isHoliday: false,
        reason: reason || 'Admin Declared Special Working Day (Open)',
        badgeLabel: 'Special Open',
        operatingHours: '10:00 AM – 07:30 PM',
        isOverride: true,
        overrideStatus: 'working_day',
      };
    }
  }

  // 2. Default Rules
  const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 2 = Tuesday
  const occurrence = getWeekdayOccurrenceInMonth(dateObj);

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

  // All other weekdays (Mon, Wed, Thu, Fri, Sat) are open by default
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
