export interface Notice {
    title: string;
    content: string;
    id: number;
    dayOfWeek: number; // 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토
    name: string;
    date?: string; // YYYY-MM-DD 형식 (특정 날짜 지정 시)
    isRecurring: boolean; // true: 매주 반복, false: 특정 날짜만
}
