export class DateUtils {
    static stringToBirthday(dateString: string): Date {
        // Remove any extra whitespace
        dateString = dateString.trim();

        let date: Date;

        // Try different parsing strategies
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            // ISO format: YYYY-MM-DD
            date = new Date(dateString + 'T00:00:00.000Z');
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
            // US format: MM/DD/YYYY
            date = new Date(dateString);
        } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
            // Alternative format: DD-MM-YYYY or MM-DD-YYYY
            const [first, second, year] = dateString.split('-');
            // Assume DD-MM-YYYY format
            date = new Date(`${second}/${first}/${year}`);
        } else {
            // Try native Date parsing
            date = new Date(dateString);
        }

        // Validation
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date format: ${dateString}`);
        }

        const now = new Date();
        const minAge = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate());

        if (date > now) {
            throw new Error('Birthday cannot be in the future');
        }

        if (date < minAge) {
            throw new Error('Birthday cannot be more than 120 years in the past');
        }

        return date;
    }
}