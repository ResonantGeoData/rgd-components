
export interface Collection {
    id: number | null;
    name: string | null;
  }
export interface ResultsFilter {
    distance: {
      min: string | null;
      max: string | null;
    };
    instrumentation: string | null;
    collections: Collection[];
    acquired: {
      startDate: string | null;
      endDate: string | null;
      startDateModal?: boolean;
      endDateModal?: boolean;
    };
    time: {
      startTime: string | null;
      endTime: string | null;
      startTimeModal?: boolean;
      endTimeModal?: boolean;
    };
  }