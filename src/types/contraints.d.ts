export interface Constraints {
  [key: string]: {
    presence?: { allowEmpty: boolean; message?: string };
    format?: { pattern: RegExp; message: string; flags?: string };
    length?: { minimum?: number; maximum?: number; message: string };
    datetime?: { dateOnly: boolean; earliest: Date; message: string };
    [customValidator: string]: any;
  };
}
