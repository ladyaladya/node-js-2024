import { getUrlSearchParamsFromInjectedArgs } from './services/injectedParamsProvider.mjs';
import readline from 'node:readline';

const pensionAgeKey = '--pension';
const ValidationErrorCodes = {
  NULL: "null",
  NOT_AN_INTEGER: "not_an_integer",
  NOT_POSITIVE_INTEGER: "not_positive_integer",
};

const pensionAge = getPensionAge();
const validationResult = validatePensionAge(pensionAge);
if (!validationResult.isValid) {
  handleError(validationResult.errorCode);
  throw new Error(validationResult.errorCode);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

askAge();

function askAge() {
  rl.question('How old are you? ', (age) => {
    const inputValidationResult = validatePensionAge(age);
    if (inputValidationResult.isValid) {
      const message = parseInt(age) >= pensionAge ? `You are a pensioner.` : `You are not a pensioner.`;
      console.log(message);
      rl.close();
      return;
    } 
    
    handleError(inputValidationResult.errorCode);
    askAge();
  });
}

function getPensionAge() {
  const injectedParams = getUrlSearchParamsFromInjectedArgs();
  return injectedParams.get(pensionAgeKey);
}

function validatePensionAge(pensionAge) {
  if (!pensionAge) {
    return { isValid: false, errorCode: ValidationErrorCodes.NULL };
  }
  if (isNaN(parseInt(pensionAge))) {
    return { isValid: false, errorCode: ValidationErrorCodes.NOT_AN_INTEGER };
  }
  if (parseInt(pensionAge) <= 0) {
    return { isValid: false, errorCode: ValidationErrorCodes.NOT_POSITIVE_INTEGER };
  }

  return { isValid: true };
}

function handleError(errorCode) {
  const errorMessagesMap = {
    [ValidationErrorCodes.NULL]: `Failed to get pension age. Please provide the positive integer value for '${pensionAgeKey}' key'`,
    [ValidationErrorCodes.NOT_AN_INTEGER]: `Please provide the positive integer value for '${pensionAgeKey}' key`,
    [ValidationErrorCodes.NOT_POSITIVE_INTEGER]: `Please provide the positive integer value for '${pensionAgeKey}' key`,
  };

  console.error(errorMessagesMap[errorCode]);
}
