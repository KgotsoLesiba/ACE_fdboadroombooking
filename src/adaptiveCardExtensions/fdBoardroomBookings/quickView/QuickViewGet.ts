import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'FdBoardroomBookingsAdaptiveCardExtensionStrings';
import { IFdBoardroomBookingsAdaptiveCardExtensionProps, IFdBoardroomBookingsAdaptiveCardExtensionState } from '../modals/types';
import { IViewBooking } from '../modals/types';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  allBookings: IViewBooking[];

}

export class QuickViewBookings extends BaseAdaptiveCardView<
  IFdBoardroomBookingsAdaptiveCardExtensionProps,
  IFdBoardroomBookingsAdaptiveCardExtensionState,
  IQuickViewData
> {

      public get data(): IQuickViewData {
        return {
          title: this.properties.title,
          subTitle: strings.SubTitle,
          allBookings: this.state.allBookings        
        };
        
      }

  
  public get template(): ISPFxAdaptiveCard {
    return require('./template/BookingTemplate.json');
  }
}