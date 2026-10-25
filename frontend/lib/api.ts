import {
  CreateRequirementPayload,
  ApiResponse,
} from "../types/requirement";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function submitRequirement(
  payload: CreateRequirementPayload
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/requirements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          data.message ||
          "Failed to submit requirement. Please check your inputs.",
        errors: data.errors,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? `Network error: ${error.message}. Please verify the backend is running.`
          : "An unexpected network error occurred while connecting to the server.",
    };
  }
}

export async function getRequirementById(id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/requirements/${id}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch requirement details.",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the requirement.",
    };
  }
}
