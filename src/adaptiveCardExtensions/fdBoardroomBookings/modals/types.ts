export interface IFdBoardroomBookingsAdaptiveCardExtensionProps {
  title: string;
  iconProperty: string;
}

export interface IViewBooking {
    MeetingTitle: string;
    Boardroom: string;
    StartDate: string;
    EndDate: string;
    Location: string;
}

export interface IFdBoardroomBookingsAdaptiveCardExtensionState {
    context: any;
    mail: string;
    absoluteUrl: string;
    title: string;
    boardroom: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    msgColor: string;
    submissionMsg: string;
    isVisible: boolean;
    allBookings: IViewBooking[];
}
