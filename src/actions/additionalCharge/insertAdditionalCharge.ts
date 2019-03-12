export default async (additionalDetails: any, AdditionalCharge: any) => {
  try {
    const additionalCharge = await AdditionalCharge.query().insert(
      additionalDetails
    );
    return { success: true, message: additionalCharge.id };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
