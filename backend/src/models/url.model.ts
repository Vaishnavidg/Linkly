import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Date, default: Date.now } }],
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      // Expose `id` instead of `_id` (the frontend's ShortUrl type expects `id`).
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  }
);

const UrlModel = mongoose.model("Url", urlSchema);

export default UrlModel;
