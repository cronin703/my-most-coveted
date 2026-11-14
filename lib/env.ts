/** True only on the live Vercel production deployment. Sample badges hide there. */
export const isProduction = process.env.VERCEL_ENV === "production";
