// composables/useFileUpload.ts
import { ref } from "vue";
import Swal from "sweetalert2";

export function useFileUpload(allowedTypes: string[]) {
  const inpFileAttachmentMultiple = ref<File[]>([]);
  const inpFileAttachment = ref<File | null>(null);

  const handleUploadMultipleFiles = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (
          !allowedTypes.includes(file.type) &&
          !allowedTypes.includes(`image/${fileExtension}`)
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Allowed file types: ${allowedTypes.join(", ")}.`,
          });
          target.value = ""; // Reset file input
          return;
        }

        if (
          !inpFileAttachmentMultiple.value.some(
            (existingFile) => existingFile.name === file.name
          )
        ) {
          inpFileAttachmentMultiple.value.push(file);
        }
      }
    }
  };

  const handleUploadSingleFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (
        !allowedTypes.includes(file.type) &&
        !allowedTypes.includes(`image/${fileExtension}`)
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Allowed file types: ${allowedTypes.join(", ")}.`,
        });
        target.value = ""; // Reset file input
        return;
      }

      inpFileAttachment.value = file;
    }
  };

  return {
    inpFileAttachmentMultiple,
    inpFileAttachment,
    handleUploadMultipleFiles,
    handleUploadSingleFile,
  };
}
