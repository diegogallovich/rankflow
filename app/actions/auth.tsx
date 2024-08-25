import {
  SignUpFormSchema,
  LoginFormSchema,
  FormState,
} from "@/app/lib/definitions";
import { account, ID } from "@/app/appwrite";

export async function signUp(state: FormState, formData: FormData) {
  // validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // create user
  const { name, email, password } = validatedFields.data;

  await account.create(ID.unique(), email, password, name);
}

export async function login(state: FormState, formData: FormData) {
  // validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // log in user
  const { email, password } = validatedFields.data;
}
