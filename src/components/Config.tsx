import { archiveOutline, archiveSharp, cardOutline, cardSharp, heartOutline, heartSharp, informationCircleOutline, informationCircleSharp, mailOutline, mailSharp, notificationsOutline, notificationsSharp, paperPlaneOutline, paperPlaneSharp, receiptOutline, receiptSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';


class AppPages{
    payment(){
        return {
            title: 'Payment',
            url: '/page/Payment',
            iosIcon: cardOutline,
            mdIcon: cardSharp,
        }
    }
    history(){
        return {
            title: 'History',
            url: '/page/History',
            iosIcon: receiptOutline,
            mdIcon: receiptSharp,
        }
    }
    information(){
        return {
            title: 'Information',
            url: '/page/Information',
            iosIcon: informationCircleOutline,
            mdIcon: informationCircleSharp,
        }
    }
    notificaton(){
        return {
            title: 'Notification',
            url: '/page/Notification',
            iosIcon: notificationsOutline,
            mdIcon: notificationsSharp,
        }
    }
    inbox(){
        return {
            title: 'Inbox',
            url: '/page/Inbox',
            iosIcon: mailOutline,
            mdIcon: mailSharp,
        }
    }
    outbox(){
        return {
            title: 'Outbox',
            url: '/page/Outbox',
            iosIcon: paperPlaneOutline,
            mdIcon: paperPlaneSharp,
        }
    }
    favorites(){
        return {
            title: 'Favorites',
            url: '/page/Favorites',
            iosIcon: heartOutline,
            mdIcon: heartSharp,
        }
    }
    archived(){
        return {
            title: 'Archived',
            url: '/page/Archived',
            iosIcon: archiveOutline,
            mdIcon: archiveSharp,
        }
    }
    trash(){
        return {
            title: 'Trash',
            url: '/page/Trash',
            iosIcon: trashOutline,
            mdIcon: trashSharp,
        }
    }
    spam(){
        return {
            title: 'Spam',
            url: '/page/Spam',
            iosIcon: warningOutline,
            mdIcon: warningSharp,
        }
    }
    footer(){
        return [
            appPages.payment(),
            appPages.history(),
            appPages.information(),
            appPages.notificaton(),
        ]
    }
    get(){
        return [
            appPages.payment(),
            appPages.history(),
            appPages.information(),
            appPages.notificaton(),
            appPages.inbox(),
            appPages.outbox(),
            appPages.favorites(),
            appPages.archived(),
            appPages.trash(),
            appPages.spam(),
        ]
    }
}
export const appPages = new AppPages();

class SettingsPage{
    reminder(){
        return{
            title: "Reminder",
            url: "/page/Reminder"
        }
    }
    get(){
        return[
            settingsPages.reminder(),
        ]
    }
}
export const settingsPages = new SettingsPage();

class FooterNotify{
    id(){
        return[
            "mobile-footer-payment",
            "mobile-footer-history",
            "mobile-footer-information",
            "mobile-footer-notificaton",
        ]
    }
}
export const footerNotify = new FooterNotify();
