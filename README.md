# msg91-sendotp-promise
## SendOtp - Node.js SDK

This is a module for using api from msg91-service for sending and verifying OTP

### Set-up:

1. Download the NPM module
```
npm install msg91-sendotp-promise --save
```
2. Require the package in your code.
```
const SendOtp = require('msg91-sendotp-promise');
```
3. Initialize with your [MSG91](https://msg91.com) auth key
```
const sendOtp = new SendOtp('AuthKey');
```
That's all, your SDK is set up!

### Requests

You now have the send, retry and verify otp via following methods.
```javascript
const sendObj = await sendOtp.send(contactNumber, senderId, otp, callback); //otp is optional if not sent it'll be generated automatically
const resendObj = await sendOtp.retry(contactNumber, retryVoice, callback);
const verifyObj = await sendOtp.verify(contactNumber, otpToVerify, callback);
```

### Note:
Success object
```javascript
{ "type": "success", "message": "aaaaaaaaaaaaaaaaaaaaaaa"}
```
Error object sample code
```javascript
{ "type": "error","message": "ERROR_MESSAGE" }
```

### Options:

By default sendotp uses default message template, but custom message template can also set in constructor like
```javascript
const SendOtp = require('msg91-sendotp-promise');
const sendOtp = new SendOtp('AuthKey', 'Otp for your order is {{otp}}, please do not share it with anybody');
```
`{{otp}}` expression is used to inject generated otp in message.