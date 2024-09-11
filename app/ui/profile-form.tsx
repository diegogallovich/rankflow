'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Text } from '@/components/text';
import { Input } from '@/components/input';
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Button } from '@/components/button';
import { updateProfile } from '@/app/actions/profile';
import { ProfileUpdateFormState } from '@/lib/definitions';
import { UserInfoResponse } from '@logto/next';
import { Avatar } from '@/components/avatar';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { useRef, useState } from 'react';

export function ProfileForm({ userInfo }: { userInfo: UserInfoResponse | undefined }) {
  const initialState: ProfileUpdateFormState = { message: '', errors: {} };
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [avatarSrc, setAvatarSrc] = useState(userInfo?.picture || '');

  const handleAvatarChange = (newSrc: string) => {
    setAvatarSrc(newSrc);
  };

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="userId" value={userInfo?.sub} />
      <input type="hidden" name="avatar" value={avatarSrc} />
      <Fieldset>
        <Legend>Personal Information</Legend>
        <Text className="mb-4">Update your profile details below.</Text>
        <FieldGroup>
          <Field className="mb-6">
            <Label>Profile Picture</Label>
            <ProfileImageDialog
              initialImageSrc={userInfo?.picture || ''}
              initialInitials={userInfo?.name?.charAt(0) || '?'}
              onImageChange={handleAvatarChange}
            />
          </Field>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field>
              <Label>Email</Label>
              <Input type="email" name="primaryEmail" defaultValue={userInfo?.email || ''} />
              {state?.errors?.primaryEmail && (
                <Description className="text-red-500">{state.errors.primaryEmail[0]}</Description>
              )}
            </Field>
            <Field>
              <Label>Full Name</Label>
              <Input type="text" name="name" defaultValue={userInfo?.name || ''} />
              {state?.errors?.name && (
                <Description className="text-red-500">{state.errors.name[0]}</Description>
              )}
            </Field>
          </div>
        </FieldGroup>
      </Fieldset>

      <div className="flex justify-end space-x-4">
        <SubmitButton />
      </div>
      {state?.message && <p className="mt-4 text-center">{state.message}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

type ProfileImageDialogProps = {
  initialImageSrc: string;
  initialInitials: string;
  onImageChange: (newSrc: string) => void;
};

function ProfileImageDialog({
  initialImageSrc,
  initialInitials,
  onImageChange,
}: ProfileImageDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSrc = e.target?.result as string;
        setImageSrc(newSrc);
        onImageChange(newSrc);
      };
      reader.readAsDataURL(selectedFile);
    }
    closeDialog();
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar
          src={imageSrc}
          initials={initialInitials}
          alt="Profile picture"
          className="size-24"
          square
        />
        <Button plain onClick={openDialog} type="button">
          Change Avatar
        </Button>
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogDescription>
          Drag and drop your image here or click to select a file.
        </DialogDescription>
        <DialogBody>
          <div
            className="flex h-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <Avatar src={imageSrc} alt="Selected" className="mb-2 size-32" square />
                <Text className="text-sm text-gray-600">{selectedFile.name}</Text>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg
                  className="mb-2 h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <Text className="text-sm text-gray-600">
                  Click or drag file to this area to upload
                </Text>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
            name="avatar"
          />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={closeDialog}>
            Cancel
          </Button>
          <Button onClick={handleImageUpload} disabled={!selectedFile}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
