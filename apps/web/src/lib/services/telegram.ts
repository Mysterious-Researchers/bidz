import { type TAuthEndpoints } from "../../../../../libs/types";

type Tokens = TAuthEndpoints["verify"];

const tokensName = "authTokens";
function saveAuthTokens(tokens: Tokens) {
  if (!window)
    throw new Error("This function only runs in a browser environment");

  console.log("Saving tokens", tokens);
  window.localStorage.setItem(tokensName, JSON.stringify(tokens));
}

function getAuthTokens() {
  const dataFromLocalStorage = window.localStorage.getItem(tokensName);
  if (!dataFromLocalStorage)
    return new Error("No auth tokens in local storage");

  return JSON.parse(dataFromLocalStorage) as Tokens;
}

export { saveAuthTokens, getAuthTokens };
