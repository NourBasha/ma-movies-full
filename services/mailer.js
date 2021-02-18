const sendgrid = require('sendgrid');

const helper = sendgrid.mail;

const keys = require('../config/keys');


class Mailer extends helper.Mail {

    constructor({subject, subscriber}, content){ 
        super();
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('MaMovies.no.reply@gmail.com'); // sender email created on sendgrid 
        this.subject = subject;  
        this.body = new helper.Content('text/html',content); // from template 
        this.recipient = new helper.Email(subscriber); 

        this.addContent(this.body); // built-in function function inside helper.Mail
        this.addClickTracking();
       
        this.addRecipient();

    }

    addClickTracking(){

        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);

    }

    addRecipient (){
        const personalize = new helper.Personalization();
         personalize.addTo(this.recipient);
        this.addPersonalization(personalize);
    }

    async send(){

        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);

        return response;
    }


}

module.exports = Mailer;