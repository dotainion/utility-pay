

class Routes{
    login = "/login";
    pagePath = "/page/:name";
    downloads = "/download/app";
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