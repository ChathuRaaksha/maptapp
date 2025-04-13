import { userRepository } from "../Repositories/UserRepository";

export const authService = {
  authenticateUser: async (email: string, password: string): Promise<boolean> => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) return false; // User not found

    return user.password === password; // Simple match check
  },
};
