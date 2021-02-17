

class Routes{
    login = "/login";
    pagePath = "/page/:name";
}

class Ids{
    toLogin = "redirect-to-login";
    showMenu = "show-menu";
    hidemenu = "hide-menu";
}

class Variables{
    id = new Ids();
    route = new Routes();
}

const globalVar = new Variables();
export { globalVar }