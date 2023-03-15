export interface Reminder {
    id: number;
    name: string;
    status: number;
    description: string;
    location: number;
    duration: number;
    time: string;
    date: string;
    image: string | null;
    memo: string | null;
    date_created: Date;
    date_updated: Date | null;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}
  