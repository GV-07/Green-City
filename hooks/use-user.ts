"use client";

import { useSyncExternalStore } from 'react';
import { userStore } from '@/lib/user-store';

export function useUser() {
    return useSyncExternalStore(userStore.subscribe, userStore.getSnapshot, userStore.getServerSnapshot);
}
