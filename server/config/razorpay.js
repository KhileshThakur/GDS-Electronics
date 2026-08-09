import Razorpay from "razorpay";
console.log(
    "RAZORPAY KEY:",
    process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing"
);

console.log(
    "RAZORPAY SECRET:",
    process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing"
);
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});



export default razorpay;