import mongoose from "mongoose";

export const replaceWith = ({
  string,
  character,
  replacement,
}: {
  string: string;
  character: string;
  replacement: string;
}): string => {
  if (!string) return "";
  let formattedString: string = string;
  if (formattedString.includes(character)) {
    formattedString = formattedString.replace(character, replacement);
  }
  return formattedString;
};

export function lettersAndNumbersOnly(inputString: string) {
  // Use a regular expression to remove non-alphanumeric characters
  const formattedString = inputString.replace(/[^a-zA-Z0-9]/g, "");
  return formattedString;
}

export function formatToNumberWithDecimal(inputString: string) {
  // Use a regular expression to remove non-alphanumeric characters
  const formattedString = inputString.replace(/[^\d.]/g, "");
  return formattedString;
}

const convertFormattedFiguresToNumber = (formattedFigures: string): number => {
  const stringValueWithNoSpaces = String(formattedFigures)?.replace(/,/g, "");
  const numberToTwoDecimalPlaces = Number(stringValueWithNoSpaces)?.toFixed(2);
  return Number(numberToTwoDecimalPlaces);
};

const formatFiguresToCurrency = (input: string): string => {
  if (!input || input.length === 0) return "";

  let inputSource = input;

  if (isFinite(Number(inputSource))) {
    inputSource = inputSource.toString();
  }

  // importantly, we wil strip out all the special characters keeping only the decimals '9,000,____00****0.008.999-----' will output 900000.008.999
  const inputWithDecimalPointsOnly = inputSource.replace(/[^0-9.]/g, "");

  // we will assign the value we got now, in case it is good enough already, if it is something like *900000 or 900000.008
  let inputReadyToBeFormattedToNumber = inputWithDecimalPointsOnly;

  // we need to convert the stripped input to an array incase there are multiple decimal places in it *990990.9.9*
  const splitByDecimals = inputReadyToBeFormattedToNumber.split(".");

  // if there are more than 2 values in this array, it means the user provided something like *9000.9.9*, so we will just keep the first decimal place
  // splitByDecimals = ['900000', '008', '999'];
  if (splitByDecimals.length > 2) {
    const [main, ...floatingPoint] = splitByDecimals; // ['900000', ['008', '999']]
    const floatingPointToDecimal = floatingPoint.join(""); // '008999'
    inputReadyToBeFormattedToNumber = `${main}.${floatingPointToDecimal}`;
  }

  // now, we have 900000.008999 that is ready to converted to Currency format
  return Number(inputReadyToBeFormattedToNumber).toLocaleString("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "NGN",
  });
};

export const convertFigureToCurrency = (input: any): any => {
  if (Array.isArray(input)) {
    const formattedNumbers = input.map((value) =>
      formatFiguresToCurrency(value)
    );
    return formattedNumbers;
  }
  return formatFiguresToCurrency(input);
};

export const formatMoney = (amount: any) => {
  const amountEntered = convertFormattedFiguresToNumber(amount);
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  if (amount === null || amount === undefined) {
    return "N/A";
  }
  if (isNaN(amount)) {
    return 0;
  }
  if (amount % 1 === 0) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const pushSearchParams = (
  searchParams: string,
  newParams: {
    query: string | null;
    value: string | null;
  }
) => {
  const newSearchParams = new URLSearchParams(searchParams);
  if (!newParams.value || !newParams.query) return newSearchParams;
  newSearchParams.set(newParams.query, newParams.value);
  console.log({ newSearchParams });
  return newSearchParams;
};

// STRING_TO_OBJECT_ID
export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  } else {
    return null;
  }
}

export function getDuration(date1: Date, date2: Date): string {
  const millisecondsInOneSecond = 1000;
  const secondsInOneMinute = 60;
  const minutesInOneHour = 60;
  const hoursInOneDay = 24;
  const daysInOneWeek = 7;

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(
    new Date(date2).getTime() - new Date(date1).getTime()
  );

  // Calculate the duration in different units
  const seconds = timeDifference / millisecondsInOneSecond;
  const minutes = seconds / secondsInOneMinute;
  const hours = minutes / minutesInOneHour;
  const days = hours / hoursInOneDay;
  const weeks = days / daysInOneWeek;
  const months =
    (new Date(date2).getFullYear() - new Date(date1).getFullYear()) * 12 +
    new Date(date2).getMonth() -
    new Date(date1).getMonth();

  // Determine the appropriate unit for the duration
  if (weeks >= 1) {
    return `${Math.floor(weeks)} week${Math.floor(weeks) !== 1 ? "s" : ""}`;
  } else if (months >= 1) {
    return `${Math.floor(months)} month${Math.floor(months) !== 1 ? "s" : ""}`;
  } else if (days >= 1) {
    return `${Math.floor(days)} day${Math.floor(days) !== 1 ? "s" : ""}`;
  } else if (hours >= 1) {
    return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? "s" : ""}`;
  } else if (minutes >= 1) {
    return `${Math.floor(minutes)} minute${
      Math.floor(minutes) !== 1 ? "s" : ""
    }`;
  } else {
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) !== 1 ? "s" : ""
    }`;
  }
}
