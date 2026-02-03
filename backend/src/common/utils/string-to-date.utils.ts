export class DateUtils {
  static stringToBirthday(dateString: string): Date {
    dateString = dateString.trim();

    let date: Date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      date = new Date(dateString + 'T00:00:00.000Z');
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      date = new Date(dateString);
    } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      const [first, second, year] = dateString.split('-');

      date = new Date(`${second}/${first}/${year}`);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date format: ${dateString}`);
    }

    const now = new Date();
    const minAge = new Date(
      now.getFullYear() - 120,
      now.getMonth(),
      now.getDate(),
    );

    if (date > now) {
      throw new Error('Birthday cannot be in the future');
    }

    if (date < minAge) {
      throw new Error('Birthday cannot be more than 120 years in the past');
    }

    return date;
  }
}
