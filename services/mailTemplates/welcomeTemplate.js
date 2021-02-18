
const keys = require('../../config/keys');
module.exports = (subscribtion)=>{

    console.log('server, template, sub id : ', subscribtion._id);
   
    return `
    
    <html>

        <body>
            
                <h4> It\'s great to have you with us! we hope you enjoy our App and our weekly new movies list! :) </h4>


                <p> if you wish not to receieve anymore updates, 
                    <a href='${keys.redirectDomain}/api/unsubscribe/${subscribtion._id}'>
                        Unsubscribe    
                    </a> 
                </p>
        
        </body>

    </html>
    
    
    `;
};