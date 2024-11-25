import { z } from "zod";

const userNameSchema = z.object({
    firstName: z
      .string()
      .trim()
      .nonempty("First Name is required. Please provide your first name.")
      .regex(/^[A-Za-z]+$/, "First Name should contain only alphabets."),
    middleName: z
      .string()
      .nonempty("Middle Name is required. Please provide your middle name."),
    lastName: z
      .string()
      .nonempty("Last Name is required. Please provide your last name."),
  });
  
  // Validation for Guardian
  const guardianSchema = z.object({
    fatherName: z
      .string()
      .nonempty("Father's name is required."),
    fatherOccupation: z
      .string()
      .nonempty("Father's occupation is required."),
    fatherContactNo: z
      .string()
      .nonempty("Father's contact number is required."),
    motherName: z
      .string()
      .nonempty("Mother's name is required."),
    motherOccupation: z
      .string()
      .nonempty("Mother's occupation is required."),
    motherContactNo: z
      .string()
      .nonempty("Mother's contact number is required."),
  });
  
  // Validation for LocalGuardian
  const localGuardianSchema = z.object({
    name: z
      .string()
      .nonempty("Local guardian's name is required."),
    contactNo: z
      .string()
      .nonempty("Local guardian's contact number is required."),
    address: z
      .string()
      .nonempty("Local guardian's address is required."),
  });
  
  // Main Student Schema Validation
  const studentValidationSchema = z.object({
    id: z.string().nonempty("Student ID is required."),
    password: z.string().nonempty("Student ID is required.").max(20),
    name: userNameSchema,
    email: z
      .string()
      .email("Please provide a valid email address.")
      .nonempty("Email is required."),
    avatar: z.string().optional(),
    gender: z
      .enum(["male", "female", "other"], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'.",
        }),
      }),
      
    dateOfBirth: z.string().optional(),
    contactNo: z
      .string()
      .nonempty("Contact number is required."),
    emergencyContactNo: z
      .string()
      .nonempty("Emergency contact number is required."),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
        errorMap: () => ({
          message: "Please provide a valid blood group.",
        }),
      })
      .optional(),
    presentAddress: z
      .string()
      .nonempty("Present address is required."),
    permanentAddress: z
      .string()
      .nonempty("Permanent address is required."),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(["active", "blocked"], {
        errorMap: () => ({
          message: "Status must be either 'active' or 'blocked'.",
        }),
      }).default("active"),
      
  });



  export default studentValidationSchema;