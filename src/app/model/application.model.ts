// application.model.ts
export interface Application {
    id: string;
    candidateName: string;
    offerTitle: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    applicationDate: string;
  }
  