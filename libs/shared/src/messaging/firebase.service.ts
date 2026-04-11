import * as admin from "firebase-admin";
import { config } from "../config";

export class FirebaseService {
  private static instance: admin.app.App;

  static getInstance(): admin.app.App {
    if (!this.instance) {
      const { projectId, clientEmail, privateKey } = config.auth.firebase;

      if (!projectId || !clientEmail || !privateKey) {
        console.warn("⚠️ Firebase credentials missing. SMS/OTP delivery will be mocked to console.");
        return null as any;
      }

      this.instance = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    }
    return this.instance;
  }

  /**
   * Sends a "Dumb OTP" via Firebase Cloud Messaging (FCM). 
   * This assumes the user has a device token registered.
   * If using raw SMS via Firebase, that is typically handled via the client SDK, 
   * but Admin can be used for custom notification-based delivery.
   */
  static async sendOtp(target: { phone?: string; deviceToken?: string }, code: string) {
    const app = this.getInstance();
    
    if (!app) {
      console.log(`[MOCK FIREBASE] Sending OTP ${code} to ${target.phone || target.deviceToken}`);
      return;
    }

    if (target.deviceToken) {
      await app.messaging().send({
        token: target.deviceToken,
        data: {
          type: "OTP_VERIFICATION",
          code,
        },
        notification: {
          title: "Verification Code",
          body: `Your verification code is: ${code}`,
        },
      });
    }

    // Note: Firebase Admin doesn't provide a direct "sendSms" method like Twilio.
    // Usually, Phone Auth is triggered from the client. 
    // If the user wants backend-triggered SMS via Firebase, they often use a 
    // Cloud Function or FCM to trigger a local app's SMS handler.
  }
}
