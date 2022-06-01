export const aboutController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const viewData = {
          title: "About PlaceMark",
          user: loggedInUser,
        };
        return h.view("about-view", viewData);
      },
    },
    
  };
  