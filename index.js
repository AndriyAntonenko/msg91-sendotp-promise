/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const request = require('request-promise');

class SendOtp {
  /**
   * Creates a new SendOtp instance
   * @param {string} authKey Authentication key
   * @param {string, optional} messageTemplate
   */
  constructor(authKey, messageTemplate) {
    this.authKey = authKey;
    if (messageTemplate) {
      this.messageTemplate = messageTemplate;
    } else {
      this.messageTemplate = 'Your otp is {{otp}}. Please do not share it with anybody';
    }
    this.otpExpiry = 15; // 15 minutes
  }

  /**
   * Returns the base URL for MSG91 api call
   * @returns {string} Base URL for MSG91 api call
   */
  static getBaseURL() {
    return 'https://world.msg91.com/api/';
  }

  /**
   * Set the OTP expiry minutes for MSG91 api call
   */
  setOtpExpiry(otpExpiry) {
    this.otpExpiry = otpExpiry;
  }

  /**
   * Returns the 4 digit otp
   * @returns {integer} 4 digit otp
   */
  static generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  /**
   * Send Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {string} senderId
   * @param {string, optional} otp
   * Return promise if no callback is passed and promises available
   */
  send(contactNumber, senderId, otp) {
    const args = {
      authkey: this.authKey,
      mobile: contactNumber,
      sender: senderId,
      message: this.messageTemplate.replace('{{otp}}', otp),
      otp,
      otp_expiry: this.otpExpiry,
    };
    return SendOtp.doRequest('post', 'otp.php', args);
  }

  /**
   * Retry Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {boolean} retryVoice, false to retry otp via text call, default true
   * Return promise if no callback is passed and promises available
   */
  retry(contactNumber, retryVoice) {
    let retryType = 'voice';
    if (!retryVoice) {
      retryType = 'text';
    }
    const args = {
      authkey: this.authKey,
      mobile: contactNumber,
      retrytype: retryType,
    };

    return SendOtp.doRequest('get', 'retryotp.php', args);
  }

  /**
   * Verify Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {string} otp otp to verify
   * Return promise if no callback is passed and promises available
   */
  verify(contactNumber, otp) {
    const args = {
      authkey: this.authKey,
      mobile: contactNumber,
      otp,
    };
    return SendOtp.doRequest('get', 'verifyRequestOTP.php', args);
  }

  static doRequest(method, path, params) {
    const options = {
      method,
      url: `${SendOtp.getBaseURL()}${path}`,
    };

    options.qs = params;

    console.log(options);

    return request(options);
  }
}

module.exports = SendOtp;
