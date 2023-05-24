import { IUser } from "../models/userModel";
import asyncHandler from "express-async-handler";
import Collection from "../models/collectionModel";
import { Response, Request } from "express";
interface AuthRequest extends Request {
  user?: IUser;
}
export const getCabinet = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req as AuthRequest;

  try {
    const userCollections = await Collection.find({
      "user.id": user._id.toString(),
    });

    res.json({
      collections: userCollections,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
