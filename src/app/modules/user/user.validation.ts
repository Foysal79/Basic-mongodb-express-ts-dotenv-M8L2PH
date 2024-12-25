import { z } from "zod";


const userValidationSchemaZod = z.object({
    id: z.string(),
    password : z.string().max(20, {message : 'password can not be more than 20 characters'}),
    needsPassword : z.boolean().optional().default(true),
    role : z.enum(['admin', 'student', 'faculty']),
    isDeleted : z.boolean().optional().default(false),
    status : z.enum(['in-progress', 'blocked']).default('in-progress')
})


export  const  userValidation = {
    userValidationSchemaZod
}