"use client";

import { useSyncExternalStore } from 'react';
import { reportsStore } from '@/lib/reports-store';

export function useReports() {
    return useSyncExternalStore(reportsStore.subscribe, reportsStore.getSnapshot, reportsStore.getServerSnapshot);
}
