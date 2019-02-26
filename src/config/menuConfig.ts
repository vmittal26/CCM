const menuConfig: any = {
  HouseKeeping: {
    caption: "House Keeping",
    subMenu: [
      { link: "/nodeManagement", caption: "Node Management" },
      { link: "/userManagement", caption: "User Management" },
      { link: "/baseConfiguration", caption: "Base Configuration" }
    ]
  },
  Reportistica: {
    caption: "Reportstica", 
    subMenu: [
      {
        link: "/gestioneEsportazioneDati",
        caption: "Gestione Esportazione Dati"
      },
      { link: "/kolavoratiperProfilo", caption: "KO lavorati per profilo" },
      {
        link: "/sospensioniVodafoneTIMProfilo",
        caption: "Sospensioni Vodafone/TIM per profilo"
      },
      { link: "/segnalazioni", caption: "Segnalazioni" }
    ]
  }
};

export default menuConfig;
