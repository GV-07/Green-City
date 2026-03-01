import type { Report } from './types';
import { reports as initialReports } from './data';

let reports: Report[] = [...initialReports];
const listeners = new Set<() => void>();

export const reportsStore = {
  addReport(report: Report) {
    reports = [report, ...reports];
    listeners.forEach((l) => l());
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot() {
    return reports;
  },

  getServerSnapshot() {
    return initialReports;
  }
};
