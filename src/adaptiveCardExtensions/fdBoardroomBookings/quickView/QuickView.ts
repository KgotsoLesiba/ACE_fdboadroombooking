import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FdBoardroomBookingsAdaptiveCardExtensionStrings';
import { IFdBoardroomBookingsAdaptiveCardExtensionProps, IFdBoardroomBookingsAdaptiveCardExtensionState } from '../modals/types';
import { postBooking } from '../Services/apiServices';

export interface IQuickViewData {
  subTitle: string;
  title: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IFdBoardroomBookingsAdaptiveCardExtensionProps,
  IFdBoardroomBookingsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {
  if (action.type === 'Submit' && action.data.action === 'submitBooking') {
    const {
      meetingTitle,
      startDate,
      startTime,
      endDate,
      endTime,
      officeLocation,
      roomName
    } = action.data;

    const userEmail = this.context.pageContext.user.email; // <-- Secure way

    try {
      await postBooking(
      this.context.spHttpClient,
      this.context.pageContext.web.absoluteUrl,
      meetingTitle,
      userEmail,
      officeLocation,
      roomName,
      startDate,
      startTime,
      endDate,
      endTime
);


      alert("✅ Booking submitted successfully.");
    } catch (error) {
      alert("❌ Failed to submit booking.");
      console.error(error);
    }
  }
}}

