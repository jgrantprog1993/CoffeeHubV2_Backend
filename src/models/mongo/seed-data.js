export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      permissions: "ADMIN",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
      permissions: "USER",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
      permissions: "USER",
    }
  },

  locations:{
    _model: "Location",
    Waterford: {
      locationName: "Waterford",
    },
    Antrim: {
      locationName: "Antrim",
    },
    Armagh: {
      locationName: "Armagh",
    },
    Cavan: {
      locationName: "Cavan",
    },
    Derry: {
      locationName: "Derrym",
    },
    Donegal: {
      locationName: "Donegal",
    },
    Down: {
      locationName: "Down",
    },
    Fermanagh: {
      locationName: "Fermanagh",
    },
    Monaghan: {
      locationName: "Monaghan",
    },
    Tyrone: {
      locationName: "Tyrone",
    },
    Galway: {
      locationName: "Galway",
    },
    Leitrim: {
      locationName: "Leitrim",
    },
    Mayo: {
      locationName: "Mayo",
    },
    Roscommon: {
      locationName: "Roscommon",
    },
    Sligo: {
      locationName: " Sligo",
    },
    Carlow: {
      locationName: "Carlow",
    },
    Dublin: {
      locationName: "Dublin",
    },
    Kildare: {
      locationName: "Kildare",
    },
    Kilkenny: {
      locationName: "Kilkenny,",
    },
    Laois: {
      locationName: "Laois",
    },
    Longford: {
      locationName: "Longford",
    },
    Louth: {
      locationName: "Louth",
    },
    Meath: {
      locationName: "Meath",
    },
    Offaly: {
      locationName: "Offaly",
    },
    Westmeath: {
      locationName: "Westmeath",
    },
    Wexford: {
      locationName: "Wexford",
    },
    Wicklow: {
      locationName: "Wicklow",
    },
    Clare: {
      locationName: "Clare",
    },
    Cork: {
      locationName: "Cork",
    },
    Kerry: {
      locationName: "Kerry",
    },
    Limerick: {
      locationName: "Limerick",
    },
    Tipperary: {
      locationName: "Tipperary",
    },
    
  },

  coffeeShops:{
    _model : "CoffeeShop",
    coffeeShop_1 : {
      coffeeShopName: "Trade",
      lat:52.261058, 
      lng:-7.107688,
      rating: 4.2,
      location: "->locations.Waterford",
      user: "->users.bart",
      img: "https://res.cloudinary.com/dt7qt2lwx/image/upload/v1653990362/svelte-logo_redyup.svg"
    },

  }
};