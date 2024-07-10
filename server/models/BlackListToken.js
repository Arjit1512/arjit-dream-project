import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
  token: {
     type: String,
      required: true 
    },
  blacklistedAt:
  { type: Date,
     default: Date.now,
      expires: '30d' 
  }, // Automatically delete tokens after 30 days
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

export default BlacklistToken;
