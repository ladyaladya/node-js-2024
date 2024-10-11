import { argv } from 'process';

export function getUrlSearchParamsFromInjectedArgs() {
  const injectedArgvParams = getInjectedParamsFromArgs();
  return getUrlSearchParamsFromList(injectedArgvParams);
}

function getInjectedParamsFromArgs() {
  return argv.slice(2);
}

function getUrlSearchParamsFromList(params) {
  const paramsString = params.join('&');
  return new URLSearchParams(paramsString);
}
