const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
   image: {
    type: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        }
    },
    default: function () {
        return {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        };
    },
    set: (v) => {
        // If empty string or falsy value is provided, fall back to default
        if (!v || !v.url) {
            return {
                filename: "listingimage",
                url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            };
        }
        return v;
    }
},

    price:{
        type:Number
    },
    location:{
        type:String
    }, 
    country:{
        type:String
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
           
        }
    ]
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;