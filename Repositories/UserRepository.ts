type User = { email: string; password: string };

const users: User[] = [
  { email: "test@example.com", password: "password123" },
];

/* export const userRepository = {
  getUserByEmail: async (email: string): Promise<User | null> => {
    const user = users.find((u) => u.email === email);
    return user || null;
  },
}; */
export const userRepository = {
    getUserByEmail: async (email: string) => {
      const users = [
        { email: "test@example.com", password: "123456" },
        { email: "admin@example.com", password: "admin" }
      ];
      return users.find(user => user.email === email) || null;
    }
  };
  
