const sendgrid = require('sendgrid');

const helper = sendgrid.mail;

const keys = require('../config/keys');


class Mailer extends helper.Mail {

    constructor({subject, subscribers}, content){ 
        super();
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('MaMovies.no.reply@gmail.com'); // sender email created on sendgrid 
        this.subject = subject;  
        this.body = new helper.Content('text/html',content); // from template 
        this.recipients = this.formatAddresses(subscribers); 

        this.addContent(this.body); // built-in function function inside helper.Mail
        this.addClickTracking();
        this.addRecipient();

    }


    formatAddresses (recipients){
        return recipients.map(({email})=> { // object destructuring 
            return new helper.Email(email);
        })
    }

    addClickTracking(){

        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);

    }

    addRecipient (){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
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