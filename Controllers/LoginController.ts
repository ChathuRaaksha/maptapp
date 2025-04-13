import { authService } from "../Services/AuthService";

export const loginController = {
  handleLogin: async (email: string, password: string): Promise<boolean> => {
    return await authService.authenticateUser(email, password);
  },
};
