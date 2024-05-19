const JWT = "social_token";

const getJWT = () => {
  return localStorage.getItem(JWT);
};
const setJWT = (value: string) => {
  console.log(value);
  return localStorage.setItem(JWT, value);
};
const removeJWT = () => {
  return localStorage.removeItem(JWT);
};

const exists = () => {
  const item = getJWT();

  return typeof item !== "undefined" && item !== null;
};

window.addEventListener("storage", (event: StorageEvent) => {
  if (event.key === JWT) {
    if (event.newValue !== null) {
      setJWT(event.newValue);
      //            setAxiosAuthorizationHeader(event.newValue);
    }
  }
});
const jwtStorage = {
  getJWT,
  setJWT,
  removeJWT,
  exists,
};

export default jwtStorage;
