import { ApiResponse } from "@/types/main";
import axiosInstance from "../axios";

// Interface cho response của upload
export interface UploadResponse {
  id: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
  type: "image" | "video" | "document";
  uploadedAt: string;
  processingTime?: number;
}

/**
 * Upload ảnh (có thể nhiều ảnh cùng lúc)
 * @param files - File hoặc mảng files ảnh
 * @returns Response chứa thông tin ảnh đã upload
 */
export async function uploadImages(files: File | File[]) {
  const formData = new FormData();

  // Nếu là 1 file thì convert thành array
  const fileArray = Array.isArray(files) ? files : [files];

  // Append từng file với field name 'images' (như backend định nghĩa)
  fileArray.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await axiosInstance.post<ApiResponse<UploadResponse | UploadResponse[]>>(
    `/upload/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Upload video (1 video mỗi lần, tối đa 500MB)
 * @param file - File video
 * @returns Response chứa thông tin video đã upload
 */
export async function uploadVideo(file: File) {
  const formData = new FormData();

  // Field name phải là 'video' (như backend định nghĩa)
  formData.append("video", file);

  const { data } = await axiosInstance.post<ApiResponse<UploadResponse>>(
    `/upload/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Upload document (có thể nhiều document cùng lúc, tối đa 25MB mỗi file)
 * @param files - File hoặc mảng files document
 * @returns Response chứa thông tin document đã upload
 */
export async function uploadDocuments(files: File | File[]) {
  const formData = new FormData();

  // Nếu là 1 file thì convert thành array
  const fileArray = Array.isArray(files) ? files : [files];

  // Append từng file với field name 'documents' (như backend định nghĩa)
  fileArray.forEach((file) => {
    formData.append("documents", file);
  });

  const { data } = await axiosInstance.post<ApiResponse<UploadResponse | UploadResponse[]>>(
    `/upload/document`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Helper function để upload ảnh đơn lẻ
 * @param file - File ảnh
 * @returns Response chứa thông tin ảnh đã upload
 */
export async function uploadSingleImage(file: File) {
  const result = await uploadImages(file);
  return result;
}

/**
 * Helper function để upload document đơn lẻ
 * @param file - File document
 * @returns Response chứa thông tin document đã upload
 */
export async function uploadSingleDocument(file: File) {
  const result = await uploadDocuments(file);
  // Nếu backend trả về single result thì data sẽ là object, không phải array
  return result;
}
