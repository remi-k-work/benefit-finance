// next
import { useRouter } from "next/navigation";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";

// components
import { UploadButton } from "@/services/uploadthing/components";
import { toast } from "sonner";

// types
import type LangLoader from "@/lib/LangLoader";

interface UploadAvatarProps {
  ll: typeof LangLoader.prototype.uploadAvatar;
}

export default function UploadAvatar({ ll }: UploadAvatarProps) {
  // To be able to refresh the page
  const router = useRouter();

  return (
    <UploadButton
      endpoint="avatarUploader"
      onClientUploadComplete={async (res) => {
        res.forEach(async ({ ufsUrl, serverData: { message } }) => {
          // Update a user's image that should point to their avatar's url
          await authClient.updateUser({ image: ufsUrl });

          // Display a success message
          toast.success(ll["SUCCESS!"], { description: message });

          // Refresh the page
          router.refresh();
        });
      }}
      onUploadError={(error: Error) => {
        // Show the upload error message in case something goes wrong
        toast.error(ll["UPLOAD ERROR!"], { description: error.message });
      }}
      className="ut-button:w-full ut-button:rounded-none ut-button:uppercase ut-button:font-semibold ut-button:tracking-widest ut-button:bg-primary ut-button:text-primary-foreground"
    />
  );
}
