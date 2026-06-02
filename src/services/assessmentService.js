import { submitAssessment } from "../api/assessmentApi";

export const createAssessment = async (
    assessmentData
) => {

    try {

        const data = await submitAssessment(
            assessmentData
        );

        return data;

    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to submit assessment";

        throw new Error(message, { cause: error });
    }
};
