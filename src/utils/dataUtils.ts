import { ChangeEvent } from "react";

export const formatDate = (event: ChangeEvent<HTMLInputElement>): string => {
  const input = event.target as HTMLInputElement;
  const inputValue: string = input.value.replace(/\D/g, '');

  const formattedValue: string = inputValue
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');

  return formattedValue
};