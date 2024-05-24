import appRoutes from "@app/constants/routes";

export const pageLocation = () => {
  let pageAlias = "";
  const location = window.location.pathname;

  switch (location) {
    case appRoutes.home: {
      pageAlias = "home";
      break;
    }
    case appRoutes.login: {
      pageAlias = "login";
      break;
    }
    case appRoutes.profile: {
      pageAlias = "profile";
      break;
    }
    default: {
      pageAlias = location;
      break;
    }
  }

  return pageAlias;
};
