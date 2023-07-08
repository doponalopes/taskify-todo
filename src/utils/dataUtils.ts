import { ChangeEvent } from "react";
import { Timestamp } from 'firebase/firestore';

export const formatDate = (event: ChangeEvent<HTMLInputElement>): string => {
  const input = event.target as HTMLInputElement;
  const inputValue: string = input.value.replace(/\D/g, '');

  const formattedValue: string = inputValue
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');

  return formattedValue
};

export function convertDateToTimestamp(dataString: string): Timestamp {
  const [day, month, year] = dataString.split('/');
  const data = new Date(Number(day), Number(month) - 1, Number(year));

  return Timestamp.fromDate(data);
}

export function validateDate(data: string): boolean {
  const date = new Date(data);
  return date instanceof Date && !isNaN(date.getTime());
}
