const OTP = require("../models/otp-model");

class OTPRepository {
  async findByEmail(email, session = null) {
    const query = OTP.findOne({ email });
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [otp] = await OTP.create([data], { session });
      return otp;
    }
    return await OTP.create(data);
  }

  async markVerified(id, session = null) {
    const options = { new: true };
    if (session) options.session = session;
    return await OTP.findByIdAndUpdate(id, { $set: { verified: true } }, options);
  }

  async deleteByEmail(email, session = null) {
    const query = OTP.deleteMany({ email });
    if (session) query.session(session);
    return await query.exec();
  }
}

module.exports = new OTPRepository();
