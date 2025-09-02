import { gql } from "@apollo/client";

export const DELETE_FILE_OR_DIRECTORY = gql`
  mutation DeleteFileOrDirectory($deleteFileInput: DeleteFileDto!) {
    deleteFileOrDirectory(deleteFileInput: $deleteFileInput) {
      success
      message
    }
  }
`;

export type DeleteFileInput = {
  ytChannelId: string;
  ytVideoId: string;
  deleteType: "VIDEO" | "SAVED_SCREENSHOTS" | "ALL_SCREENSHOTS" | "THUMBNAILS";
};

export type DeleteFileResponse = {
  success: boolean;
  message?: string;
};
