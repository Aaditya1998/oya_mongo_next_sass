import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";
import User from "../../../models/User";
import { createActivationToken, createResetToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your Password.", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "An Email Has been sent! Reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();