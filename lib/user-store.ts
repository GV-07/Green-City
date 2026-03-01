import type { User } from './types';
import { users } from './data';

let currentUser: User = users[0]; // Default user
const listeners = new Set<() => void>();

// A simplified user type for registration
export type NewUser = {
  name: string;
  email: string;
  password: string;
  type: 'Student' | 'Citizen' | 'Inspector';
}

export const userStore = {
  setUser(user: User | NewUser) {
    // If it's a new user, create a full User object and add to "DB"
    if (!('id' in user)) {
        const newUser: User = {
            ...user,
            id: `user-${Date.now()}`,
            points: 0,
            rank: 0, // Rank would need recalculation, setting to 0 for now
            avatarUrl: `https://picsum.photos/seed/${user.email}/100/100`,
        };
        users.push(newUser);
        currentUser = newUser;
    } else {
        currentUser = user;
    }
    listeners.forEach((l) => l());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot() {
    return currentUser;
  },

  getServerSnapshot() {
    return users[0]; // Initial default user
  }
};
