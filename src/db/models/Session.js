import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const sessionShema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },

  { versionKey: false, timestamps: true },
);

sessionShema.post('save', handleSaveError);
sessionShema.pre('findOneAndUpdate', setUpdateOptions);
sessionShema.post('findOneAndUpdate', handleSaveError);

const SessionCollection = model('session', sessionShema);
export default SessionCollection;
