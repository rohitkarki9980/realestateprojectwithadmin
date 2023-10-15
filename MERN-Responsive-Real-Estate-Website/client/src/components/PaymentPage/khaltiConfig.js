import myKey from "./khaltiKey";

import axios from 'axios'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let config = {
    
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "Booking service Charge",
    "productName": "Nepal Homes",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess(payload) { 
          
          console.log(payload)


        },

        // onError handler is optional
        onError(error) { // handle errors
            console.log(error);
            toast.error("An error occurred: " + error.message);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT"
    ]
};

export default config;
