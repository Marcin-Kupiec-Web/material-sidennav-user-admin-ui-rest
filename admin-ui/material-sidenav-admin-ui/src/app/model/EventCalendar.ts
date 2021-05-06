export class EventCalendar {
  id: number;
  groupId: string;
  allDay: boolean;
  title: string;
  description: string;
  start: Date;
  end: Date;
  classNames: string[];
  editable: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}
