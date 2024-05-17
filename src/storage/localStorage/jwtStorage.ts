const JWT = "social_token";

const getJWT = () => {
  return localStorage.getItem(JWT);
};
const setJWT = (value: string) => {
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

export default {
  getJWT,
  setJWT,
  removeJWT,
  exists,
};
