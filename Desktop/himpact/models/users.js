const mongoose = require('mongoose');
const { encrypt, decrypt } = require('./cipher');



//creating Schema
const userDetails =  mongoose.Schema(
    {
        username: {type : String, required:true },
        contact_number: { type: Number, required:true,
        validation : function () {
            return ( this.contact_number > 999999999 );
          },
        },
        password: { type: String, set: encrypt, get: decrypt,required:true },
        create_date_time : {
            type : Number, default : (new Date()).getTime()
        },

    },

    {
        versionKey: false,

        // Following options will enable us to use getters and setters on almost all queries
        toObject: { getters: true, setters: true },
        toJSON: { getters: true, setters: true },
        runSettersOnQuery: true,
    },
);

module.exports = mongoose.model('user_details',userDetails)