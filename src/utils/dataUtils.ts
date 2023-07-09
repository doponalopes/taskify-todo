import { ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

export const formatDate = (event: ChangeEvent<HTMLInputElement>): string => {
  const input = event.target as HTMLInputElement;
  const inputValue: string = input.value.replace(/\D/g, '');

  const formattedValue: string = inputValue
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');

  return formattedValue
};

export function convertDateToTimestamp(value: string): Timestamp {
  const [day, month, year] = value.split('/');
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return Timestamp.fromDate(date);
}

export function validateDate(value: string): boolean {
  const [day, month, year] = value.split('/');

  const date = new Date(`${month}/${day}/${year}`);

  return (
    date instanceof Date && !isNaN(date.getTime()) && date.getDate() === Number(day)
  );
}

function formatDayAndMonth(value: number) {
  return value.toString().padStart(2, '0');
}

export function convertTimestampToDate(date: string): string {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedDay = formatDayAndMonth(day);
  const formattedMonth = formatDayAndMonth(month);

  return `${formattedDay}/${formattedMonth}/${year}`;
}
