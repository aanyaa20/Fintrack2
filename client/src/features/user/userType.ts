

export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    gender?: "male" | "female" | "other" | "prefer_not_to_say";
    country?: string;
    language?: string;
}
export interface UpdateUserResponse {
    data: User
}